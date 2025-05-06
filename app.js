import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  collection,
  orderBy,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db } from "./config.js";

// let products = [
//       {
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAJZfuMV284pegBzgftQTbNwojzYziV3Y4Og&s",
//         title: "Laptop",
//         Description: "Dell XPS 13",
//         price: 999
//       },
//       {
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwYHlneKwMmk92NLHShscxO-zC_jbd8P-7tQ&s",
//         title: "Smartphone",
//         Description: "Samsung Galaxy S21",
//         price: 799
//       },
//       {
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1xCZymA8YBV0fHdlsghozXB72eWCQh4oPTQ&s",
//         title: "Smartwatch",
//         Description: "Apple Watch Series 6",
//         price: 399
//       },

//       {
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYCMvbV1T20imUBz9BUTXy7GnHv8w1-AY6OlLd-9rhOYq7UjGXjFed6-rmIZv5Z8AAn9o&usqp=CAU",
//         title: "Refrigerator",
//         Description: "LG Smart Inverter",
//         price: 1200
//       },
//       {
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq8wGz5EgjX3A7oHmDpZKlCQ9g5KB2V3dN3Q&s",
//         title: "Microwave Oven",
//         Description: "Samsung Convection",
//         price: 250
//       },
//       {
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC4LZMzN0tp_rhGc3qiMKL7mebPxKNBH5D_A&s",
//         title: "Washing Machine",
//         Description: "Bosch Front Load",
//         price: 800
//       },

//       {
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQay9akkwJu6yRueKmlnT3GBRqBOSGuF8TaXw&s",
//         title: "Running Shoes",
//         Description: "Nike Air Zoom Pegasus",
//         price: 120
//       },
//       {
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKWY2QyLjd-ITa2c0c-mHtEmmD5GhvIWMK9w&s",
//         title: "Casual Sneakers",
//         Description: "Adidas Originals",
//         price: 85
//       },
//       {
//          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP8U1hF8BhsfzRRs5QfbEsHTSkC9LnF4cbCQ&s",
//         title: "Formal Shoes",
//         Description: "Clarks Oxford",
//         price: 150
//       },

//       {
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh_Qe0NSN8Wf_cJqPNmsgy8ZWcCbW98Iyv7Q&s",
//         title: "iPhone 13",
//         Description: "Apple",
//         price: 999
//       },
//       {
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6i9oc0w4tA_eUzU6TgdgtgLOv2UFg3PTKdQ&s",
//         title: "OnePlus 9",
//         Description: "OnePlus",
//         price: 729
//       },
//       {
//         image: "https://media.wired.com/photos/616e0b46436c4f5f5e47d166/191:100/w_1280,c_limit/Gear-Google-Pixel-6-top.jpg",
//         title: "Google Pixel 6",
//         Description: "Google",
//         price: 599
//       },

//       {
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg0lFi5r-UmHVrYzjROeu237pYepD7Kvqqg2ICLQVA28o3sdcTAmCUvnNnqd9bVt95EBM&usqp=CAU",
//         title: "MacBook Pro",
//         Description: "Apple",
//         price: 1299
//       },
//       {
//         image: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/laptop-family_Surface-Laptop-Go-3_sandstone:VP1-539x400?fmt=png-alpha",
//         title: "Surface Laptop",
//         Description: "Microsoft",
//         price: 999
//       },
//       {
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg6ZoH4yo0gcoqCCo4Ar_zhEnjBXG6dqO_tA&s",
//         title: "ThinkPad X1",
//         Description: "Lenovo",
//         price: 1100
//       }
//     ];

// Declares variables of HTML elements
const display = document.querySelector("#div");
const userIcon = document.querySelector("#usericon");
const loginDiv = document.querySelector("#login-Div");
const logoutBtn = document.querySelector("#logout-btn");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        userIcon.src = userData.photoUrl || "./Assets/default-user.png";
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    console.log("User not loggedIn");
    loginDiv.innerHTML = `<a href="./login.html"><button class="btn btn-primary">Login</button></a>`;
  }
});

// Async Function to render the products:
async function renderProducts() {
  try {
    display.innerHTML =
      '<div class="text-center py-8"><span class="loading loading-spinner loading-lg"></span></div>';

    const productQuery = query(
      collection(db, "product_details"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(productQuery);
    display.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const productCard = document.createElement("div");
      productCard.className = "card w-96 bg-base-100 shadow-w-xl m-4";
      productCard.innerHTML = `<figure><img src="${product.productImage}" alt="${product.Product_title}" class="h-48 w-full object-cover"></figure>
      <div class="card-body"> 
      <h2 class="card-title"> ${product.Product_title} </h2>
      <p> ${product.Price}Rs. </p>
      <div class="card-actions justify-end">
      <button class="btn btn-primary view-details" data-id="${doc.id}">View Details</button>
      </div>
      </div>
      `;
      display.appendChild(productCard);
    });

    document.querySelectorAll(".view-detials").forEach((button) => {
      button.addEventListener("click", async (e) => {
        const productId = e.target.getAttribute("data-id");
        const user = auth.currentUser;
        if (!user) {
          const result = await Swal.fire({
            title: "Login Required",
            text: "You need to login to view product details",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Login",
            cancelButtonText: "Cancel",
          });

          if (result.isConfirmed) {
            window.location.href = "login.html";
          }
          return;
        }
        //For the full details:
        const product = querySnapshot.docs
          .find((doc) => doc.id === productId)
          ?.data();
        if (product) {
          localStorage.setItem("selectedProduct", JSON.stringify(product));
          window.location.href = "cart.html";
        }
      });
    });
  } catch (error) {
    console.error("Error loading products", error);
    display.innerHTML = `
      <div class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error loading products. Please try again later.</span>
      </div>
    `;
  }
}

//  User icon click handler:
userIcon.addEventListener("click", () => {
  const user = auth.currentUser;
  if (user) {
    Swal.fire({
      title: "Post an Ad",
      text: "Do you want to post a new ad?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Post Ad",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "post.html";
      }
    });
  } else {
    Swal.fire({
      title: "Login Required",
      text: "You need to login to post an ad",
      icon: "warning",
      confirmButtonText: "Login",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "login.html";
      }
    });
  }
});

logoutBtn.addEventListener("click", async () => {
  try {
    signOut(auth);
    await Swal.fire({
      title: "Logged Out",
      text: "You have been logged out successfully",
      icon: "success",
    });
    window.location.href = "login.html";
  } catch (error) {
    console.log("Logout error", error);
    Swal.fire({
      title: "Error",
      text: "Failed to logout. Please try again.",
      icon: "error",
    });
  }
});

// Function Initialize:
renderProducts();
