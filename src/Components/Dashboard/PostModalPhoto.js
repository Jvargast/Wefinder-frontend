import styled from "styled-components";
import closeIcon from "../../assets/images/close-icon.svg";
import userIcon from "../../assets/images/user.svg";
import { useState } from "react";
import { connect, useSelector } from "react-redux";
import firebase from "firebase";
import { postArticleAPI } from "../../actions";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  justify-content: space-between;
  align-items: center;

  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    cursor: pointer;
    svg,
    img {
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const SharedCreation = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 12px 24px 12px 16px;
  align-items: center;
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.8)" : "#038d84")};
  color: ${(props) => (props.disabled ? "rgba(1, 1, 1, 0.8)" : "white")};

  &:hover {
    background: ${(props) =>
      props.disabled ? "rgba(0, 0, 0, 0.08)" : "#ffb900"};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const PostModalPhoto = (props) => {
  const [sharedImage, setSharedImage] = useState("");
  const { user } = useSelector((state) => ({ user: state.userState.user }));
  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`Not an image, the image file is a ${typeof image}`);
      return;
    }

    setSharedImage(image);
  };

  const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      image: sharedImage,
      video: "",
      user: props.user,
      description: "",
      timestamp: firebase.firestore.Timestamp.now(),
      userId: user.uid,
    };

    props.postArticle(payload);
    reset(e);
  };
  const reset = (e) => {
    setSharedImage("");
    props.handlerPost(e);
  };
  return (
    <>
      {props.showModalPhoto === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Crear una publicación</h2>
              <button onClick={(event) => reset(event)}>
                <img src={closeIcon} alt="closed" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="usr" />
                ) : (
                  <img src={userIcon} alt="usr" />
                )}
                <span>{props.user.displayName}</span>
              </UserInfo>
              <Editor>
                <UploadImage>
                  <input
                    type="file"
                    accept="image/gif, image/jpeg, image/png"
                    name="image"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                  <p>
                    <label htmlFor="file">
                      Seleccionar una imagen para compartir
                    </label>
                  </p>
                  {sharedImage && (
                    <img src={URL.createObjectURL(sharedImage)} alt="display" />
                  )}
                </UploadImage>
              </Editor>
            </SharedContent>
            <SharedCreation>
              <PostButton
                disabled={!sharedImage ? true : false}
                onClick={(event) => postArticle(event)}
              >
                Publicar
              </PostButton>
            </SharedCreation>
          </Content>
        </Container>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModalPhoto);
