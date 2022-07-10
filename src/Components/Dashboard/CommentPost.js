import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import styled from "styled-components";
import { commentPost } from "../../actions";
import db from "../../firebase";

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
  flex-direction: column;
  border-radius: 5px;
`;

const CommentItems = styled.div`
  flex: 1;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;

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
    display: flex;
    justify-content: flex-start;

  }
  width: 500px;
  padding: 2px 4px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: rgba(0,0,0,0.1);
`;

const CommentInfo = styled.div`
  display: flex;
  justify-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  h2 {
    margin-top: 1rem;
    font-size: 14px;

  }
  small {
    line-height: 1.5;
    font-size: 12px;
    
  }
`;

const CommentPost = (props) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = useSelector((state) => ({ user: state.userState.user }));
  let initState = {
    
  }
  const [count, setCount] = useState(initState);

  useEffect(() => {
    let payload;
    if (props.postId) {
      payload = db
        .collection("articles")
        .doc(props.postId)
        .collection("comments").orderBy("createdAt", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      payload();
    };
  }, [props.postId]);

  const postComment = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const data = {
      comment,
      displayName: props.data.displayName,
      userId: user.uid,
      photoURL: props.data.photoURL,
      createdAt: new Date().toString(),
    };
    setCount(count+1);

    db.collection("articles").doc(props.postId).collection("comments").add({
      comment: data.comment,
      displayName: data.displayName,
      userId: data.userId,
      photoURL: data.photoURL,
      createdAt: data.createdAt,
    }) 
    db.collection("articles").doc(props.postId).update({
      comments: count + 1
    })

    reset(e);
  };
  const reset = () => {
    setComment("");
  };

  return (
    <div>
      <Comment>
        <div>
          <img
            src={props.data.photoURL}
            alt="user"
            style={{ width: "48px", height: "48px" }}
          />
        </div>
        <input
          value={comment}
          type="text"
          placeholder="Añadir un comentario"
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={(e) => postComment(e)} disabled={comment ? false:true}>Publicar</button>
      </Comment>
      <CommentSection>
        {comments.length > 0 && comments.map((c,index) =>(
          <CommentItems key={index}>

                <img
                  src={c.photoURL ? c.photoURL:"empy"}
                  alt="avatar"
                />
                <CommentContent>
                  <CommentInfo>
                    <h2>{c.displayName}</h2>
                    <small>{moment(c.createdAt).fromNow()}</small>
                  </CommentInfo>
                  <p>
                    {c.comment}
                  </p>
                </CommentContent>
          </CommentItems>
        ))}
      </CommentSection>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postComment: (data) => dispatch(commentPost(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentPost);
