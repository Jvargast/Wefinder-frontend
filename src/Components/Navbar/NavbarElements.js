import styled from "styled-components";
import { Link as LinkR} from "react-router-dom";
import { Link as LinkS } from "react-scroll";

export const Nav = styled.nav`
    background-color: #ffffff;
    height: 62px;
/*   margin-top: -80px; */
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 10;
    border-bottom: 2px solid #eee;
    font-family: 'Roboto Slab';


  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
    display: flex;
  justify-content: space-between;
  height: 40px;
  z-index: 1;
  width: 100%;
  max-width: 1200px; 
`;

export const NavLogo = styled(LinkR)`
  cursor: pointer;
`;

export const Logo = styled.img`
    width: 300px;
    height: 40px;
`;

export const MobileIcon = styled.div`
    display: none;
    
    @media screen and (max-width: 768px){
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%,60%);
        font-size: 1.8rem;
        cursor: pointer;
        margin-right:20px;
    }
`;

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-right: 22px;

    @media screen and (max-width: 768px){
        display: none;
    }
`;

export const NavItem = styled.li`
    height:60px;

`;

export const NavLinks = styled(LinkS)`
    font-family: 'Roboto Slab';
    color: #038d84;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 17px;
    height: 100%;
    cursor: pointer;
    font-size:17px;
    transition: 0.22s all ease-in;
    &.active {
        background-color: #ffb900;
        color: #ffffff;
    }
    &:hover {
        background-color: #ffb900;
        color: #ffffff;
        
    }
`;