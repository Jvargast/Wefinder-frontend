import React,{useState} from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { registerInitiate } from "../../actions";
import ins from "../../assets/images/inscribete.png";
//import db from "../../firebase";

const Container = styled.div``;

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  animation: fadeInRight 3s;

  label {
    font-size: 25px;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  input {
    width: 400px;
    padding: 15px;
  }
  p {
    color: gray;
    a {
      text-decoration: none;
      color: #00a89c;
    }
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

  &:hover {
    background-color: #ffb900;
    color: white;
  }
`;

const RegisterForm = (props) => {
  
  const [state, setState] = useState({
    displayName: "",
    email: "",
    profilePic:"",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

/*   useEffect(()=>{
    if(user) {
        navigate("/dashboard")
    }
  },[user,navigate]); */


  const { displayName,email,profilePic, password, confirmPassword } = state;
  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
        return;
    };
    
    /* db.collection("users").doc("1").set({
        name: displayName,
        email:email,
        profilePic:profilePic
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    }); */
    console.log("Empezando registro")
    dispatch(registerInitiate(email,password,displayName,profilePic));
    setState({displayName:"",email:"",profilePic:"",password:"", confirmPassword:""});
    console.log("Registro terminado");
    navigate("/dashboard");

  };
  const handleChange = (e) =>{
    setState((p)=>({...p,[e.target.name]:e.target.value}));
  };
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
            <label>Nombre Completo</label>
            <input type="text" placeholder="Ingrese su nombre" id="inputName" onChange={e=>handleChange(e)} value={state[displayName]} name="displayName"required></input>
            <label>Correo</label>
            <input type="text" placeholder="Ingrese su correo" id="inputEmail" onChange={e=>handleChange(e)} value={state[email]} name="email" required></input>
            <label>URL foto de perfil</label>
            <input type="text" placeholder="Foto de perfil (pcional)" id="inputProfilePic" onChange={e=>handleChange(e)} value={state[profilePic]} name="profilePic"></input>
            <label>Contraseña</label>
            <input type="password" placeholder="Ingrese su contraseña" id="inputPassword" onChange={e=>handleChange(e)} value={state[password]} name="password" required></input>
            <label>Confirmar contraseña</label>
            <input type="password" placeholder="Repita la contraseña" id="inputConfirmPassword" onChange={e=>handleChange(e)} value={state[confirmPassword]} name="confirmPassword"required></input>
            <ButtonContainer>
              <Button type="submit">Inscríbete</Button>
            </ButtonContainer>
            <p>
              <span>¿Ya tienes cuenta? </span>
              <Link to="/iniciar-sesion">Acceder</Link>
            </p>
          </Form>
        </FormContainer>
        <Image>
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

const mapStateToProps = (state) => {
    return {
      user:state.userState.user,
    }
  };

export default connect(mapStateToProps)(RegisterForm);