import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  collection,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db } from "./config.js";

// Declares variables of HTML elements

let logoutBtn = document.querySelector("#logout-btn");
let Icon = document.querySelector("#usericon");
let ptitle = document.querySelector("#title");
let phone_number = document.querySelector("#number");
let userName = document.querySelector("#fname");
let pimage = document.querySelector("#image");
let pprice = document.querySelector("#price");
let pdescription = document.querySelector("#description");
let CartDiv = document.querySelector("#Card-Div");

let getdata = JSON.parse(localStorage.getItem("Product"));

console.log(getdata);

function render() {
  (pimage.src = getdata.pimage),
    (ptitle.innerHTML = getdata.Product_title),
    (pdescription.innerHTML = getdata.Product_Description),
    (pprice.innerHTML = getDocs.Price),
    (userName.innerHTML = getDocs.UserName),
    (phone_number.innerHTML = getDocs.phone_number);
  CartDiv.innerHTML += `  
        
        <figure class="px-10 pt-10">
        <img id="image" src="${pimage}" alt="XD Logo" class="w-full h-48 object-cover">
        </figure>
        <div class="card-body text-center">
            <h2 class="card-title text-blue-800">Title: ${ptitle}</h2>
            <h2 class="card-title text-blue-800">Description: ${pdescription}</h2>
            <h2 class="card-title text-blue-800">Price: ${pprice}</h2>
            <h3 class="card-title text-blue-800">Seller Name: ${userName}</h3>
            <h3 class="card-title text-blue-800">Seller Contact: ${phone_number}</h3>
            <div class="card-actions justify-center mt-4">
                <button class="btn btn-primary bg-blue-800 border-blue-800 text-white">Buy Product</button>
                <button class="btn btn-outline border-gray-700 text-gray-700 hover:bg-blue-800 hover:text-white">Exit</button>
            </div>
        </div>`;
}
render();

// check user login status
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      Icon.src = data.photoUrl;
    });
  } else {
    Swal.fire({
      title: "Setting!",
      text: "Please Login First",
      confirmButtonText: "Login",
      icon: "error",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location = "index.html";
      }
    });
  }
});

// check user status user login or not
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      Icon.src = data.photoUrl;
    });
  } else {
    Swal.fire({
      title: "!Setting!",
      text: "Please Login First",
      confirmButtonText: "Login",
      icon: "error",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location = "index.html";
      }
    });
  }
});

Icon.addEventListener("click", () => {
  Swal.fire({
    title: "!Setting!",
    text: "Do you want to Ad post",
    confirmButtonText: "Ad Post",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location = "./postad.html";
    }
  });
});

// logout function
logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      Swal.fire({
        title: "Success :)",
        text: "Log-out Successfully",
        icon: "success",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location = "./login.html";
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
