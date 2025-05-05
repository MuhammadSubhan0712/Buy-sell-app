import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  uploadBytes,
  getDownloadURL,
  ref,
  getStorage,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

import { auth, db } from "./config.js";

const storage = getStorage();

let currentUserUid = null;

// Declares variables of HTML elements
const userIcon = document.querySelector("#usericon");
const loginDiv = document.querySelector("#login-Div");
const logoutBtn = document.querySelector("#logout-btn");
const form = document.querySelector("#form");
const productImage = document.querySelector("#image");
const productTitle = document.querySelector("#title");
const productDesc = document.querySelector("#description");
const productPrice = document.querySelector("#price");
const sellerName = document.querySelector("#fname");
const contactNumber = document.querySelector("#number");
const postBtn = document.querySelector("#Post-Now");

// check user status user login or not
onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUserUid = user.uid;
    try {
      const q = query(
        collection(db, "users"),
        where("uid", "==", currentUserUid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.photoUrl) {
          userIcon.src = userData.photoUrl || "./Assets/default-user-icon.png";
        } else {
          userIcon.src = "./Assets/default-user-icon.png"; // Fallback image
        }
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    console.log("User not authenticated");
    loginDiv.innerHTML = `<a href="./login.html"><button class="btn btn-primary">login</button></a>`;
    window.location.href = "login.html";
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validateForm()) return;

  postBtn.innerHTML = `<img class="loading" src="./Assets/loading-645268_1280.webp" alt="">`;
  postBtn.disabled = true;

  try {
    const file = productImage.files[0];
    if (!file) {
      throw new Error("Please select an image file");
    }

    const filePath = `products/${currentUserUid}_${Date.now()}`;

    let imageUrl = await uploadFile(file, filePath);

    const docRef = await addDoc(collection(db, "product_details"), {
      productImage: imageUrl,
      Product_title: productTitle.value,
      Product_Description: productDesc.value,
      Price: Number(productPrice.value), //convert to number;
      UserName: sellerName.value.trim(),
      phone_number: contactNumber.value,
      createdAt: serverTimestamp(),
      uid: currentUserUid,
    });

    await Swal.fire({
      title: "Success!",
      text: "Ad successfully publish :)",
      icon: "success",
      confirmButtonText: "View ads",
    });

    window.location.href = "index.html";
    // console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document:", error);
    await Swal.fire({
      title: "Error!",
      text: error.message || "Failed to publish ad. Please try again.",
      icon: "error",
      confirmButtonText: "OK",
    });
  } finally {
    postBtn.innerHTML = `Post Now`;
    postBtn.disabled = false;
  }
});

async function uploadFile(file, filePath) {
  if (!file) {
    throw new Error("Please select an image file");
  }
  const storageRef = ref(storage, filePath);
  const uploadResult = await uploadBytes(storageRef, file);
  return await getDownloadURL(uploadResult.ref);
  // console.error("Upload error: ",error);
  // throw new Error("Failed to upload image. Please try again.");
}
// For Form validation:
function validateForm() {
  if (!productImage.files[0]) {
    Swal.fire("Error", "Please select a product image", "error");
    return false;
  }
  if (!productTitle.value.trim()) {
    Swal.fire("Error", "Please enter a product title", "error");
    return false;
  }
  if (!productPrice.value || isNan(productPrice.value)) {
    Swal.fire("Error", "Please enter a valid price", "error");
    return false;
  }
  if (!contactNumber.value.trim() || !/^\d+$/.test(contactNumber.value)) {
    Swal.fire("Error", "Please enter a valid phone number", "error");
    return false;
  }
  return true;
}

// logout function
logoutBtn.addEventListener("click", async () => {
  try {
    signOut(auth);
    const result = await Swal.fire({
      title: "Logged Out :)",
      text: "You have been logged out successfully",
      icon: "success",
      confirmButtonText: "Login",
    });

    if (result.isConfirmed) {
      window.location.href = "login.html";
    }
  } catch (error) {
    console.error("Logout error:", error);
    await Swal.fire({
      title: "Error!",
      text: "Failed to logout. Please try again.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
});
