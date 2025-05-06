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

const logoutBtn = document.querySelector("#logout-btn");
const userIcon = document.querySelector("#usericon");
const productTitle = document.querySelector("#title");
const phoneNumber = document.querySelector("#number");
const sellerName = document.querySelector("#fname");
const productImage = document.querySelector("#image");
const productPrice = document.querySelector("#price");
const productDesc = document.querySelector("#description");
const CartDiv = document.querySelector("#Card-Div");
const buyBtn = document.querySelector("#buy-btn");
const exitBtn = document.querySelector("#exit-btn");



// check user status user login or not
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    Swal.fire({
      title: "Login Required",
      text: "Please login to view product details",
      icon: "warning",
      confirmButtonText: "Login"
    }).then(() => {
      window.location.href = "login.html";
    });
    return;
    }

    //load user data:
    const q  = query(collection(db, "users"), where("uid", "==", user.uid));
    getDocs(q).then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const userData = doc.data();
        userIcon.src = userData.photoUrl || "./Assets/default-user.png";
      });
    }).catch(error => {
      console.error("Error loading user data: ", error)
    });
  });


function renderProductDetails() {
  
const product = JSON.parse(localStorage.getItem("selectedProduct"));
console.log(product);
if (!product) {
  Swal.fire({
    title: "Error",
    text: "Product not found",
    icon: "error"
  }).then(() => {
    window.location.href = "index.html";
  });
  return;
}
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
