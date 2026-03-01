import { FaEdit, FaTrash } from "react-icons/fa"

const formatTransactionAmount = (amount, currency) => {
  try {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: currency || "BRL",
    }).format(amount || 0)
  } catch {
    return `${amount || 0} ${currency || "BRL"}`
  }
}

const TransactionList = ({ transactions, getCategoryNameById, onEdit, onDelete }) => {
  if (transactions.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction._id}
          className="bg-green-50 p-4 rounded-lg shadow-lg flex items-center justify-between"
        >
          <div className="flex-1">
            <div className="flex space-x-4 mb-2">
              <span className="text-xl font-bold text-green-800">
                {getCategoryNameById(transaction.category)}
              </span>
              <span className="text-sm text-gray-700">
                {new Date(transaction.date).toLocaleDateString("pt-BR")}
              </span>
            </div>
            {transaction.type === "transfer" && (
              <div className="flex space-x-2 mb-2 text-sm text-gray-700">
                <span>De: {transaction.transferFrom}</span>
                <span>Para: {transaction.transferTo}</span>
              </div>
            )}
            <p className="text-sm text-gray-700">{transaction.note}</p>
          </div>
          <div className="flex items-center space-x-4">
            <p
              className={`text-lg font-bold ${
                transaction.type === "income"
                  ? "text-green-500"
                  : transaction.type === "expense"
                  ? "text-red-500"
                  : "text-black"
              }`}
            >
              {formatTransactionAmount(transaction.amount, transaction.currency)}
            </p>
            <div className="flex space-x-2">
              <button
                className="text-green-800 hover:text-green-500"
                onClick={() => onEdit(transaction)}
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(transaction._id)}
                className="text-red-600 hover:text-red-400"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

TransactionList.propTypes = {
  transactions: () => null,
  getCategoryNameById: () => null,
  onEdit: () => null,
  onDelete: () => null,
}

export default TransactionList
