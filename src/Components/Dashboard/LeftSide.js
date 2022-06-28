import styled from "styled-components";
import cardbg from "../../assets/images/card-bg.svg";
import photo from "../../assets/images/photo.svg";
import itemIcon from "../../assets/images/item-icon.svg";
import widgetIcon from "../../assets/images/widget-icon.svg";
import plus from "../../assets/images/plus-icon.svg";
import { connect } from "react-redux";

const Container = styled.div`
  grid-area: leftside;
  margin-left: 20px;
`;

const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  border-radius: 6px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%); ;
`;

const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
`;

const CardBackGround = styled.div`
  background: url(${cardbg});
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0;
`;

const Photo = styled.div`
  box-shadow: none;

  width: 72px;
  height: 72px;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: white;
  background-position: center;
  background-size: 60%;
  background-repeat: no-repeat;
  border: 2px solid #038d84;
  margin: -38px auto 12px;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-clip: content-box;
    background-color: white;
    background-position: center;
    background-size: 60%;
    background-repeat: no-repeat;
    border: 2px solid #038d84;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Link = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;

const AddPhotoText = styled.div`
  color: #038d84;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.33;
  font-weight: 400;
`;

const Widget = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 12px;
  padding-bottom: 12px;
  & > a {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    div {
      display: flex;
      flex-direction: column;
      text-align: left;
      span {
        font-size: 12px;
        line-height: 1.333;
        &:first-child {
          color: rgba(0, 0, 0, 0.6);
        }
        &:nth-child(2) {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }
  svg {
    color: rgba(0, 0, 0, 1);
  }
`;

const Item = styled.div`
  border-color: rgba(0, 0, 0, 0.8);
  text-align: left;
  padding: 12px;
  font-size: 12px;
  display: block;
  span {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 1);
    svg {
      color: rgba(0, 0, 0, 0.6);
    }
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const ComunityCard = styled(ArtCard)`
  padding: 8px 0 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  a {
    color: black;
    padding: 4px 12px 4px 12px;
    font-size: 12px;
    &:hover {
      color: #038d84;
    }
    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &:last-child {
      color: rgba(0, 0, 0, 0.6);
      text-decoration: none;
      border-top: 1px solid #d6cec2;
      padding: 12px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
    span {
      img:hover {
        filter: invert(51%) sepia(93%) saturate(5769%) hue-rotate(158deg)
          brightness(92%) contrast(98%);
      }
    }
  }
`;

const LeftSide = (props) => {
  return (
    <Container>
      <ArtCard>
        <UserInfo>
          <CardBackGround />
          <a href="/" style={{ pointerEvents: "none", textDecoration: "none" }}>
            <Photo>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} alt="profile" />
              ) : (
                <img src={photo} alt="usrphoto" />
              )}
            </Photo>
            <Link>Welcome {props.user ? props.user.displayName : " "}! </Link>
          </a>
          <a href="/" style={{ pointerEvents: "none", textDecoration: "none" }}>
            <AddPhotoText>Agregar foto</AddPhotoText>
          </a>
        </UserInfo>
        <Widget>
          <a href="/" style={{ pointerEvents: "none", textDecoration: "none" }}>
            <div>
              <span>Conexiones</span>
              <span>Crece tu red</span>
            </div>
            <img src={widgetIcon} alt="" />
          </a>
        </Widget>
        <Item>
          <span>
            <img src={itemIcon} alt="" />
            Mis items
          </span>
        </Item>
      </ArtCard>
      <ComunityCard>
        <a href="/" style={{ textDecoration: "none" }}>
          <span>Grupos</span>
        </a>
        <a href="/" style={{ textDecoration: "none" }}>
          <span>
            Eventos
            <img src={plus} alt="plus" />
          </span>
        </a>
        <a href="/" style={{ textDecoration: "none" }}>
          <span>Tags Seguidos</span>
        </a>
        <a href="/" style={{ textDecoration: "none" }}>
          <span>Descubrir más</span>
        </a>
      </ComunityCard>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(LeftSide);
