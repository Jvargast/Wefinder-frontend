import React from "react";
import styled from "styled-components";

const Container = styled.li`
  text-align: center;
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color),
    0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  border-radius: 0.5rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  grid-column: span 1 / span 1;
`;

const ProfileContainer = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
  flex-direction: column;
  flex: 1 1 0%;
  display: flex;
  position: relative;
`;

const ButtonWrap = styled.div`
  display: flex;
  margin-top: -1px;

  div {
    button {
      font-weight: 500;
      font-size: 0.875rem;
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      border-color: transparent;
      border-width: 1px;
      border-bottom-left-radius: 0.5rem;
      justify-content: center;
      align-items: center;
      flex: 1 1 0%;
      width: 0;
      display: inline-flex;
      margin-right: -1px;
      position: relative;
      cursor: pointer;
      text-transform: none;

      svg {
        width: 1.25rem;
        height: 1.25rem;
        display: block;
        filter: invert(25%) sepia(74%) saturate(3092%) hue-rotate(162deg)
          brightness(98%) contrast(98%);
      }

      span {
        margin-left: 0.75rem;
        color: #038d84;
      }
    }
  }
`;
const Status = styled.span`
  line-height: 1; 
  font-size: 0.875rem;
  padding: 0.75rem;
  z-index: 10;
  position: relative;
  display: none;
  top: -20px;
  left: 60px;

`;
const Circle = styled.div`

      width: 0.75rem;
      height: 0.75rem;
      margin-top: -0.5rem; 
      border: 1px solid white;
      background-color: #e3e3e3;
      border-radius: 100%;
      display: block;

`;
const Estado = styled.div`
  display: flex;
  flex-direction: column;
  right: 4.5rem; //3.5rem
  bottom: 1rem;
  position: absolute;

  span {
    height: 0.75rem;
    width: 0.75rem;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    margin-right: 6.5px;
    position: relative;
    bottom: 0;

    &:hover {
      ${Status} {
        align-items: center;
        display: flex;
        justify-content: center;
        color: white;
        background-color: black;
        width: 150px;
        height: 50px;
        
      }
      ${Circle}{
        display: none;
      }
    }
    

    
  }
  
`;

const Photo = styled.div`
    transition-delay: .1s;
    transition: cubic-bezier(.4, 0, .2, 1);
    border-radius: 100%;
    overflow: hidden;
    flex-shrink:0;
    width: 8rem;
    height: 8rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
    background-color: gray;
`;

const ProfileCard = ({ profile }) => {
  return (
    <Container>
      <ProfileContainer>
        {profile}
        <a href="profile/anna">
          <Photo>
          </Photo>
          <Estado>
            <span></span>
            <div>
              <Status>Activo hace más de un mes</Status>
              <Circle></Circle>
            </div>
          </Estado>
        </a>

      </ProfileContainer>

      <div>
        <ButtonWrap>
          <div style={{ display: "flex", flex: "1 1 0%", width: 0 }}>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Conectar</span>
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flex: "1 1 0%",
              width: 0,
              marginLeft: "-1px",
            }}
          >
            <button
              style={{
                borderBottomRightRadius: "0.5rem",
                borderBottomLeftRadius: "0",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#ffb900"
                aria-hidden="true"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              <span>Mensaje</span>
            </button>
          </div>
        </ButtonWrap>
      </div>
    </Container>
  );
};

export default ProfileCard;
