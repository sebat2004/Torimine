import { useState } from "react"
import { AiOutlineLoading } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const People = () => {
  const { user } = useAuth()
  const [usernameInput, setUsernameInput] = useState<string>()
  const [errorMessage, setErrorMessage] = useState<any>()
  const navigate = useNavigate()

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setUsernameInput(value)
  }

  const handleFormSubmit = async (e: React.MouseEvent<HTMLElement>) => {
      setErrorMessage(<AiOutlineLoading className="animate-spin text-3xl" />)

      e.preventDefault()
      
      if (!usernameInput) {
          setErrorMessage(<h1 className="text-red-500">Please fill in all fields.</h1>)
      } else {

          // Add the other user to the current user's coworkers list
          fetch(`http://localhost:3000/api/users/${user.username}/coworkers`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({ coworker: usernameInput })
          }).then(res => res.json())
          .then(data => {
              if (data.status === 'success') {
                  setErrorMessage(<h1 className="text-green-500">{data.message}</h1>)
              } else {
                  setErrorMessage(<h1 className="text-red-500">{data.message}</h1>)
              }
          });
      }
  }

  return (
    <>
      <div className="my-7 mx-10">
        <div className="flex flex-col gap-5 h-[100%]">
          <div className="flex flex-col gap-5 justify-between">
              <h1 className="header">People Page</h1>
              <div className="flex flex-col items-center gap-5 w-[100%] bg-[#f8f8fa] py-8 px-7 rounded-md">
                <h1 className="text-2xl font-semibold">Add a co-worker!</h1>
                <div className="flex flex-col gap-1 pt-6">
                  <label className="text-left">Username</label>
                  <input className="input bg-[#e0e1e0] border-opacity-10" type="text" name="username" onChange={handleInputChange}/>
                </div>
                <h1 className="shadow-lg btn-md btn btn-neutral w-[150px]" onClick={handleFormSubmit}>Login</h1>
                {errorMessage}
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default People