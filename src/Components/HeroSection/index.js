import React from 'react';
import {HeroContainer, HeroBg, Image, Title, Paragraph, HeroArrow, Button, ButtonContainer} from './HeroElements';
import bes from '../../assets/images/bulls-eye.svg';
const HeroSection = () => {
  
  return (
    <HeroContainer id="home">
        <HeroBg>
            <Image>
                <a  href='/'>
                    <img src={bes} alt="alter" /> 
                </a>
                
            </Image>
            <Title><h2>Conecta / Emprende / Impacta</h2></Title>
            <Paragraph>Somos el espacio de conexión <br/> para el mundo del emprendimiento e innovación</Paragraph>
        </HeroBg>
        <HeroArrow>
            <ButtonContainer>
                <a href='#unete'>
                    <Button>Únete</Button>
                </a>
            </ButtonContainer>
            
        </HeroArrow>
    </HeroContainer>
  )
}

export default HeroSection