import styled from 'styled-components';
import {Link as LinkS} from 'react-scroll';
import {Link as LinkR} from 'react-router-dom';

export const SidebarContainer = styled.aside`
    position: fixed;
    z-index: 90;
    width: 100%;
    height: 100%;
    background: #fff;
    display: grid;
    align-items: center;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
    opacity: ${({isOpen}) => (isOpen ? '100%' : '0')};
    left: ${({isOpen}) => (isOpen ? '0':'-100%')}; 

`;

export const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 17px;
    cursor: pointer;
    outline: none;
`;

export const SidebarWrapper = styled.div`
    color: #ffb900;
`;

export const SidebarMenu = styled.ul`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(7,82px);
    text-align: center;
    

    @media screen and (max-width: 480px){
        grid-template-rows: repeat(7,60px);
    }
`;

export const SidebarLink = styled(LinkS)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 17px;
    text-decoration: none;
    list-style: none;
    transition: 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
        color: #038d84;
        transition: 0.2s ease-in-out;
        

    }
    
`;

export const LinkContainer = styled.div`
    border-top: 1.2px solid #ccc;
    padding: 15px 25px;
    display: flex;
    align-items: center;
`;

export const NavLogo = styled(LinkR)`
  cursor: pointer;
`;

export const Logo = styled.img`
    width: 300px;
    height: 40px;
`;