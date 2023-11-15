import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react"
import { AiOutlineLoading } from "react-icons/ai"

const Schedule = () => {
  const { user } = useAuth()
  const [inputValues, setInputValues] = useState<{ [x: string]: string }>()
  const [errorMessage, setErrorMessage] = useState<any>()

  const handleFormSubmit = async (e: React.MouseEvent<HTMLElement>) => {
      setErrorMessage(<AiOutlineLoading className="animate-spin text-3xl" />)

      e.preventDefault()
      const data = {
          username: inputValues?.username,
          title: inputValues?.title,
          starttime: inputValues?.starttime,
          endtime: inputValues?.endtime
      }
      
      if (!data.username || !data.title || !data.starttime || !data.endtime) {
        setErrorMessage(<h1 className="text-red-500">Please fill in all fields.</h1>)
      } else {
        // Add event to the user's calendar
        fetch(`http://localhost:3000/api/users/${user.username}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ title: data.title, starttime: data.starttime, endtime: data.endtime })
        }).then(res => res.json())
      }
  }

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget
      setInputValues(prevState => ({ ...prevState, [name]: value }))
  }
  
  return (
    <>
      <div className="py-10 px-10">
        <div className="flex flex-col gap-5 h-[100%]">
          <div className="flex flex-col gap-10">
            <h1 className="header">Schedule Page</h1>
            <div className="flex flex-col items-center gap-5 w-[100%] bg-[#f8f8fa] py-8 px-7 rounded-md">
              <h1 className="text-2xl font-semibold">Schedule a meeting!</h1>
              <div className="flex flex-col gap-1 pt-6">
                <label className="text-left">Username of coworker</label>
                <input className="input bg-[#e0e1e0] border-opacity-10" type="text" name="username" onChange={handleInputChange}/>
                <label className="text-left">Title of meeting</label>
                <input className="input bg-[#e0e1e0] border-opacity-10" type="text" name="title" onChange={handleInputChange}/>
                <label className="text-left">Start Time</label>
                <input className="input bg-[#e0e1e0] border-opacity-10" type="text" name="starttime" onChange={handleInputChange}/>
                <label className="text-left">End Time</label>
                <input className="input bg-[#e0e1e0] border-opacity-10" type="text" name="endtime" onChange={handleInputChange}/>
              </div>
              <h1 className="shadow-lg btn-md btn btn-neutral w-[200px]" onClick={handleFormSubmit}>Schedule Meeting</h1>
              {errorMessage}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Schedule