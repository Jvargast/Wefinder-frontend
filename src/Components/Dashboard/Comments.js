import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import db from "../../firebase";
import "firebase/firestore";
import firebase from "firebase/app";
import moment from "moment";

const Container = styled.div`
  padding: 1rem;
  padding-top: 2rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  button {
    margin-bottom: 0.25rem;
    color: #636363;
    cursor: pointer;
    font-size: 14px;
    border: none;
    background: transparent;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-right: 20px;
  input {
    width: 100%;
    margin-left: 10px;
    margin-right: -62px;
    border: none;
    border-radius: 9999px;
    padding: 5px;
  }
  button {
    margin-left: -50px;
    border: none;
    background-color: #038d84;
    color: white;
    font-size: 16px;
    padding: 10px 30px;
    border-radius: 9999px;
    cursor: pointer;

    &:hover {
      background-color: #ff900b;
    }
  }
`;

const ProfileLink = styled(Link)`
  text-decoration: none;
  color: black;
  span {
    margin-right: 5px;
    margin-left: 5px;
    font-weight: 900;
  }
`;

export function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => ({ user: state.userState.user }));

  const handleSubmitComment = (event) => {
    event.preventDefault();
    setComments([...comments, { photoURL: user.photoURL, displayName: user.displayName, comment, }]);
    setComment("");
    return db
      .collection("articles")
      .doc(docId)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
            photoURL:user.photoURL,
          displayName: user.displayName,
          comment,
          createAt: new Date().toString(),
        }),
      });
  };
  return (
    <div style={{ display: "flex", flexDirection: "row", width:"100%"}}>
      <div style={{ marginLeft: "10px" }}>
        <img
          src={user.photoURL}
          alt="user"
          style={{ width: "48px", height: "48px", borderRadius: "9999px" }}
        />
      </div>
      <Form
        method="POST"
        onSubmit={(event) => {
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault();
        }}
      >
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          name="add-comment"
          placeholder="Añadir un comentario"
          autoComplete="off"
          ref={commentInput}
          style={{ padding: "1.2rem 1rem" }}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && "opacity-25"
          }`}
          type="button"
          style={!comment ? { opacity: "25" } : { opacity: "100" }}
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Publicar
        </button>
      </Form>
    </div>
  );
}
export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
}) {
  const [comments, setComments] = useState(allComments);

  const [commentsSlice, setCommentsSlice] = useState(3);

  const showNextComments = () => {
    setCommentsSlice(commentsSlice + 3);
  };

  return (
    <>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
      <Container>
        {comments.length >= 3 && commentsSlice < comments.length && (
          <button
            type="button"
            onClick={showNextComments}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                showNextComments();
              }
            }}
          >
           Ver los {comments.length} comentarios
          </button>
        )}
        {comments.slice(0, commentsSlice).map((item) => (
          <div
            key={`${item.comment} - ${item.displayName}`}
            style={{ marginBottom: "0.25rem", backgroundColor:"#62A188", width:"100%",display:"flex", justifyContent:"flex-start", padding:"5px" }}
          >
            <div style={{ display: "flex", flexDirection: "row", textAlign:"center", justifyContent:"center",alignItems:"center",marginLeft:"20px" }}>
              <img
                src={item.photoURL}
                alt="current-user"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "9999px",
                }}
              />
              <ProfileLink to={`/p/${item.displayName} `}>
                <span style={{fontSize:"14px"}}>{item.displayName}</span>
              </ProfileLink>
              <div style={{display:"flex", textAlign:"center", wordBreak: "break-all", width:"350px", marginLeft:"20px"}}>
                <p >{item.comment}</p>
              </div>
              
              
            </div>
            <small style={{right:"40px", position: "absolute"}}>{moment(item.createAt).fromNow()}</small>
          </div>
        ))}

      </Container>
    </>
  );
}
