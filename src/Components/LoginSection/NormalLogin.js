import React, { useState,useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';
import ins from "../../assets/images/inscribete.png";
import styled from 'styled-components';
import { loginInitiate } from '../../actions';

const Container = styled.div`
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

const Title = styled.div`
  text-align: left;
  margin-bottom: 20px;
  animation: fadeInDown 2s;

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
  animation: fadeInLeft 2s;

  h6 {
    color: #00a89c;
    font-family: "Roboto Slab", Sans-serif;
    font-size: 27px;
    font-weight: 700;
    text-transform: none;
    line-height: 1.3;
  }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    animation: fadeInRight 3s;

    label {
      font-size: 25px;
      margin-bottom:10px;
      margin-top: 10px;
    }
    input {
      width: 400px;
      padding: 15px;
    }
    p{
      color: gray;
      a {
        text-decoration: none;
        color: #00a89c;
      }
    }
`;

const PasswordContainer = styled.div`
  display: flex;
  flex-direction: row;
  button {
    margin-left: -100px;
    background-color: transparent;
    border: none;
    width: 100px;
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  padding-top: 20px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 20px;
  color: #038d84;
  font-size: 20px;

  &:hover{
    background-color: #ffb900;
    color: white;
  }
`;

const Image = styled.div`
  width: 43.914%;
  min-height: 1px;
  animation: fadeInLeft 2s;

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
const NormalLogin = () => {

  const [form,setForm] = useState({
    email:"",
    password:"",
  })
  const {email,password} = form;
  const {user} = useSelector(user=>user.userState);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(user) {
        navigate("/dashboard")
    }
  },[user,navigate]);

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!email || !password){
      return;
    }
    dispatch(loginInitiate(email,password));
    setForm({email:"",password:""});
    navigate("/dashboard");
  }
  const handleChange = (e) => {
    setForm((p)=>({...p,[e.target.name]:e.target.value}));
  }

  //Password visualization
  const [showPass, setShowPass] = useState(false);
  const handleShowPass = (e) =>{
    e.preventDefault();
    setShowPass(!showPass);
  }
  return (
    <Container>
        <Wrapper>
        <FormContainer>
          <Title>
            <h6>Potencia tus fortalezas y complementa tus habilidades.</h6>
          </Title>
          <SubTitle>
            <h6>Inscríbete en Wefinder</h6>
          </SubTitle>
          <Form onSubmit={handleSubmit}>
            <label>Correo Electrónico</label>
            <input type="text" placeholder="Ingrese su correo electrónico" id='inputEmail' name='email' onChange={e=>handleChange(e)} value={form[email]} required></input>
            <label>Contraseña</label>
            <PasswordContainer>
              <input type={showPass ? "text" : "password"} placeholder="Ingrese su contraseña" id='inputPassword' name='password' onChange={e=>handleChange(e)} value={form[password]} required></input>
              <button onClick={handleShowPass}>Mostrar</button>
            </PasswordContainer>
            
            <ButtonContainer>
              <Button type='submit'>Iniciar Sesión</Button>
            </ButtonContainer>
            <p>
              <span>¿No tienes cuenta? </span>
              <Link to="/inscribete">Inscríbete</Link>
            </p>
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
  )
}
const mapStateToProps = (state) => {
  return {
    user:state.userState.user,
  }
};

export default connect(mapStateToProps)(NormalLogin);