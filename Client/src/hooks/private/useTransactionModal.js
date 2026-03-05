import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { createInitialTransactionFormData } from "../../Componets/Private/transactionDefaults"
import {
  createTransaction,
  fetchCategoriesByType,
  getApiErrorMessage,
} from "../../Componets/Private/transactionApi"

export const useTransactionModal = () => {
  const [categories, setCategories] = useState([])
  const [showAddTransactionForm, setShowAddTransactionForm] = useState(false)
  const [formData, setFormData] = useState(createInitialTransactionFormData)
  const formRef = useRef(null)

  const resetForm = () => setFormData(createInitialTransactionFormData())

  useEffect(() => {
    const loadCategoriesByType = async () => {
      try {
        const filteredCategories = await fetchCategoriesByType(formData.type)
        setCategories(filteredCategories)
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
    if (!formData.type || !formData.category || !formData.amount || !formData.date) {
      toast.error("Preencha tipo, categoria, valor e data.")
      return
    }

    try {
      const data = await createTransaction(formData)
      toast.success(data.message)
      resetForm()
      setShowAddTransactionForm(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao adicionar transação."))
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowAddTransactionForm(false)
        resetForm()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return {
    categories,
    showAddTransactionForm,
    setShowAddTransactionForm,
    formData,
    formRef,
    handleChange,
    handleAddTransaction,
  }
}
