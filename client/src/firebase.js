import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyB3nysnA2RyQgbeslcQXgnqonP1GBvVEvI",
    authDomain: "jubairfirst-dad5a.firebaseapp.com",
    databaseURL: "https://jubairfirst-dad5a.firebaseio.com",
    projectId: "jubairfirst-dad5a",
    storageBucket: "jubairfirst-dad5a.appspot.com",
    messagingSenderId: "977021718803",
    appId: "1:977021718803:web:191efe0458aaee483b4ae6",
    measurementId: "G-G1K0ZTL0LR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
  //export 
  export const auth = firebase.auth()

  export const googleauthprovider = new firebase.auth.GoogleAuthProvider()