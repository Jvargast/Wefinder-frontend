import styled from "styled-components";
import closeIcon from "../../assets/images/close-icon.svg";
import userIcon from "../../assets/images/user.svg";
import sharedImageIcon from "../../assets/images/shared-image-icon.svg";
import sharedVideoIcon from "../../assets/images/shared-video-icon.svg";
import sharedCommentIcon from "../../assets/images/comment-icon.svg";
import { useState } from "react";
import ReactPlayer from "react-player";
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
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
  align-items: center;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);

  img {
    width: 18px;
    height: 18px;
  }
`;

const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;

  ${AssetButton} {
    width: 40px;
  }
`;

const SharedComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);

  ${AssetButton} {
    svg {
      margin-right: 5px;
    }
  }
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

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [sharedImage, setSharedImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");
  const {user} = useSelector((state)=>({user:state.userState.user}));
  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`Not an image, the image file is a ${typeof image}`);
      return;
    }

    setSharedImage(image);
  };

  const switchAssetArea = (area) => {
    setSharedImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const postArticle = (e) => {
    e.preventDefault();
    if(e.target !== e.currentTarget) {
        return;
    }

    const payload = {
        image: sharedImage,
        video: videoLink,
        user: props.user,
        description: editorText,
        timestamp: firebase.firestore.Timestamp.now(),
        userId: user.uid,
      };

    props.postArticle(payload);
    reset(e);
  }
  const reset = (e) => {
    setEditorText("");
    setSharedImage("");
    setVideoLink("");
    setAssetArea("");
    props.handlerClick(e);
  };
  return (
    <>
      {props.showModal === "open" && (
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
                {props.user.photoURL ? <img src={props.user.photoURL} alt="usr" /> 
                :
                (<img src={userIcon} alt="usr" />)
                }
                <span>{props.user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="¿De qué quieres hablar?"
                  autoFocus={true}
                />
                {assetArea === "image" ? (
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
                      <img
                        src={URL.createObjectURL(sharedImage)}
                        alt="display"
                      />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="Enlace de video"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <SharedCreation>
              <AttachAssets>
                <AssetButton onClick={()=> switchAssetArea("image")}>
                  <img src={sharedImageIcon} alt="shared-img" />
                </AssetButton>
                <AssetButton onClick={()=>switchAssetArea("media")}>
                  <img src={sharedVideoIcon} alt="shared-vd" />
                </AssetButton>
              </AttachAssets>
              <SharedComment>
                <AssetButton>
                  <img src={sharedCommentIcon} alt="shared-comt" />
                  Cualquiera
                </AssetButton>
              </SharedComment>
              <PostButton disabled={!editorText ? true : false} onClick={(event)=>postArticle(event)}>
                Publicar
              </PostButton>
            </SharedCreation>
          </Content>
        </Container>
      )}
    </>
  );
};
const mapStateToProps = (state) =>{
    return {
        user: state.userState.user,
    }
}

const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload)=> dispatch(postArticleAPI(payload)),
})




export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
