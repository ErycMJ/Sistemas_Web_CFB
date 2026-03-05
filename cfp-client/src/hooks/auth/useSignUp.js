import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import String from "../../String"
import { getApiErrorMessage } from "../../Componets/Private/transactionApi"

export const useSignUp = () => {
  const [formData, setFormData] = useState({})
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate()

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.username || !formData.email || !formData.password || !formData.mobile) {
      toast.error("Preencha o formulário completo.")
      return
    }

    try {
      const { data } = await axios.post(`${String}/user/signup`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      toast.success(data.message)
      navigate("/signin")
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao criar conta."))
    }
  }

  return {
    currentUser,
    handleChange,
    handleSubmit,
  }
}
