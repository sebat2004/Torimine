import { useEffect } from "react"
import Navbar from "../components/Navbar"
import RegisterForm from "../components/RegisterForm"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const { user } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/workspace")
    }
  }, [user])

  return (
    <>
        <Navbar />
        <RegisterForm />
    </>
  )
}

export default Register