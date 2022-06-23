import styled from 'styled-components';
import {Link as LinkR} from 'react-router-dom';
//import bgs from '../../assets/images/background-login-section';
import "@fontsource/roboto-condensed";

export const SectionContainer = styled.section`

    @media screen and (max-width: 768px){
        padding: 10px 0;
    }
`;

export const InfoWrapper = styled.div`
    display: flex;
    z-index: 1;
    height: 670px;
    width: 100%;
    margin-right: auto;
    margin-left:auto;
    justify-content: start;


    @media screen and (max-width: 768px){
        align-items: center;
        justify-content: center;
        position: absolute;
        
    }

`;


export const Column = styled.div`
    max-width: 1100px;
    margin-left: 60px;
    padding: 30px;
    
    
`;



export const TitleContainer = styled.div`
    color: #038D84;
    font-family: "Roboto Slab", Sans-serif;
    font-size: 26px;
    line-height: 32px;
    margin-top: 45px;
    
`;

export const Image = styled.div`
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(https://wefinder.cl/wp-content/uploads/2022/04/xet.jpg);
    width: 100%;
    height: 100%;
    background-position-x: right;

    @media screen and (max-width: 768px) {
        background-position-x: left;
    }

`;

export const Separator = styled.div`
    --divider-border-style: solid;
    --divider-color: #FFB900;
    --divider-border-width: 4px;
    margin: 0px 0px 0px 20px;
    border-bottom: var(--divider-border-width) var(--divider-border-style) var(--divider-color);
    text-align: left;
    padding-top: 15px;
    padding-bottom: 15px;
    width: 181px;
`;

export const SubTitle = styled.div`
    margin-top: 20px;
    margin-bottom: 38px;
    width: 600px;

    p {
        font-size: 26px;
        
        color: #5e6062;
    }
`;

export const ContentContainer = styled.div`
    display: flex;
    font-size: 17px;
    color: #5e6062;

    
    li {
        list-style: none;
        margin-bottom: 10px;
        
        span {
            padding-right: 5px;
            
        }
    }

`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;

    p {
        color: #5e6062;
    }

`;
export const LoginButton = styled(LinkR)`
    text-decoration: none;
    color: #000;
`; 

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    margin-top: 20px;

`;


export const Button = styled(LinkR)`
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  font-family: "Roboto Slab", Sans-serif;
  font-size: 16px;
  font-weight: 700;
  text-transform: none;
  font-style: normal;
  letter-spacing: 0px;
  word-spacing: 0px;
  fill: #FFFFFF;
  color: #FFFFFF;
  background-color: #038D84;
  border-radius: 30px 30px 30px 30px;
  box-shadow: 1px 8px 10px 0px rgb(0 0 0 / 35%);
  padding: 10px 30px 10px 30px;
  margin-right: 28px;
`;

export const Form = styled.div`
    margin-top: 10px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        margin-top:20px;
    }
`;

export const Google = styled.button`
    display: flex;
    justify-content: center;
    background-color: #fff;
    align-items: center;
    height: 40px;
    width: 100%;
    border-radius: 28px;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
    vertical-align: middle;
    z-index: 0;
    transition-duration: 167ms;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.6);
    &:hover {
      background-color: rgba(207, 207, 207, 0.25);
      color: rgba(0, 0, 0, 0.75);
    }
`;