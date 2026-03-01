import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import string from "../../String"
import { signOut } from "../../Redux/User/userSlice"
import { getApiErrorMessage } from "../../Componets/Private/transactionApi"

export const useSignOut = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const signOutUser = async () => {
      try {
        const response = await axios.get(`${string}/user/signout`, {
          withCredentials: true,
        })
        dispatch(signOut())
        toast.success(response.data.message)
        navigate("/signin")
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Erro ao sair da conta."))
        navigate("/")
      }
    }

    signOutUser()
  }, [dispatch, navigate])
}
