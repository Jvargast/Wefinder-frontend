import styled from 'styled-components';
import "@fontsource/roboto-slab";

export const HeroContainer = styled.div`
    
`;


export const HeroBg = styled.div`
    width: 100%;    
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50%;
    padding-top: 50px;
    max-width: 1100px;
    margin: 0 auto;
`;
export const Image = styled.div`
    height: 105px;
    margin-bottom: 23px;

    img {
        width: 96px;
        height: 96px;
        filter: invert(48%) sepia(77%) saturate(693%) hue-rotate(358deg) brightness(96%) contrast(100%);

        
    }
    
`;
export const Title = styled.div`
    display: flex;
    height: 52px;
    text-align: center;
    justify-content: center;
    margin-bottom: 20px;
    

    h2 {
        font-size: 40px;
        color: #038D84;
        font-weight: 800;
        font-family: 'Roboto Slab';
    }

    @media screen and (max-width: 768px){
        h2 {
            font-size: 30px;
        }
    }
`;
export const Paragraph = styled.p`
    color: #536062;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 52px;
    font-size: 24px;

    @media screen and (max-width: 768px){
        font-size: 20px;
        height: 100px;
    }

`;

export const HeroArrow = styled.div`
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(https://wefinder.cl/wp-content/uploads/2022/04/dark.jpg);
    height: 385px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const ButtonContainer = styled.div`
    a {
        text-decoration: none;
    }
`;


export const Button = styled.span`
    font-family: "Roboto Slab", Sans-serif;
    font-size: 25px;
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
`; 