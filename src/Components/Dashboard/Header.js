import styled from "styled-components";
import logo from "../../assets/images/logo.jpeg";
import home from '../../assets/images/nav-home.svg';
import net from '../../assets/images/nav-network.svg';
import works from '../../assets/images/nav-jobs.svg';
import mjs from '../../assets/images/nav-messaging.svg';
import nt from '../../assets/images/nav-notifications.svg';
import dwi from '../../assets/images/down-icon.svg';
import wi from '../../assets/images/nav-work.svg';
import userIcon from '../../assets/images/user.svg';
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { signOutApi } from "../../actions";

const Container = styled.div`
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    left: 0;
    padding: 0 24px;
    width: 100vw;
    z-index: 100;
    font-family: 'Roboto Slab';
    position: fixed;

`;

const Content = styled.div`
    display: flex;
    align-items: center;
    margin: 0 auto;
    min-height: 100%;
    max-width: 1128px;
    height: 76px;
`;

const Logo = styled.div`
    margin-right: 20px;
    font-size: 0px;
`;



const Nav = styled.nav`
    margin-left: auto;
    display: block;

    @media (max-width: 768px) {
        position: fixed;
        left: 0;
        bottom: 0;
        background: white;
        width: 100%;
        align-content: center;
        text-align: center;
        justify-content: space-between;
        display: flex;
    }
`;

const NavListWrap = styled.ul`
    display: flex;
    flex-wrap: nowrap;
    list-style-type: none;

    .active {
        span:after {
            content: '';
            transform: scaleX(1);
            border-bottom: 2px solid var(--white, #fff);
            bottom: 0;
            left: 0;
            position: absolute;
            transition: transform 0.2s ease-in-out;
            width: 100%;
            border-color: rgba(0, 0, 0, 0.9);

        }
    }
`;

const NavList = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    a {
        align-items: center;
        background: transparent;
        display: flex;
        flex-direction: column;
        font-size: 12px;
        font-weight: 400;
        justify-content: center;
        line-height: 1.5;
        min-height: 77px;
        min-width: 80px;
        position: relative;
        text-decoration: none;
 

        span {
            color: #038d84;
            display: flex;
            align-items: center;
        }
        @media (max-width: 768px) {
            min-width: 70px;
        }
    }
    &:hover,
    &:active {
        a {
            span {
                color: #ffb900;
                
            }
        }
  }
`;
const SignOut = styled.div`
position: absolute;
top: 45px;
background: white;
border-radius: 0 0 5px 5px;
width: 100px;
/* height: 40px; */
font-size: 16px;
transition-duration: 167ms;
text-align: center;
display: none;
cursor: pointer;
  a {
    color: #038d84;
  }
  
`;

const User = styled(NavList)`
    a > svg {
        width: 24px;
        border-radius: 50%;

    }
    a > img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
    }

    span {
        display: flex;
        align-items: center;
        color: #038d84;
    }
    &:hover {
        ${SignOut} {
            align-items: center;
            display: flex;
            justify-content: center;
            color:#038d84;
            border-bottom: 1px solid ;
            width: 70px
            

        }
    }
`;



const Work = styled(User)`
    border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

const Header = (props) => {

    let {pathname} = useLocation();

    
    return (
        <Container>
            <Content>
                <Logo>
                    <a href="/dashboard">
                        <img src={logo} alt="logo"></img>
                    </a>
                </Logo>
                
                <Nav>
                    <NavListWrap>
                        <NavList className={pathname === '/dashboard' ? 'active' : ''}>
                            <a href="/dashboard">
                                {/* <FontAwesomeIcon icon={faHome}/> */}
                                <img src={home} alt="home"/>
                                <span>Inicio</span>
                            </a>
                        </NavList>
                        <NavList className={pathname === '/dashboard/mi-red' ? 'active' : ''}>
                            <a href="/dashboard/mi-red">
                                <img src={net} alt="home"/>
                                <span>Mi red</span>
                            </a>
                        </NavList>
                        <NavList className={pathname === '/dashboard/trabajos' ? 'active' : ''}>
                            <a href="/dashboard/trabajos" style={{pointerEvents:"none"}}>
                                <img src={works} alt="home"/>
                                <span>Trabajos</span>
                            </a>
                        </NavList>
                        <NavList className={pathname === '/dashboard/mensajes' ? 'active' : ''}>
                            <a href="/dashboard/mensajes">
                                <img src={mjs} alt="home"/>
                                <span>Mensajes</span>
                            </a>
                        </NavList>
                        <NavList  >
                            <a href="/notificaciones">
                                <img src={nt} alt="home"/>
                                <span>Notificaciones</span>
                            </a>
                        </NavList>

                        <User>
                            <a href="/dashboard/perfil">
                             
                                {props.user && props.user.photoURL ?  <img src={props.user.photoURL} alt="profile" />
                                :<img src={userIcon} alt="user"/>}
                                <span>Yo
                                    <img src={dwi} alt="" />
                                </span>
                            </a>
                            <SignOut onClick={()=> props.signOut()}>
                                <a href="/">Cerrar Sesión</a>
                            </SignOut>
                        </User>
                        <Work>
                            
                            <a href="/virtrina">
                                <img src={wi} alt=""/>
                                <span>Vitrina
                                <img src={dwi} alt="" />
                                </span>
                                
                            </a>
                        </Work>
                    </NavListWrap>
                </Nav>
            </Content>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    }
};

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(signOutApi()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);