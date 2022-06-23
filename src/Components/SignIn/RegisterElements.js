import React from "react";
import styled from "styled-components";
import ins from "../../assets/images/inscribete.png";
import "animate.css";
import Indicator from "./Indicator";
import { useState } from "react";

const Container = styled.section`
  width: 1440px;
`;

const Wrapper = styled.div`
  padding-top: 50px;
  display: flex;
  max-width: 1140px;
  margin-right: auto;
  margin-left: auto;
  position: relative;
`;

const FormContainer = styled.div`
  width: 56.038%;
  min-height: 1px;
  transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
  padding: 30px 10px 0px 10px;
`;

const Image = styled.div`
  width: 43.914%;
  min-height: 1px;

  div {
    padding: 10px;
    display: flex;

    div {
      width: 100%;
      position: relative;
      text-align: center;

      img {
        width: 100%;
        object-fit: contain;
        height: 500px;
        border-radius: 0 0 0 0;
      }
    }
  }
`;

const Title = styled.div`
  text-align: left;
  margin-bottom: 20px;
  animation-name: fadeInDown;

  h6 {
    color: #5e6062;
    font-size: 21px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2.1px;
  }
`;

const SubTitle = styled.div`
  text-align: left;
  margin-bottom: 20px;

  h6 {
    color: #00a89c;
    font-family: "Roboto Slab", Sans-serif;
    font-size: 27px;
    font-weight: 700;
    text-transform: none;
    line-height: 1.3;
  }
`;

const Separator = styled.div`
  padding: 0px 0px 10px 0px;
  margin-bottom: 20px;
  animation-name: lightSpeedIn;
  animation-timing-function: ease-out;
  div {
    text-align: left;
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;

    span {
      width: 50px;
      margin: 0 auto;
      margin-left: 0;
      display: flex;
      direction: ltr;
      --divider-border-style: solid;
      --divider-color: #00a89c;
      --divider-border-width: 2px;
      border-top: var(--divider-border-width) var(--divider-border-style)
        var(--divider-color);
    }
  }
`;

const Form = styled.div`
  margin-bottom: 26px;

  form {
    display: block;
    margin-top: 0em;
  }
`;

const RegisterElements = () => {
  const [step, setStep] = useState(25);

  const handleProgressBar = () => {
    setStep(step+25);
    if(step===100) {
      setStep(0);
    }
  }

  return (
    <Container>
      <Wrapper>
        <FormContainer className="animate__fadeInRight">
          <Title>
            <h6>Potencia tus fortalezas y complementa tus habilidades.</h6>
          </Title>
          <SubTitle>
            <h6>Inscríbete en Wefinder</h6>
          </SubTitle>
          <Separator>
            <div>
              <span></span>
            </div>
          </Separator>
          <Form>
            
              <Indicator done={step} />
              <button onClick={handleProgressBar}>Siguiente</button>
            
          </Form>
        </FormContainer>
        <Image className="animate__fadeInLeft">
          <div>
            <div>
              <img src={ins} alt="inscribete" />
            </div>
          </div>
        </Image>
      </Wrapper>
    </Container>
  );
};

export default RegisterElements;
