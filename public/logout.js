

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB3joK7piWfPY72fuahSjMaGBc93iVDj_U",
    authDomain: "homes-2a852.firebaseapp.com",
    projectId: "homes-2a852",
    storageBucket: "homes-2a852.appspot.com",
    databaseURL: "https://homes-2a852-default-rtdb.asia-southeast1.firebasedatabase.app",
    messagingSenderId: "955002264254",
    appId: "1:955002264254:web:affa022685ce5d39461cef"
  };
  // Initialize Firebase
  //firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  // Triggered when user logs out 
  function userLogout() {

    auth.signOut();
    alert("Signed out");  
    window.location.href = "http://localhost:5000/index.html";
  }
  