import { auth, provider, storage } from "../firebase";
import {
  SET_USER,
  SET_LOADING_STATUS,
  GET_ARTICLES,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_USERS,

} from "./actionType";
import db from "../firebase";
/* import moment from "moment"; */


export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});

export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  payload: payload,
});

//REGISTER ACTIONS TYPES
export const registerStart = () => ({
  type: REGISTER_START,
});

export const registerSuccess = (payload) => ({
  type: REGISTER_SUCCESS,
  user: payload,
});

export const registerFail = (error) => ({
  type: REGISTER_FAIL,
  payload: error,
});

//Login mail and password
export const loginStart = () => ({
  type: LOGIN_START,
});

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload: payload,
});

export const loginFail = (error) => ({
  type: LOGIN_FAIL,
  payload: error,
});





//GET USERS
export const getUsers = (payload) => ({
  type: GET_USERS,
  payload: payload,
});


//Register user normal
export const registerInitiate = (email, password, displayName, profilePic) => {
  return function (dispatch) {
    dispatch(registerStart());
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async(payload) => {
        payload.user
          .updateProfile({
            displayName: displayName,
            photoURL: profilePic,
          })
          .then(async() => {
            dispatch(registerSuccess(payload.user));
            //dispatch(setUser(payload.user))
            await db.collection("users").add({
                userId: payload.user.uid,
                name: displayName,
                email: email.toLowerCase(),
                photoURL:profilePic
              });
          });
      })
      .catch((error) => dispatch(registerFail(error.message)));
  };
};
//Login user normal
export const loginInitiate = (email, password) => {
  return function (dispatch) {
    dispatch(loginStart());
    auth
      .signInWithEmailAndPassword(email, password)
      .then((payload) => {
        dispatch(loginSuccess(payload.user));
      })
      .catch((error) => dispatch(loginFail(error.message)));
  };
};

//Login with credentials
export function signInApi() {
  return function (dispatch) {
    auth
      .signInWithPopup(provider)
      .then(async(payload) => {
        dispatch(setUser(payload.user));
        await db.collection("users").add({
            userId: payload.user.uid,
            name: payload.user.displayName,
            email: payload.user.email.toLowerCase(),
            dateCreated: new Date.toString(),
            photoURL:payload.user.photoURL
          });
        console.log(payload.user);
      })
      .catch((error) => alert(error.message));
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}
//Logout user
export function signOutApi() {
  return function (dispatch) {
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}
//Post article
export function postArticleAPI(payload) {
  return function (dispatch) {
    dispatch(setLoading(true));

    if (payload.image !== "") {
      const upload = storage
        .ref(`images/${payload.image.name}`)
        .put(payload.image);
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progress ${progress}%`);

          if (snapshot.state === "RUNNING") {
            console.log(`Progress ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await upload.snapshot.ref.getDownloadURL();
          db.collection("articles").add({
            actor: {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            sharedImg: downloadURL,
            comments: 0,
            description: payload.description,
            createdAt: new Date().toString()
          });
          dispatch(setLoading(false));
        }
      );
    } else if (payload.video) {
      db.collection("articles").add({
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImg: "",
        comments: 0,
        description: payload.description,
        createdAt: new Date().toString()
      });
    } else if (payload.image === "") {
      db.collection("articles").add({
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: "",
        sharedImg: "",
        comments: 0,
        description: payload.description,
        createdAt: new Date().toString()
      });
    }
  };
}
//fetch articles
export function getArticlesAPI() {
  return function (dispatch) {
    let payload;

    db.collection("articles")
      .orderBy("actor.date", "desc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());
        dispatch(getArticles(payload));
      });
  };
}

//GET SINGLE ARTICLE
/* export const fetchSingleFeed = feedId =>{
    return dispatch =>{
        dispatch({type:"LOADING"});
        let feedData = {};
        let result = [];
        let comments = []; 

        const response = db.doc(`/articles/${feedId}`).get()
        response.then((doc)=> {
            feedData.feedId = doc.id;
            feedData.photoURL = doc.data().photo;
            feedData.description = doc.data().description;
            feedData.displayName = doc.data().displayName;
            feedData.comments = doc.data().comments;
            feedData.createdAt = moment(doc.data().createdAt).fromNow();
            return result.push(feedData);
        }).then(()=>{
            dispatch({type:"FETCH_ONE_SUCCESS",payload:result})
        }).then(()=> {
            return db.collection("comments").where("feedId","==",feedId).get();
        }).then((data)=> {
            data.forEach(doc => {
                return comments.push(doc.data());
            })
        }).then(()=> {
            dispatch({type:"FETCH_COMMENTS_SUCCES", payload:comments})
        }).then(()=>{
            dispatch({type:"STOP_LOADING"})
        }).catch(err => {
            console.log(err);
        })
    }
} */



//display profiles on network
export function getUsersAPI() {
  return function (dispatch) {
    let payload;
    db.collection("users")
      .orderBy("name", "desc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());
        dispatch(getUsers(payload));
      });
  };
}
