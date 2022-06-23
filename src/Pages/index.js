import React, {useState} from 'react'
import HeroSection from '../Components/HeroSection'
import Navbar from '../Components/Navbar'
import NavbarHeader from '../Components/NavbarHeader'
import Section from '../Components/LoginSection'
import Sidebar from '../Components/Sidebar'


const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }
  return (
    <>
        <Sidebar isOpen={isOpen} toggle={toggle}/>
        <NavbarHeader/>
        <Navbar  toggle={toggle}/>
        <HeroSection/>
        <Section/>
    </>
  )
}

export default Home