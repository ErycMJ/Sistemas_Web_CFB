import { useEffect, useRef, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import string from "../../String"
import { getApiErrorMessage } from "../../components/Private/transactionApi"

const initialGoalFormData = {
  goal: "",
  limit: "",
}

export const useGoalLimit = () => {
  const [goalsLimits, setGoalsLimits] = useState([])
  const [formData, setFormData] = useState(initialGoalFormData)
  const [transactions, setTransactions] = useState([])
  const [showAddGoalLimitForm, setShowAddGoalLimitForm] = useState(false)
  const [showEditGoalLimitForm, setShowEditGoalLimitForm] = useState(false)
  const [editGoalLimitData, setEditGoalLimitData] = useState(null)

  const formRef = useRef(null)

  const resetForm = () => setFormData(initialGoalFormData)

  const fetchGoalsLimits = async () => {
    try {
      const { data } = await axios.get(`${string}/meta/goals-limits`, {
        withCredentials: true,
      })
      setGoalsLimits(data.goalLimits)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao buscar metas e limites."))
    }
  }

  const fetchTransactionsData = async () => {
    try {
      const { data } = await axios.get(`${string}/transaction/getTransaction`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      setTransactions(data.transactions)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao buscar transações."))
    }
  }

  useEffect(() => {
    fetchGoalsLimits()
    fetchTransactionsData()
  }, [])

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }))
  }

  const handleAddGoalLimit = async () => {
    try {
      const { data } = await axios.post(`${string}/meta/goals-limits`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      toast.success(data.message)
      await fetchGoalsLimits()
      resetForm()
      setShowAddGoalLimitForm(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao adicionar meta e limite."))
    }
  }

  const handleEditGoalLimit = async () => {
    if (!editGoalLimitData?._id) {
      return
    }

    try {
      const { data } = await axios.put(
        `${string}/meta/goals-limits/${editGoalLimitData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      toast.success(data.message)
      await fetchGoalsLimits()
      resetForm()
      setEditGoalLimitData(null)
      setShowEditGoalLimitForm(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao editar meta e limite."))
    }
  }

  const handleEditButtonClick = (goalLimit) => {
    setFormData({ goal: goalLimit.goal, limit: goalLimit.limit })
    setEditGoalLimitData(goalLimit)
    setShowEditGoalLimitForm(true)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowAddGoalLimitForm(false)
        setShowEditGoalLimitForm(false)
        resetForm()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const chartData = goalsLimits.map((goalLimit) => {
    const totalIncome = transactions
      .filter((item) => item.type === "income")
      .reduce((accumulator, current) => accumulator + current.amount, 0)

    const totalExpenses = transactions
      .filter((item) => item.type === "expense")
      .reduce((accumulator, current) => accumulator + current.amount, 0)

    return {
      name: `Meta ${goalLimit.goal} / Limite ${goalLimit.limit}`,
      receitas: totalIncome,
      despesas: totalExpenses,
      meta: goalLimit.goal,
      limite: goalLimit.limit,
    }
  })

  return {
    goalsLimits,
    formData,
    showAddGoalLimitForm,
    setShowAddGoalLimitForm,
    showEditGoalLimitForm,
    formRef,
    handleChange,
    handleAddGoalLimit,
    handleEditGoalLimit,
    handleEditButtonClick,
    chartData,
  }
}
