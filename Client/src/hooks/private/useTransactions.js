import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { createInitialTransactionFormData } from "../../Componets/Private/transactionDefaults"
import {
  createTransaction,
  fetchAllCategories,
  fetchCategoriesByType,
  fetchTransactions,
  getApiErrorMessage,
  removeTransaction,
  updateTransaction,
} from "../../Componets/Private/transactionApi"

const mapTransactionsAmount = (transactions) => {
  return transactions.map((transaction) => ({
    ...transaction,
    amount: transaction.type === "income" ? transaction.amount : -transaction.amount,
  }))
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [categoriesTransaction, setCategoriesTransaction] = useState([])
  const [showAddTransactionForm, setShowAddTransactionForm] = useState(false)
  const [showEditTransactionForm, setShowEditTransactionForm] = useState(false)
  const [editTransactionData, setEditTransactionData] = useState(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [deleteTransactionId, setDeleteTransactionId] = useState(null)
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [filterCategory, setFilterCategory] = useState("")
  const [filterText, setFilterText] = useState("")
  const [amountRange, setAmountRange] = useState([])
  const [min, setMin] = useState(null)
  const [max, setMax] = useState(null)
  const [formData, setFormData] = useState(createInitialTransactionFormData)

  const formRef = useRef(null)

  const resetForm = () => setFormData(createInitialTransactionFormData())

  const refreshTransactions = async () => {
    try {
      const fetchedTransactions = await fetchTransactions()
      const adjustedTransactions = mapTransactionsAmount(fetchedTransactions)
      setTransactions(adjustedTransactions)

      if (!adjustedTransactions.length) {
        setFilteredTransactions([])
        setMin(null)
        setMax(null)
        setAmountRange([])
        return
      }

      const amounts = adjustedTransactions.map((item) => item.amount)
      const minAmount = Math.min(...amounts)
      const maxAmount = Math.max(...amounts)
      setMin(minAmount)
      setMax(maxAmount)
      setAmountRange([minAmount, maxAmount])
      setFilteredTransactions(adjustedTransactions)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao buscar transações."))
    }
  }

  const refreshCategories = async () => {
    try {
      const data = await fetchAllCategories()
      setCategoriesTransaction(data)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao buscar categorias."))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await refreshCategories()
      await refreshTransactions()
    }

    fetchData()
  }, [])

  useEffect(() => {
    const loadCategoriesByType = async () => {
      try {
        const filtered = await fetchCategoriesByType(formData.type)
        setCategories(filtered)
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Erro ao carregar categorias."))
      }
    }

    if (formData.type) {
      loadCategoriesByType()
      return
    }

    setCategories([])
  }, [formData.type])

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleAddTransaction = async () => {
    try {
      const data = await createTransaction(formData)
      toast.success(data.message)
      await refreshTransactions()
      resetForm()
      setShowAddTransactionForm(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao adicionar transação."))
    }
  }

  const handleEditTransaction = async () => {
    if (!editTransactionData?._id) {
      return
    }

    try {
      const data = await updateTransaction(editTransactionData._id, formData)
      toast.success(data.message)
      await refreshTransactions()
      resetForm()
      setEditTransactionData(null)
      setShowEditTransactionForm(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao editar transação."))
    }
  }

  const handleDeleteTransaction = async () => {
    if (!deleteTransactionId) {
      return
    }

    try {
      const data = await removeTransaction(deleteTransactionId)
      toast.success(data.message)
      await refreshTransactions()
      setShowDeleteConfirmation(false)
      setDeleteTransactionId(null)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao excluir transação."))
    }
  }

  const handleEditButtonClick = (transaction) => {
    setFormData({
      type: transaction.type,
      category: transaction.category,
      date: transaction.date.split("T")[0],
      note: transaction.note,
      amount: transaction.amount,
      currency: transaction.currency,
      recurrence: transaction.recurrence,
      end: transaction.end,
      remind: transaction.remind,
      photo: transaction.photo,
      transferTo: transaction.transferTo,
      transferFrom: transaction.transferFrom,
    })
    setEditTransactionData(transaction)
    setShowEditTransactionForm(true)
  }

  const handleDeleteButtonClick = (transactionId) => {
    setDeleteTransactionId(transactionId)
    setShowDeleteConfirmation(true)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowAddTransactionForm(false)
        setShowEditTransactionForm(false)
        setShowDeleteConfirmation(false)
        resetForm()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (
      filterCategory === "" &&
      filterText === "" &&
      amountRange[0] === min &&
      amountRange[1] === max
    ) {
      setFilteredTransactions(transactions)
      return
    }

    const filtered = transactions.filter((transaction) => {
      const matchesCategory = filterCategory ? transaction.category === filterCategory : true
      const matchesText = filterText
        ? transaction.note.toLowerCase().includes(filterText.toLowerCase())
        : true
      const matchesAmount =
        transaction.amount >= amountRange[0] && transaction.amount <= amountRange[1]

      return matchesCategory && matchesText && matchesAmount
    })

    setFilteredTransactions(filtered)
  }, [filterCategory, filterText, amountRange, transactions, min, max])

  const getCategoryNameById = (id) => {
    const category = categoriesTransaction.find((item) => item._id === id)
    return category ? category.categoryName : "Dado importado"
  }

  return {
    categories,
    categoriesTransaction,
    showAddTransactionForm,
    setShowAddTransactionForm,
    showEditTransactionForm,
    setShowEditTransactionForm,
    showDeleteConfirmation,
    setShowDeleteConfirmation,
    filteredTransactions,
    filterCategory,
    setFilterCategory,
    filterText,
    setFilterText,
    amountRange,
    setAmountRange,
    min,
    max,
    formData,
    formRef,
    handleChange,
    handleAddTransaction,
    handleEditTransaction,
    handleDeleteTransaction,
    handleEditButtonClick,
    handleDeleteButtonClick,
    getCategoryNameById,
  }
}
