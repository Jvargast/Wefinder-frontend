import React from 'react';
import styled from 'styled-components';
import LeftSide from "./LeftSide";
import Main from "./Main";
import RightSide from "./RightSide";
import { Navigate } from 'react-router';
import { connect } from 'react-redux';


const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
`;


const Section = styled.section`
  margin-top: 20px;
  min-height: 10px;
  padding: 16px 12px;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;

  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
      
    }
  }
  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  background-color: rgba(0, 0, 0, 0.09);
  column-gap: 25px;
  row-gap: 25px;
  padding-top: 10px;
  /* grid-template-row: auto; */

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;
const Home = (props) => {

  return (
    <Container>
      {!props.user && <Navigate to="/"/>  }
      <Section>
        <h5>
          <a href='/dashboard/mi-red'>¿Buscando personas profesionales? - </a>
        </h5>
        <p>
         Encuentra personas talentosas en buen tiempo que deseen trabajar contigo y crecer tu negocio.
        </p>
      </Section>
      <Layout>
        <LeftSide/>
        <Main />
        <RightSide />
      </Layout>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
}

export default connect(mapStateToProps)(Home);