import './index.css'
import { Routes, Route } from 'react-router-dom'
import Home from '../routes/Home'
import Login from '../routes/Login'
import { createContext, useState, Dispatch, SetStateAction } from 'react'

interface NavbarContext {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const NavbarContext = createContext<NavbarContext>({
  isOpen: true,
  setOpen: () => {},
});

function App() {

  const [isOpen, setOpen] = useState(true);

  return (
    <>
    <NavbarContext.Provider value={{isOpen, setOpen}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </NavbarContext.Provider>
    </>
  )
}

export default App
