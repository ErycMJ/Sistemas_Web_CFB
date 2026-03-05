import axios from "axios"
import string from "../../String"

export const getApiErrorMessage = (error, fallbackMessage) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    fallbackMessage
  )
}

export const fetchCategoriesByType = async (type) => {
  const { data } = await axios.get(`${string}/category/getCategory`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })

  return data.filter((category) => category.categoryType === type)
}

export const fetchAllCategories = async () => {
  const { data } = await axios.get(`${string}/category/getCategory`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })

  return data
}

export const fetchTransactions = async () => {
  const { data } = await axios.get(`${string}/transaction/getTransaction`, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  })

  return data.transactions
}

export const createTransaction = async (formData) => {
  const { data } = await axios.post(`${string}/transaction/addTransaction`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  })

  return data
}

export const updateTransaction = async (transactionId, formData) => {
  const { data } = await axios.put(
    `${string}/transaction/editTransaction/${transactionId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  )

  return data
}

export const removeTransaction = async (transactionId) => {
  const { data } = await axios.delete(
    `${string}/transaction/deleteTransaction/${transactionId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  )

  return data
}
