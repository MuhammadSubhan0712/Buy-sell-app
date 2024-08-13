import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import { auth } from "./config.js";

const form = document.querySelector("#form");

const fname = document.querySelector("#fname");

const lname = document.querySelector("#lname");

const email = document.querySelector("#email");

const password = document.querySelector("#password");

const display = document.querySelector("#para");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const auth = getAuth();
  createUserWithEmailAndPassword(
    auth,
    fname.value,
    lname.value,
    email.value,
    password.value
  )
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      display.innerHTML = " Registration Done successfully ";
      fname.value = "";
      lname.value = "";
      email.value = "";
      password.value = "";
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);

      display.innerHTML = `${errorMessage}`;
    });
});

// Goggle button :

const gogglebtn = document.querySelector("#goggle-btn");

gogglebtn.addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      window.location("./login.html");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error Occured", errorMessage);
      display.innerHTML = `${errorMessage}`;
      // ...
    });
});
