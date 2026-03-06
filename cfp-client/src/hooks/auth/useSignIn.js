import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import String from "../../String"
import { signInFailure, signInStart, signInSuccess } from "../../Redux/User/userSlice"
import { getApiErrorMessage } from "../../components/Private/transactionApi"

export const useSignIn = () => {
  const [formData, setFormData] = useState({})
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.email || !formData.password) {
      toast.error("Informe email e senha.")
      return
    }

    dispatch(signInStart())

    try {
      const { data } = await axios.post(`${String}/user/signin`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      dispatch(signInSuccess(data))
      toast.success(data.message)
      navigate("/dashboard")
    } catch (error) {
      const message = getApiErrorMessage(error, "Erro ao realizar login.")
      dispatch(signInFailure(message))
      toast.error(message)
    }
  }

  return {
    currentUser,
    handleChange,
    handleSubmit,
  }
}
