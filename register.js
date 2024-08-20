import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import { getStorage , ref , uploadBytes , getDownloadURL  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";


import { auth , db } from "./config.js";

const storage = getStorage();



// Decleares variables for all html elements:
const form = document.querySelector("#form");

const fname = document.querySelector("#fname");

const lname = document.querySelector("#lname");

const email = document.querySelector("#email");

const password = document.querySelector("#password");

const Pic = document.querySelector("#file");

const display = document.querySelector("#para");



// Event listener for registration form:
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const auth = getAuth();
  createUserWithEmailAndPassword(
    auth,
    email.value,
    password.value
  )
    .then(async(userCredential) => {
      const user = userCredential.user;
      console.log(user);
      display.innerHTML = " Registration Done successfully ";
      fname.value = "";
      lname.value = "";
      email.value = "";
      password.value = "";


     let file = Pic.file[0];
     let Url = null
    if(file){
     Url = await uploadFile(file, email.value);
      console.log(Url);
     }
     
     Swal.fire({
      title: 'Success!',
      text: 'Your account registered successfully!',
      icon: 'success',
      confirmButtonText: 'Login'
  })
      .then((result) => {
          if (result.isConfirmed) {
              window.location = "./login.html";
          }
      });
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);

      display.innerHTML = `${errorMessage}`;
    });
  });


try {
  const docRef = await addDoc(collection(db, "users"), {
    first_name: fname.value,
    last_name: lname.value,
    Email: email.value,
    uid: user.id,
    PicUrl: Url, 
  })

  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}


// Async function to  convert image into  url:
async function uploadFile(file, userEmail) {
  const storageRef = ref(storage, userEmail);
  try {
      const uploadImg = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(uploadImg.ref);
      return url;
  } catch (error) {
      console.error(error);
      throw error;
  }
}