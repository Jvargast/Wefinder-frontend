import React from 'react';
import { Nav,NavbarContainer, NavLogo, Logo, MobileIcon, NavMenu, NavItem, NavLinks } from './NavbarElements';
import logo from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'


const Navbar = ({toggle}) => {
  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">
            <Logo src={logo}></Logo>
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <FontAwesomeIcon icon={faEllipsisVertical} color="#5e6062" fontSize="25.5px"/>
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks to="unete">Únete</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="lo-que-hacemos-para-ti">Lo Que Hacemos Para Ti</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="unete">Entérate</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="unete">+Conectados</NavLinks>
            </NavItem>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  )
}

export default Navbar