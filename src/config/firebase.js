import firebase from 'firebase/app'
import "firebase/auth";


var firebaseConfig = {
    apiKey: "AIzaSyCq-FZFb-DfPC_3FBvCSl-YSid-mVBUMZc",
    authDomain: "stream-auth-67b40.firebaseapp.com",
    projectId: "stream-auth-67b40",
    storageBucket: "stream-auth-67b40.appspot.com",
    messagingSenderId: "669461177413",
    appId: "1:669461177413:web:68ebc0afcd15d379ba6f2c"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export default fb;