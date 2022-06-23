import React from 'react';
import {SidebarContainer, Icon, SidebarWrapper, SidebarMenu, SidebarLink, LinkContainer, NavLogo, Logo} from './SidebarElements';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/images/logo.png';

const Sidebar = ({isOpen, toggle}) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon>
            <FontAwesomeIcon icon={faXmark} color="#ccc" fontSize="18px"/>
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
                <LinkContainer>
                    <NavLogo to="/">
                        <Logo src={logo}></Logo>
                    </NavLogo>
                </LinkContainer>
                <LinkContainer>
                    <SidebarLink to="unete" onClick={toggle}>
                        Únete
                    </SidebarLink>
                </LinkContainer>
                <LinkContainer>
                    <SidebarLink to="alto-impacto" onClick={toggle}>
                        Alto Impacto
                    </SidebarLink>
                </LinkContainer>
                <LinkContainer>
                    <SidebarLink to="lo-que-hacemos-para-ti" onClick={toggle}>
                        Lo Que Hacemos Para Ti
                    </SidebarLink>
                </LinkContainer>
                <LinkContainer>
                    <SidebarLink to="/enterate" onClick={toggle}>
                        Entérate
                    </SidebarLink>
                </LinkContainer>
                <LinkContainer>
                    <SidebarLink to="vitrina" onClick={toggle}>
                        Vitrina
                    </SidebarLink>
                </LinkContainer>
                <LinkContainer>
                    <SidebarLink to="conectados" onClick={toggle}>
                        + Conectados
                    </SidebarLink>
                </LinkContainer>
            </SidebarMenu>
        </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar