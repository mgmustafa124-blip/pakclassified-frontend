import React from 'react'
import CarNavbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
import CarFooter from '../Components/Footer'
import CarCarousel from '../Components/Carasoule'

function Mainlayout() {
    
  return (
    <>
    <CarNavbar/>
    <Outlet/>
    <CarFooter/>
    </>
  )
}

export default Mainlayout