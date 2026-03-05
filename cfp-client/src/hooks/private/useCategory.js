import { useEffect, useRef, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import string from "../../String"
import { getApiErrorMessage } from "../../Componets/Private/transactionApi"

const initialCategoryFormData = {
  categoryName: "",
  categoryType: "",
}

export const useCategory = () => {
  const [incomeCategories, setIncomeCategories] = useState([])
  const [expenseCategories, setExpenseCategories] = useState([])
  const [formData, setFormData] = useState(initialCategoryFormData)
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false)
  const [showEditCategoryForm, setShowEditCategoryForm] = useState(false)
  const [editCategoryData, setEditCategoryData] = useState(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [deleteCategoryId, setDeleteCategoryId] = useState(null)

  const formRef = useRef(null)

  const resetForm = () => setFormData(initialCategoryFormData)

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${string}/category/getCategory`, {
        withCredentials: true,
      })
      setIncomeCategories(data.filter((category) => category.categoryType === "income"))
      setExpenseCategories(data.filter((category) => category.categoryType === "expense"))
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao carregar categorias."))
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }))
  }

  const handleAddCategory = async () => {
    try {
      const { data } = await axios.post(`${string}/category/addCategory`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      toast.success(data.message)
      await fetchCategories()
      resetForm()
      setShowAddCategoryForm(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao adicionar categoria."))
    }
  }

  const handleDeleteCategory = async () => {
    if (!deleteCategoryId) {
      return
    }

    try {
      const { data } = await axios.delete(`${string}/category/deleteCategory/${deleteCategoryId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      toast.success(data.message)
      await fetchCategories()
      setShowDeleteConfirmation(false)
      setDeleteCategoryId(null)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao excluir categoria."))
    }
  }

  const handleEditCategory = async () => {
    if (!editCategoryData?._id) {
      return
    }

    try {
      const { data } = await axios.put(
        `${string}/category/updateCategory/${editCategoryData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      toast.success(data.message)
      await fetchCategories()
      resetForm()
      setEditCategoryData(null)
      setShowEditCategoryForm(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao editar categoria."))
    }
  }

  const handleEditButtonClick = (category) => {
    setFormData({ categoryName: category.categoryName, categoryType: category.categoryType })
    setEditCategoryData(category)
    setShowEditCategoryForm(true)
  }

  const handleDeleteButtonClick = (categoryId) => {
    setDeleteCategoryId(categoryId)
    setShowDeleteConfirmation(true)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowAddCategoryForm(false)
        setShowEditCategoryForm(false)
        setShowDeleteConfirmation(false)
        resetForm()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return {
    incomeCategories,
    expenseCategories,
    formData,
    showAddCategoryForm,
    setShowAddCategoryForm,
    showEditCategoryForm,
    showDeleteConfirmation,
    setShowDeleteConfirmation,
    formRef,
    handleChange,
    handleAddCategory,
    handleDeleteCategory,
    handleEditCategory,
    handleEditButtonClick,
    handleDeleteButtonClick,
  }
}
