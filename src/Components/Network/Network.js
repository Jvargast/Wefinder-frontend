import styled from "styled-components";

import search from "../../assets/images/search-icon.svg";
import Members from "./Members";

const Container = styled.div`
  padding-top: 82px;
  max-width: 100%;
`;
/* const Content = styled.div`
    max-width: 1128px;
    margin-left: auto;
    margin-right: auto;

`; */

const Section = styled.section`
  min-height: 50px;
  padding: 16px 0;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;

  h5 {
    color: #038d84;
    font-size: 14px;
    a {
      font-weight: 700;
      color: #038d84;
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



const SearchContainer = styled.div`
  border-bottom-width: 1px;

  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));

  header {
    padding-left: 2rem;
    padding-right: 2rem;
    margin: 0 auto;
    max-width: 80rem;
    display: block;

    div {
      display: flex;
      align-items: center;

      h1 {
        --tw-text-opacity: 1;
        color: rgb(10 10 10/var(--tw-text-opacity));
        letter-spacing: -.025em;
        font-weight: 800;
        font-size: 1.875rem;
        width: 25%;
      }
    }
  }

  @media (min-width: 480px) {
    align-items: center;
  }
`;

const Search = styled.div`
  opacity: 1;
  position: relative;
  width: 50%;

  & > div {
    max-width: 608px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 608px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      height: 34px;
      border-color: #ffb900;
      vertical-align: text-top;
      font-size: 14px;
    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Network = (props) => {
  return (
    <Container>
      <Section>
        <h5>
          <a href="/" style={{ pointerEvents: "none", textDecoration: "none" }}>
            ¿Buscando gente? -{" "}
          </a>
        </h5>
        <p>
          {" "}
          Conectate con más personas profesionales y mantén tu negocio en
          movimiento.
        </p>
      </Section>
      <SearchContainer>
        <header>
          <div>
            <h1>Buscar</h1>
            <Search>
              <div>
                <input type="text" placeholder="Buscar" />
              </div>
              <SearchIcon>
                <img src={search} alt="search" />
              </SearchIcon>
            </Search>
          </div>
        </header>
      </SearchContainer>
      <Members/>
    </Container>
  );
};

export default Network;
