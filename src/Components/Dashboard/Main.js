import styled from "styled-components";
import userIcon from "../../assets/images/user.svg";
import pIcon from "../../assets/images/photo-icon.svg";
import eIcon from "../../assets/images/event-icon.svg";
import vIcon from "../../assets/images/video-icon.svg";
import aIcon from "../../assets/images/article-icon.svg";

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #038d84;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1 rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const SharedBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #2b2a2a;
  margin: 0 0 8px;
  background: #e0dbdb;;

  div {
    button {
      outline: none;
      background: transparent;
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      color: rgba(0, 0, 0, 0.6);
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
       


      img {
        width: 15px;
        height: 15px;
      }
    }
    &:first-child {
        display: flex;
        align-items: center;
        padding: 0 16px 0 16px;
        img {
            width: 48px;
            border-radius: 50%;
            margin-right: 8px;
        }
        button {
            margin:4px 0;
            flex-grow: 1;
            border-radius: 35px;
            padding-left: 16px;
            border: 1px solid rgba(0, 0, 0, 0.15);
            background-color: white;
            text-align: left;
        }
    }
    &:nth-child(2) {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding-bottom: 4px;

        button {
            img {
                margin: 0 4px 0 -2px;
            }
            span {
                color: #038d84;
            }
        }
    }
  }
`;

const Main = (props) => {
  return (
    <Container>
      <SharedBox>
        Share
        <div>
          <img src={userIcon} alt="user-icon" />
          <button>Comienza un post</button>
        </div>
        <div>
          <button>
            <img src={pIcon} alt="p-icon" />
            <span>Foto</span>
          </button>
          <button>
            <img src={vIcon} alt="v-icon" />
            <span>Video</span>
          </button>
          <button>
            <img src={eIcon} alt="e-icon" />
            <span>Evento</span>
          </button>
          <button>
            <img src={aIcon} alt="a-icon" />
            <span>Artículo</span>
          </button>
        </div>
      </SharedBox>
    </Container>
  );
};

export default Main;
