import styled from "styled-components";
import userIcon from "../../assets/images/user.svg";
import pIcon from "../../assets/images/photo-icon.svg";
import eIcon from "../../assets/images/event-icon.svg";
import vIcon from "../../assets/images/video-icon.svg";
import aIcon from "../../assets/images/article-icon.svg";
import elipsis from "../../assets/images/elipsis-icon.svg";
import coIcon from "../../assets/images/comment-icon.svg";
import likeIcon from "../../assets/images/like-icon.svg";
import sharedIcon from "../../assets/images/shared-icon.svg";
import sendIcon from "../../assets/images/send-icon.svg";
import spiner from "../../assets/images/spin-loader-icon.svg";
import PostModal from "./PostModal";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getArticlesAPI } from "../../actions";
import ReactPlayer from "react-player";
import moment from "moment";

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
    cursor: pointer;

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
const Comment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  div {
    padding: 10px;
    margin-left: 10px;

    img {
      border-radius: 50%;
    }
  }
  input {
    width: 100%;
    border-radius: 10px;
    border: none;
    padding: 5px;
    margin-right: 10px;
  }
  button {
    margin-right: 10px;
    border: none;
    border-radius: 15px;
    background-color: #038d84;
    color: white;
    font-size: 12px;
    padding: 8px;

    &:hover {
      background-color: #ff900b;
    }
  }
`;
const CommentSection = styled.div`
  display: flex;
  margin: auto;
  border-top: 1px solid gray;
`;

const CommentItems = styled.div`
  flex: 1;
  padding: 0.75rem 1.5rem;
  display: flex;

  img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    object-fit: cover;
    margin-right: 1rem;
    margin-left: 1rem;
  }
`;

const CommentContent = styled.div`
  
  p {
    font-weight: 700;
    margin-top: 0, 75rem;
  }
`;

const CommentInfo = styled.div`
  display: flex;
  justify-items: center;
  justify-content: space-between;

  h2 {
    font-weight: 900;
    margin-top: 1rem;
    font-size: 14px;
  }
  small {
    line-height: 1.5;
    font-size: 12px;
  }
`;

const Main = (props) => {
  const [showModal, setShowModal] = useState("close");
  const [showComment, setShowComment] = useState(false);

  const handleShowComment = (e) => {
    e.preventDefault();
    setShowComment(!showComment);
  };
  useEffect(() => {
    props.getArticles();
  }, [props]);

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

  return (
    <>
      {props.articles.length === 0 ? (
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
          <Content>
            {props.loading && <img src={spiner} alt="spin" />}
            {props.articles.length > 0 &&
              props.articles.map((articles, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a href="/profile">
                      <img src={articles.actor.image} alt="user" />
                      <div>
                        <span>{articles.actor.title}</span>
                        <span>{articles.actor.description}</span>
                        <span>
                          {articles.actor.date.toDate().toLocaleDateString()}
                        </span>
                        <span>{moment(articles.createdAt).fromNow()}</span>
                      </div>
                    </a>
                    <button>
                      <img src={elipsis} alt="elipsis" />
                    </button>
                  </SharedActor>
                  <Description>{articles.description}</Description>
                  <SharedImg>
                    <a href="/">
                      {!articles.sharedImg && articles.video ? (
                        <ReactPlayer width={"100%"} url={articles.video} />
                      ) : (
                        articles.sharedImg && (
                          <img src={articles.sharedImg} alt="shared" />
                        )
                      )}
                    </a>
                  </SharedImg>
                  <SocialCounts>
                    <li>
                      <button>
                        <img
                          src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                          alt="like"
                        />
                        <img
                          src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f"
                          alt="comments"
                        />
                        <span>75</span>
                      </button>
                    </li>
                    <li>
                      <a href="/">{articles.comments}</a>
                    </li>
                  </SocialCounts>
                  <SocialActions>
                    <button>
                      <img src={likeIcon} alt="like" />
                      <span>Me gusta</span>
                    </button>

                    <button onClick={handleShowComment}>
                      <img src={coIcon} alt="comment" />
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
                  {showComment ? (
                    <>
                      <Comment>
                        <div>
                          <img
                            src={props.user.photoURL}
                            alt="user"
                            style={{ width: "48px", height: "48px" }}
                          />
                        </div>
                        <input type="text" placeholder="Añadir un comentario" />
                        <button>Publicar</button>
                      </Comment>
                      <CommentSection>
                        <CommentItems>
                          <img
                            src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                            alt="avatar"
                          />
                          <CommentContent>
                            <CommentInfo>
                              <h2 class="text-lg font-semibold text-gray-900 -mt-1">
                                Brad Adams{" "}
                              </h2>
                              <small class="text-sm text-gray-700">
                                22h ago
                              </small>
                            </CommentInfo>
                            <p>
                              Lorem ipsum, dolor sit amet conse. Saepe optio
                              minus rem dolor sit amet!
                            </p>
                          </CommentContent>
                        </CommentItems>
                      </CommentSection>
                    </>
                  ) : (
                    <div></div>
                  )}
                </Article>
              ))}
          </Content>

          <PostModal showModal={showModal} handlerClick={handlerClick} />
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
