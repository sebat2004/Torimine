import Landing from '../components/Landing'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <Landing />
      </div>
    </>
    
  )
}

export default Home