import Sidebar from '../src/components/Sidebar'
import { createContext, useContext } from 'react'
import Dashboard from './Dashboard'
import Schedule from './Schedule'
import Account from './Account'
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
          <div className="flex">
              <Sidebar />
              <Outlet />
          </div>
      </viewContext.Provider>
    </>
  )
}

export default Workspace