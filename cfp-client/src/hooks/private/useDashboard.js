import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import string from "../../String"
import { getApiErrorMessage } from "../../components/Private/transactionApi"

const fetchTransactions = async () => {
  const { data } = await axios.get(`${string}/transaction/getTransaction`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })

  return data.transactions || []
}

const fetchCategories = async () => {
  const { data } = await axios.get(`${string}/category/getCategory`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })

  return data || []
}

const fetchRecentTransactions = async () => {
  const { data } = await axios.get(`${string}/transaction/getRecentTransactions`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })

  return data.transactions || []
}

export const useDashboard = () => {
  const [balance, setBalance] = useState(0)
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const [recentTransactions, setRecentTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [spendingTrends, setSpendingTrends] = useState([])
  const [categoryData, setCategoryData] = useState([])

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [allTransactions, recentData, categoriesData] = await Promise.all([
          fetchTransactions(),
          fetchRecentTransactions(),
          fetchCategories(),
        ])

        let computedBalance = 0
        let computedIncome = 0
        let computedExpense = 0

        allTransactions.forEach((transaction) => {
          if (transaction.type === "income") {
            computedBalance += transaction.amount
            computedIncome += transaction.amount
          } else {
            computedBalance -= transaction.amount
            computedExpense += transaction.amount
          }
        })

        setBalance(computedBalance)
        setIncome(computedIncome)
        setExpense(computedExpense)

        setRecentTransactions(recentData)
        setCategories(categoriesData)

        const trendsData = allTransactions.map((transaction) => ({
          date: new Date(transaction.date).toLocaleDateString("pt-BR", {
            month: "short",
          }),
          receitas: transaction.type === "income" ? transaction.amount : 0,
          despesas: transaction.type === "expense" ? transaction.amount : 0,
        }))
        setSpendingTrends(trendsData)

        const categorySummary = categoriesData.map((category) => {
          const total = recentData
            .filter((transaction) => transaction.category === category._id)
            .reduce((accumulator, transaction) => accumulator + transaction.amount, 0)

          return { name: category.categoryName, value: total }
        })
        setCategoryData(categorySummary)
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Erro ao carregar dashboard."))
      }
    }

    loadDashboardData()
  }, [])

  const categoryLookup = useMemo(() => {
    return categories.reduce((accumulator, category) => {
      accumulator[category._id] = category.categoryName
      return accumulator
    }, {})
  }, [categories])

  return {
    balance,
    income,
    expense,
    recentTransactions,
    spendingTrends,
    categoryData,
    categoryLookup,
  }
}
