import './App.css'
import CarCarousel from './Components/Carasoule'
import CarNavbar from './Components/Navbar'
import Navbar1 from './Components/Navbar'
import Data from './Components/Data'
// import Product from './Components/Product'
import CarFooter from './Components/Footer'
import 'react-toastify/ReactToastify.css'
import VeloceAbout from './Components/About'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Mainlayout from './Layouts/Mainlayout'
import Home from './Components/Home'
import CarContact from './Components/Contact'
import VeloceProfile from './Components/Profile'
import CategoryPage from './Components/Category'
import CarDetails from './Components/Details'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Mainlayout />}>
          <Route index element={<Home />}></Route>
          <Route path="home" element={<Home />}></Route>
          <Route path="about" element={<VeloceAbout />}></Route>
          <Route path="contact" element={<CarContact/>}></Route>
          <Route path="profile" element={<VeloceProfile/>}></Route>
          <Route path="category/:id" element={<CategoryPage/>}></Route>
          <Route path="details/:id" element={<CarDetails/>}></Route>
        </Route>
      </Routes>
      {/* <CarNavbar/>
      <CarCarousel/> 
      <VeloceAbout/>
      <CarFooter/>
      <Data />
      <Product/> */}
    </>
  )
}

export default App
