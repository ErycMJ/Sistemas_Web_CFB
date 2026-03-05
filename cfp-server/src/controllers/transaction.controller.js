import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
import ErrorHandler from "../Middlewares/error.js";
import { Transaction } from "../Models/transaction.model.js";
import { Category } from "../Models/category.model.js";

const parsePositiveAmount = (value) => {
  const normalized = Number(value)
  if (!Number.isFinite(normalized) || normalized <= 0) {
    return null
  }
  return normalized
}

const parseDateValue = (value) => {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return null
  }
  return parsed
}

const resolveCategoryForUser = async (categoryId, transactionType, userId) => {
  const adminId = process.env.ADMIN_ID
  const category = await Category.findOne({
    _id: categoryId,
    $or: [{ createdBy: userId }, { createdBy: adminId }],
  })

  if (!category) {
    return { error: "Category not found for this user" }
  }

  if (category.categoryType !== transactionType) {
    return { error: `Category type must be '${transactionType}'` }
  }

  return { category }
}

export const addTransaction = catchAsyncError(async (req, res, next) => {
  const {
    type,
    category,
    date,
    note,
    amount,
    currency,
    recurrence,
    end,
    remind,
    transferTo,
    transferFrom,
  } = req.body;
  const createdBy = req.user.id;

  if (!type || !date || !amount || !currency) {
    return next(new ErrorHandler("Please fill necessary details", 400));
  }

  if (!['income', 'expense', 'transfer'].includes(type)) {
    return next(new ErrorHandler("Invalid transaction type", 400));
  }

  const parsedAmount = parsePositiveAmount(amount)
  if (!parsedAmount) {
    return next(new ErrorHandler("Amount must be greater than zero", 400))
  }

  const parsedDate = parseDateValue(date)
  if (!parsedDate) {
    return next(new ErrorHandler("Invalid transaction date", 400))
  }

  let categoryId = null
  if (type !== 'transfer') {
    if (!category) {
      return next(new ErrorHandler("Category is required for income and expense", 400))
    }

    const { category: validCategory, error } = await resolveCategoryForUser(
      category,
      type,
      createdBy
    )

    if (error) {
      return next(new ErrorHandler(error, 400))
    }

    categoryId = validCategory._id
  }

  if (type === 'transfer' && (!transferTo || !transferFrom)) {
    return next(new ErrorHandler("Transfer requires source and destination users", 400))
  }

  let photo = null;
  if (req.file) {
    photo = `/uploads/${req.file.filename}`;
  }

  const newTransaction = await Transaction.create({
    type,
    category: categoryId,
    date: parsedDate,
    note: note?.trim() || "",
    amount: parsedAmount,
    currency,
    recurrence: recurrence || 'never',
    end,
    remind,
    photo,
    createdBy,
    transferTo: transferTo || null,
    transferFrom: transferFrom || null,
  });

  res.status(201).json({
    success: true,
    message: "Transaction added successfully",
    transaction: newTransaction,
  });
});

export const getTransactions = catchAsyncError(async (req, res) => {
  const { id } = req.user;
  const transactions = await Transaction.find({ createdBy: id }).sort({ date: -1, createdAt: -1 });

  const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount
        acc.balance += transaction.amount
      } else if (transaction.type === 'expense') {
        acc.expense += transaction.amount
        acc.balance -= transaction.amount
      }

      return acc
    },
    { income: 0, expense: 0, balance: 0 }
  )

  res.status(200).json({
    success: true,
    count: transactions.length,
    totals,
    transactions,
  });
});

export const editTransaction = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const {
    type,
    category,
    date,
    note,
    amount,
    currency,
    recurrence,
    end,
    remind,
    createdBy,
    transferTo,
    transferFrom,
  } = req.body;
  const userId = req.user.id
  const existingTransaction = await Transaction.findById(id)

  if (!existingTransaction) {
    return next(new ErrorHandler("Transaction not found", 404))
  }

  if (existingTransaction.createdBy.toString() !== userId) {
    return next(new ErrorHandler("You are not authorized to update this transaction", 403))
  }

  if (!['income', 'expense', 'transfer'].includes(type)) {
    return next(new ErrorHandler("Invalid transaction type", 400))
  }

  const parsedAmount = parsePositiveAmount(amount)
  if (!parsedAmount) {
    return next(new ErrorHandler("Amount must be greater than zero", 400))
  }

  const parsedDate = parseDateValue(date)
  if (!parsedDate) {
    return next(new ErrorHandler("Invalid transaction date", 400))
  }

  let categoryId = null
  if (type !== 'transfer') {
    if (!category) {
      return next(new ErrorHandler("Category is required for income and expense", 400))
    }

    const { category: validCategory, error } = await resolveCategoryForUser(
      category,
      type,
      userId
    )

    if (error) {
      return next(new ErrorHandler(error, 400))
    }

    categoryId = validCategory._id
  }

  if (type === 'transfer' && (!transferTo || !transferFrom)) {
    return next(new ErrorHandler("Transfer requires source and destination users", 400))
  }

  const photo = req.file ? `/uploads/${req.file.filename}` : existingTransaction.photo;

  const updatedTransaction = await Transaction.findByIdAndUpdate(
    id,
    {
      type,
      category: categoryId,
      date: parsedDate,
      note: note?.trim() || "",
      amount: parsedAmount,
      currency,
      recurrence: recurrence || 'never',
      end,
      remind,
      photo,
      createdBy: userId,
      transferTo: transferTo || null,
      transferFrom: transferFrom || null,
    },
    { new: true }
  );

  if (!updatedTransaction) {
    return next(new ErrorHandler("Transaction not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Transaction updated successfully",
    transaction: updatedTransaction,
  });
});

