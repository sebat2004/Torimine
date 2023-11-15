import './index.css'
import { Routes, Route } from 'react-router-dom'
import { createContext, useState, Dispatch, SetStateAction, useEffect } from 'react'
import { AuthProvider, useAuth } from './hooks/useAuth'
import Index from './routes/Index'
import Login from './routes/Login'
import Register from './routes/Register'
import Workspace from './routes/Workspace'
import Schedule from './routes/Schedule'
import Dashboard from './routes/Dashboard'
import People from './routes/People'

interface SidebarContext {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContext>({
  isOpen: true,
  setOpen: () => {},
});

function App() {

  const [isOpen, setOpen] = useState<boolean>(true);

  
  return (
    <>
      <AuthProvider>
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
      </AuthProvider>
    </>
  )
}

export default App
