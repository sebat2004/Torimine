import { useEffect } from "react";
import LoginForm from "../components/LoginForm"
import Navbar from "../components/Navbar"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate('/workspace')
    }
  }, [user])

  return (
    <>
      <Navbar />
      <LoginForm />
    </>
  )
}

export default Login