export const deleteTransaction = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id
  const transaction = await Transaction.findById(id)

  if (!transaction) {
    return next(new ErrorHandler("Transaction not found", 404));
  }

  if (transaction.createdBy.toString() !== userId) {
    return next(new ErrorHandler("You are not authorized to delete this transaction", 403));
  }

  const deletedTransaction = await Transaction.findByIdAndDelete(id);

  if (!deletedTransaction) {
    return next(new ErrorHandler("Transaction not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Transaction deleted successfully",
    transaction: deletedTransaction,
  });
});

export const importTransactions = catchAsyncError(async (req, res, next) => {
  const { transactions } = req.body;
  
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return next(new ErrorHandler("No transaction data provided", 400));
  }

  const createdBy = req.user.id;
  const newTransactions = [];
  const invalidRows = [];
  const duplicatedRows = [];

  for (let index = 0; index < transactions.length; index += 1) {
    const transaction = transactions[index]
    const { type, category, note, amount, currency, date } = transaction;

    if (!['income', 'expense'].includes(type)) {
      invalidRows.push({ row: index + 1, reason: "Invalid type" })
      continue
    }

    const parsedAmount = parsePositiveAmount(amount)
    if (!parsedAmount) {
      invalidRows.push({ row: index + 1, reason: "Invalid amount" })
      continue
    }

    const parsedDate = parseDateValue(date)
    if (!parsedDate) {
      invalidRows.push({ row: index + 1, reason: "Invalid date" })
      continue
    }

    if (!type || !category || !note || !amount || !currency || !date) {
      invalidRows.push({ row: index + 1, reason: "Missing required fields" })
      continue
    }

    const { category: validCategory, error } = await resolveCategoryForUser(
      category,
      type,
      createdBy
    )

    if (error) {
      invalidRows.push({ row: index + 1, reason: error })
      continue
    }

    const newTransaction = {
      type,
      category: validCategory._id,
      note: note?.trim() || '',
      amount: parsedAmount,
      currency: currency,
      date: parsedDate,
      createdBy: createdBy,
      recurrence: 'never',
      end: null,
      remind: null,
      transferTo: null,
      transferFrom: null,
    };

    newTransactions.push(newTransaction);
  }

  if (invalidRows.length > 0) {
    return next(
      new ErrorHandler(
        `Invalid import rows: ${invalidRows
          .map((item) => `${item.row} (${item.reason})`)
          .join(', ')}`,
        400
      )
    )
  }

  const transactionsToInsert = []

  for (let index = 0; index < newTransactions.length; index += 1) {
    const transaction = newTransactions[index]
    const existing = await Transaction.findOne({
      createdBy,
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount,
      date: transaction.date,
      note: transaction.note,
    })

    if (existing) {
      duplicatedRows.push(index + 1)
      continue
    }

    transactionsToInsert.push(transaction)
  }

  if (transactionsToInsert.length > 0) {
    await Transaction.insertMany(transactionsToInsert)
  }

  res.status(201).json({
    success: true,
    message:
      transactionsToInsert.length > 0
        ? "Transactions imported successfully"
        : "No new transactions imported (all duplicates)",
    importedCount: transactionsToInsert.length,
    duplicatedCount: duplicatedRows.length,
    duplicatedRows,
    transactions: transactionsToInsert,
  });
});


export const getRecentTransactions = catchAsyncError(async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    })
  }

  const recentTransactions = await Transaction.find({ createdBy: req.user._id })
    .sort({ date: -1 })
    .limit(5)

  res.status(200).json({
    success: true,
    transactions: recentTransactions,
  })
})