import './index.css'
import { Routes, Route } from 'react-router-dom'
import Index from '../routes/Index'
import Login from '../routes/Login'
import Register from '../routes/Register'
import Workspace from '../routes/Workspace'
import Schedule from '../routes/Schedule'
import { createContext, useState, Dispatch, SetStateAction } from 'react'
import Dashboard from '../routes/Dashboard'
import Account from '../routes/Account'

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
      <SidebarContext.Provider value={{isOpen, setOpen}}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/workspace" element={<Workspace />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="account" element={<Account />} />
            </Route>
          </Routes>
      </SidebarContext.Provider>
    </>
  )
}

export default App
