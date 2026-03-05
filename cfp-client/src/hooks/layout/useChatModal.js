import { useState } from "react"
import axios from "axios"
import string from "../../String"
import { getApiErrorMessage } from "../../Componets/Private/transactionApi"

export const useChatModal = (isLoggedIn) => {
  const [activeTab, setActiveTab] = useState("support")
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSendMessage = async () => {
    if (activeTab !== "ia" || !isLoggedIn) {
      setMessage("")
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(`${string}/chat/send`, { message })

      setChatHistory((prev) => [
        ...prev,
        {
          user: message,
          ai: response.data.response,
        },
      ])

      setMessage("")
    } catch (error) {
      console.error(getApiErrorMessage(error, "Erro ao enviar mensagem para IA."))
    } finally {
      setLoading(false)
    }
  }

  return {
    activeTab,
    setActiveTab,
    message,
    setMessage,
    chatHistory,
    loading,
    handleSendMessage,
  }
}
