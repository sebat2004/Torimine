import './index.css'
import { Routes, Route } from 'react-router-dom'
import Index from '../routes/Index'
import Login from '../routes/Login'
import Register from '../routes/Register'
import Workspace from '../routes/Workspace'
import Schedule from '../routes/Schedule'
import { createContext, useState, Dispatch, SetStateAction } from 'react'
import Dashboard from '../routes/Dashboard'
import People from '../routes/People'

interface SidebarContext {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface AuthContext {
  user: {
    username: string;
    isAuthenticated: boolean;
  };
  setUser: Dispatch<SetStateAction<{username: string, isAuthenticated: boolean}>>;
}

export const SidebarContext = createContext<SidebarContext>({
  isOpen: true,
  setOpen: () => {},
});

export const AuthContext = createContext<AuthContext>({
  user: {
    username : '',
    isAuthenticated: false
  },
  setUser: () => {}
})

function App() {
  const [user, setUser] = useState<{username: string, isAuthenticated: boolean}>({
    username: '',
    isAuthenticated: false
  })

  const [isOpen, setOpen] = useState<boolean>(true);
  const getAuthenticated = async () => {
    if (!user.isAuthenticated) {
      const response = await fetch('http://localhost:3000/api/authenticated', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          },
          credentials: 'include',
          })
          .then(res => res.json())
          .then(data => {
            return data
          }
        )
      if (response.status === 'success') {
        setUser({
          username: response.user.username,
          isAuthenticated: true
        })
      } else {
        setUser({
          username: '',
          isAuthenticated: false
        })
              }
    }
  }
  getAuthenticated()

  return (
    <>
      <AuthContext.Provider value={{user, setUser}}>
        <SidebarContext.Provider value={{isOpen, setOpen}}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/workspace" element={<Workspace />}>
                <Route index element={<Dashboard />} />
                <Route path="schedule" element={<Schedule />} />
                <Route path="people" element={<People />} />
              </Route>
            </Routes>
        </SidebarContext.Provider>
      </AuthContext.Provider>
    </>
  )
}

export default App
