import Sidebar from '../src/components/Sidebar'
import { createContext, useContext } from 'react'
import { Outlet } from 'react-router-dom'

export const viewContext = createContext<{currentView: string, setCurrentView: React.Dispatch<React.SetStateAction<string>>}>({
  currentView: 'Schedule',
  setCurrentView: () => {}
})

const Workspace = () => {
  const {currentView, setCurrentView} = useContext(viewContext)

  return (
    <>
      <viewContext.Provider value={{currentView, setCurrentView}}>
          <div className="flex w-screen h-screen items-center">
              <Sidebar />
              <Outlet />
          </div>
      </viewContext.Provider>
    </>
  )
}

export default Workspace