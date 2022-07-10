import styled from "styled-components";
import userIcon from "../../assets/images/user.svg";
import pIcon from "../../assets/images/photo-icon.svg";
import eIcon from "../../assets/images/event-icon.svg";
import vIcon from "../../assets/images/video-icon.svg";
import aIcon from "../../assets/images/article-icon.svg";
import elipsis from "../../assets/images/elipsis-icon.svg";
import sharedIcon from "../../assets/images/shared-icon.svg";
import sendIcon from "../../assets/images/send-icon.svg";
import spiner from "../../assets/images/spin-loader-icon.svg";
import closeIcon from "../../assets/images/close-icon.svg";
import PostModal from "./PostModal";
import { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getArticlesAPI } from "../../actions";
import ReactPlayer from "react-player";
import moment from "moment";
/* import CommentPost from "./CommentPost"; */
import PostModalPhoto from "./PostModalPhoto";
import db from "../../firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import { useRef } from "react";
import Comments from "./Comments";
import { Link } from "react-router-dom";

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #e0dbdb;
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
  background: #e0dbdb;
  padding-top: 10px;

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
      transition: ease-out;
      cursor: pointer;

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
        height: 48px;
      }
      button {
        margin: 4px 0;
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

          &:hover {
            color: #ffb900;
          }
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;

  li {
    margin-right: 5px;
    font-size: 12px;
    background-color: #e0dbdb;

    button {
      display: flex;
      border: none;
      background-color: #e0dbdb;
    }

    a {
      border: none;
      text-decoration: none;
      color: rgba(0, 0, 0, 0.9);
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;

  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #038d84;
    border: none;
    background-color: #e0dbdb;
    border-radius: 5px;
    cursor: pointer;
    svg,
    img {
      width: 14px;
      height: 14px;
    }
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

export function Actions({
  docId,
  totalLikes,
  likedPhoto,
  handleFocus,
}) {
  const { user } = useSelector((state) => ({ user: state.userState.user }));
  const [toggleLiked, setToggleLikes] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);

  const handleToggleLiked = async () => {
    setToggleLikes((toggleLiked) => !toggleLiked);

    await db
      .collection("articles")
      .doc(docId)
      .update({
        likes: toggleLiked
          ? firebase.firestore.FieldValue.arrayRemove(user.uid)
          : firebase.firestore.FieldValue.arrayUnion(user.uid),
      });
    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };

  return (
    <>
      <SocialCounts>
        <li>
          <button>
            <img
              src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
              alt="like"
            />
            <span>{likes === 1 ? `${likes} like` : `${likes} likes`}</span>
          </button>
        </li>
      </SocialCounts>
      <SocialActions>
        <button
          onClick={handleToggleLiked}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleToggleLiked();
            }
          }}
          style={
            toggleLiked ? { backgroundColor: "#038d84" } : { fill: "black" }
          }
        >
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 306.033 306.033"
            style={toggleLiked ? { fill: "#ffb900" } : { fill: "black" }}
          >
            <path
              d="M302.997,205.216l0.02-24.171c0-0.245-0.024-0.484-0.036-0.727l-0.013-19.285c0-35.841-29.158-65-65-65
	c-0.014,0-0.025,0.002-0.039,0.002h-44.328l15.549-30.896c3.109-6.203,4.752-13.167,4.752-20.14c0-24.813-20.188-45-45-45
	c-17.156,0-32.584,9.535-40.264,24.887L92.222,97.713c-2.061-1.065-4.395-1.678-6.875-1.678h-67.33c-8.284,0-15,6.716-15,15v179.998
	c0,8.284,6.716,15,15,15h67.33c8.284,0,15-6.716,15-15v-2.122c16.84,11.09,36.693,17.122,57.621,17.122h80
	c35.842,0,65-29.159,65-64.988l0.004-5.126c0.018-0.298,0.045-0.594,0.045-0.895L302.997,205.216z M70.347,276.033h-37.33V126.035
	h37.33V276.033z M237.968,276.033h-80c-22.529,0-43.313-9.791-57.621-26.989V148.541l55.121-110.234
	c2.564-5.123,7.711-8.307,13.434-8.307c8.271,0,15,6.729,15,15c0,2.362-0.529,4.615-1.561,6.675l-26.48,52.617
	c-2.34,4.65-2.103,10.181,0.629,14.612c2.73,4.432,7.564,7.131,12.77,7.131h68.709c0.009,0,0.018-0.001,0.025-0.001
	c19.287,0.014,34.975,15.709,34.975,35.009l0.029,44.17l-0.029,35.82C272.968,260.332,257.267,276.033,237.968,276.033z"
            />
          </svg>
          <span style={toggleLiked ? { color: "#ffb900" } : { fill: "black" }}>
            Me gusta
          </span>
        </button>
        <button
          onClick={handleFocus}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleFocus();
            }
          }}
        >
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Z" />
          </svg>
          <span>Comentario</span>
        </button>

        <button>
          <img src={sharedIcon} alt="shared" />
          <span>Compartir</span>
        </button>
        <button>
          <img src={sendIcon} alt="send" />
          <span>Enviar</span>
        </button>
      </SocialActions>
    </>
  );
}
const Main = (props) => {
  const [showModal, setShowModal] = useState("close");
  const [showComment, setShowComment] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModalPhoto, setModalPhoto] = useState("close");

  //Likes function
  const commmentInput = useRef(null);
  const handleFocus = () => commmentInput.current.focus();
  //prueba
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("articles")
      .orderBy("actor.date", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);
  //
  const handleShowComment = (e) => {
    e.preventDefault();
    setShowComment(!showComment);
  };

  const handlerClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };

  const handlerPost = (e) => {
    e.preventDefault();

    switch (showModalPhoto) {
      case "open":
        setModalPhoto("close");
        break;
      case "close":
        setModalPhoto("open");
        break;
      default:
        setModalPhoto("close");
        break;
    }
  };

  return (
    <>
      {posts.length === 0 ? (
        <p>No hay publicaciones</p>
      ) : (
        <Container>
          <SharedBox>
            <div>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} alt="main-user" />
              ) : (
                <img src={userIcon} alt="user-icon" />
              )}
              <button
                onClick={handlerClick}
                disabled={props.loading ? true : false}
              >
                Crear publicación
              </button>
              <div></div>
            </div>

            <div>
              {selectedFile && (
                <div>
                  <div onClick={() => setSelectedFile(null)}>
                    <img src={closeIcon} alt="closed" />
                  </div>
                  <img src={selectedFile} alt="" />
                </div>
              )}
              <button onClick={handlerPost}>
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
          <Content>
            {props.loading && <img src={spiner} alt="spin" />}
            {posts.length > 0 &&
              posts.map(({ id, post }) => (
                <Article key={id}>
                  <SharedActor>
                    <Link to={`/p/${post.actor.title}`}>
                      <img src={post.actor.image} alt="user" />
                      <div>
                        <span>{post.actor.title}</span>
                        <span>{post.actor.description}</span>
                        <span>
                          {post.actor.date.toDate().toLocaleDateString()}
                        </span>
                        <span>{moment(post.createdAt).fromNow()}</span>
                      </div>
                    </Link>
                    <button>
                      <img src={elipsis} alt="elipsis" />
                    </button>
                  </SharedActor>
                  <Description>{post.description}</Description>
                  <SharedImg>
                    <a href="/">
                      {!post.sharedImg && post.video ? (
                        <ReactPlayer width={"100%"} url={post.video} />
                      ) : (
                        post.sharedImg && (
                          <img src={post.sharedImg} alt="shared" />
                        )
                      )}
                    </a>
                  </SharedImg>
                  <Actions
                    docId={id}
                    totalLikes={post.likes.length}
                    likedPhoto={post.actor.userLikedPhoto}
                    handleFocus={handleFocus}
                    commentAction={handleShowComment}
                  />
                  <Comments
                    docId={id}
                    comments={post.comments}
                    posted={props.user}
                    commentInput={commmentInput}
                  />

                  {/* {showComment ? (
                    <CommentPost
                      key={id}
                      data={props.user}
                      post={post}
                      postId={id}
                    />
                  ) : (
                    <div></div>
                  )} */}
                </Article>
              ))}
          </Content>

          <PostModal showModal={showModal} handlerClick={handlerClick} />
          <PostModalPhoto
            showModalPhoto={showModalPhoto}
            handlerPost={handlerPost}
          />
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
    isLoading: state.articleState.loading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
