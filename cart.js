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
      confirmButtonText: "Login",
    }).then(() => {
      window.location.href = "login.html";
    });
    return;
  }

  //load user data:
  const q = query(collection(db, "users"), where("uid", "==", user.uid));
  getDocs(q)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        userIcon.src = userData.photoUrl || "./Assets/default-user.png";
      });
    })
    .catch((error) => {
      console.error("Error loading user data: ", error);
    });
});

function renderProductDetails() {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  console.log(product);
  if (!product) {
    Swal.fire({
      title: "Error",
      text: "Product not found",
      icon: "error",
    }).then(() => {
      window.location.href = "index.html";
    });
    return;
  }
  productImage.src = product.productImage;
  productTitle.textContent = product.Product_title;
  productDesc.textContent = product.Product_Description;
  productPrice.textContent = `${product.Price}Rs.`;
  sellerName.textContent = product.UserName;
  phoneNumber.textContent = product.phone_number;

  CartDiv.innerHTML += `        
        <figure class="px-10 pt-10">
        <img id="image" src="${product.productImage}" alt="${product.Product_title}" class="rounded-xl w-full h-64 object-cover">
        </figure>
        <div class="card-body items-center text-center">
        <h2 class="card-title text-2xl">Title: ${product.Product_title}</h2>
        <p class="text-lg">Description: ${product.Product_Description}</p>
        <p class="text-xl font-bold">Price: ${product.Price}Rs.</p>
        
        <div class="divider"></div>
          <h3 class="text-lg">Seller: ${product.UserName}</h3>
          <h3 class="text-lg">Contact: ${product.phone_number}</h3>
        <div class="card-actions justify-center mt-6">
          <button id="buy-btn" class="btn btn-primary">Contact Seller</button>
          <button id="exit-btn" class="btn btn-ghost">Back to Products</button>
        </div>
        </div>
    `;

  // For buttons:
  // Add event listeners:
  buyBtn.addEventListener("click", () => {
    Swal.fire({
      title: "Contact Seller",
      html: `Call or message the seller at: <b>${product.phone_number}</b>`,
      icon: "info",
    });
  });

  exitBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

userIcon.addEventListener("click", () => {
  const user = auth.currentUser;

  if (user) {
    Swal.fire({
      title: "!Setting!",
      text: "Do you want to Ad post",
      confirmButtonText: "Ad Post",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "post.html";
      }
    });
  }
});

// logout function
logoutBtn.addEventListener("click", async () => {
  try {
    signOut(auth);
    Swal.fire({
      title: "Logged Out",
      text: "You have been logged out successfully",
      icon: "success",
    });
    window.location.href = "login.html";
  } catch (error) {
    console.error("Logout error:", error);
    await Swal.fire({
      title: "Error",
      text: "Failed to logout",
      icon: "error",
    });
  }
});

// function Initialize:
renderProductDetails();
