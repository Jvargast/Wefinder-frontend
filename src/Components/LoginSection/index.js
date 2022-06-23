import React, { useState } from 'react';
import {SectionContainer, InfoWrapper, Column, TitleContainer, Image, Separator,SubTitle,ContentContainer, ButtonContainer,Button, ButtonWrapper, LoginButton, Form, Google} from './SectionElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import google from '../../assets/images/google.svg';

const Section = () => {
  const [id, setId] = useState('#unete');

  return (
    <>
    <SectionContainer id={id}>
        <InfoWrapper>
            <Column>
                
                <TitleContainer>
                    <p>
                        <strong>Conecta </strong>
                        más alla de tu propia red
                        <br/>
                        <strong>Emprende </strong>
                        tu idea
                        <br/>
                        <strong>Impacta </strong>
                        con nuevas soluciones
                        <br/>
                    </p>
                </TitleContainer>
                <Separator/>
                <SubTitle>
                    <p>
                        Vínculamos
                        <strong> conocimientos, habilidades y experiencias que generan innovación</strong>
                        
                    </p>
                </SubTitle>
                <ContentContainer>
                    <ul>
                        <li>
                            <span>
                                <FontAwesomeIcon icon={faCheck} color="#ffb900">
                                </FontAwesomeIcon>
                            </span>
                            <span> ¿Tienes una idea o tecnología con gran potencial que quieras impulsar? </span>
                        </li>
                        <li>
                            <span><FontAwesomeIcon icon={faCheck}  color="#ffb900">
                                </FontAwesomeIcon></span><span> ¿Tienes una idea de negocios o una tecnología de impacto? </span>
                        </li>
                        <li>
                            <span><FontAwesomeIcon icon={faCheck}  color="#ffb900">
                                </FontAwesomeIcon></span><span> ¿Buscas una tecnología para implementar tu solución? </span>
                        </li>
                        <li>
                            <span><FontAwesomeIcon icon={faCheck}  color="#ffb900">
                                </FontAwesomeIcon></span><span> ¿Crees que tus habilidades podrían brillar en una startup? </span>
                        </li>
                    </ul>
                </ContentContainer>
                <ButtonWrapper>
                    <ButtonContainer>
                        <Button to="/inscribete"> <FontAwesomeIcon icon={faUser}/> Soy Emprendedor</Button>
                        <Button to="/empresas"> <FontAwesomeIcon icon={faUser}/> Soy Intraemprendedor</Button>
                    </ButtonContainer>
                    <p>¿Ya tienes cuenta?</p>  <LoginButton to='iniciar-sesion'>Inicia Sesión</LoginButton>
                    <Form>
                        <Google>
                            <img src={google} alt='google'/>
                            Sign in with Google
                        </Google>
                    </Form>
                </ButtonWrapper>   
            </Column>
            <Image/>
        </InfoWrapper>
    </SectionContainer>
    </>
    
  )
}

export default Section