import Landing from '../src/components/Landing'
import Navbar from '../src/components/Navbar'

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