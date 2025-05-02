import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
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
const display = document.querySelector("#div");
const Icon = document.querySelector("#usericon");
const loginDiv = document.querySelector("#login-Div");
const logoutbtn = document.querySelector("#logout-btn");
const form = document.querySelector("#form");
const pimage = document.querySelector("#image");
const ptitle = document.querySelector("#title");
const pdesc = document.querySelector("#description");
const price = document.querySelector("#price");
const fname = document.querySelector("#fname");
const contact = document.querySelector("#number");
const postbtn = document.querySelector("#Post-Now");

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
          userIcon.src = userData.photoUrl;
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

  if (!validateForm()) {
    return;
  }

  postbtn.innerHTML = `<img class="loading" src="./Assets/loading-645268_1280.webp" alt="">`;
  postbtn.disabled = true;

  try {
    const file = pimage.files[0];
    if (!file) {
      throw new Error("Please select an image file");
    }
   

  const filePath = `products/${currentUserUid}_${Date.now()}`;

  let imageUrl = await uploadFile(file, filePath);

    const docRef = await addDoc(collection(db, "product_details"), {
      productImage: imageUrl,
      Product_title: ptitle.value,
      Product_Description: pdesc.value,
      Price: Number(price.value), //convert to number;
      UserName: fname.value,
      phone_number: contact.value,
      createdAt: new Date(),
      uid: currentUserUid,
    });

    await Swal.fire({
      title: "Ad successfully publish :)",
      text: "See Your Ad",
      icon: "success",
      confirmButtonText: "See ad",
    });
    
    window.location = "index.html";
    console.log("Document written with ID: ", docRef.id);

  } catch (error) {
    console.error("Error adding document:", error);
    await Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to publish ad. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
    });
}finally {
    postbtn.innerHTML = `Post Now`;
    postbtn.disabled = false;
}
});

async function uploadFile(file, filePath) {

    if (!file) {
        throw new Error ("No file selected");
    }
  const storageRef = ref(storage, filePath);
  try {
    const uploadResult = await uploadBytes(storageRef, file);
    return await getDownloadURL(uploadResult.ref);
    
  } catch (error) {
    console.error("Upload error: ",error);
    throw new Error("Failed to upload image. Please try again.");
  }
}

// logout function
logoutbtn.addEventListener("click", async () => {
    try {
    signOut(auth);
    const result = await Swal.fire({
        title: "Success :)",
        text: "Log-out Successfully",
        icon: "success",
        confirmButtonText: "Login",
      });
      
      if (result.isConfirmed) {
        window.location = "login.html";
      }

    } catch (error) {
        console.error("Logout error:", error);
        await Swal.fire({
            title: 'Error!',
            text: 'Failed to logout. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});

// For Form validation:
function validateForm() {
    if (!pimage.files[0]) {
        Swal.fire('Error', 'Please select a product image', 'error');
        return false;
    }
    if (ptitle.value.trim()) {
        
    }
}