
import { getAuth, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {auth} from "./config.js"



// declares variables HTML elements
const  form = document.querySelector("#form");

const email = document.querySelector("#email");

const  password = document.querySelector("#password");

const loginbtn = document.querySelector("#login-btn");


// Event Listener for login form 
form.addEventListener("submit" , (event)=>{
    event.preventDefault();

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email.value , password.value)
      .then((userCredential) => {
        loginbtn.innerHTML = `<img class="loading" src="./Assets/loading-645268_1280.webp" alt="">`
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("Error====>",errorMessage);
  
      Swal.fire({
        title: 'Success!',
        text: 'Your are Login Successfully',
        icon: 'success',
        confirmButtonText: 'Login'
    })
        .then((result) => {
            if (result.isConfirmed) {
                window.location = 'index.html'
            }
        });
    });
});



