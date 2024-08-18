import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import { auth } from "./config.js";

const form = document.querySelector("#form");

const fname = document.querySelector("#fname");

const lname = document.querySelector("#lname");

const email = document.querySelector("#email");

const password = document.querySelector("#password");

const file = document.querySelector("#file");

const display = document.querySelector("#para");



form.addEventListener("submit", (event) => {
  event.preventDefault();
  const auth = getAuth();
  createUserWithEmailAndPassword(
    auth,
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
      window.location = "login.html"
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);

      display.innerHTML = `${errorMessage}`;
    });
});

