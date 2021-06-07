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
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  let db = firebase.firestore();

// auth state listener
  auth.onAuthStateChanged(function(user) {
  // Check for user auth state and redirect accordingly
  console.log(user);
  if(user) {
    window.location.href = "http://localhost:5000/catalog.html";
  }
  // else {
  //   console.log(user);
  //   window.location.href = "http://localhost:5000/signup.html"
  // }
})

// User sign up
function userSignUp() {  
    
    console.log("Entered signup function");
    var email = document.getElementById("emailSignUp");
    var password = document.getElementById("passwordSignUp");
    var name = document.getElementById("nameSignUp");
    var contact = document.getElementById("userContact");
  
    // Creating user
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    // Adding user details to firestore database
    db.collection("Users").add({
      Name : name.value,
      Contact : contact.value
    }).then(function(){
        alert("Signed up");
        window.location.href = "http://localhost:5000/catalog.html"
    })

  }


// User login  
function userLogin() {

    var email = document.getElementById("loginEmail");
    var password = document.getElementById("loginPassword");
    
    // Signing in with given credentials

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message)).then(function(){
      alert("Signed in as " + email.value);
    })

}

// Signing in with Google
function googleSignIn() {

  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then((result) => {
    console.log("Success!");
    alert("Signed in with Google");
    console.log()
  }).catch((error) => {
    var errCode = error.code;
    var errMessage = error.message;
    console.log(errCode);
    console.log(errMessage);
  })

}


