import React from 'react'
import Navbar from '../Components/Navbar'
import NavbarHeader from '../Components/NavbarHeader'
import RegisterForm from '../Components/RegisterSection'
/* import RegisterOptional from '../Components/RegisterOptional' */

const Register = () => {
  return (
    <>
      <NavbarHeader/>
      <Navbar/>
      {/* <RegisterOptional/> */}
      <RegisterForm/>
    </>
  )
}

export default Register