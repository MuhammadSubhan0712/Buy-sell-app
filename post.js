import { collection, getDocs, query, where, addDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { onAuthStateChanged, signOut, } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
    uploadBytes,
    getDownloadURL,
    ref,
    getStorage
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

import { auth, db } from "./config.js";

let storage = getStorage()

// Declares variables of HTML elements
const display = document.querySelector("#div");
const Icon = document.querySelector("#usericon");
const loginDiv = document.querySelector("#login-Div");
const logoutbtn = document.querySelector("#logout-btn");
const form  = document.querySelector("#form");
const pimage = document.querySelector("#image");
const ptitle  = document.querySelector("#title");
const pdesc  = document.querySelector("#description");
const price  = document.querySelector("#price");
const fname  = document.querySelector("#fname");
const contact  = document.querySelector("#number");
const postbtn =  document.querySelector("#Post-Now");




// check user status user login or not
onAuthStateChanged(auth, async (user) => {
    if (user) {
        uid = user.uid;
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            Icon.src = data.photoUrl
        });
    } else {
        console.log('user is not here');
        loginDiv.innerHTML = `<a href="./login.html"><button class="btn btn-primary">login</button></a>`
        !user ? window.location = './login.html' : console.log('user present ');
    }
});




form.addEventListener("submit", async event => {
    event.preventDefault()
    postbtn.innerHTML = `<img class="loading" src="./Assets/Images/load-37_256.gif" alt="">`

    let file = pimage.files[0]
    let url = await uploadFile(file, `${uid} + ${Date.now()}`)

    try {
        const docRef = await addDoc(collection(db, "product_details"), {
            productImage: url,
            Product_title: ptitle.value, 
            Product_Description: pdesc.value,
            Price: price.value,
            UserName: fname.value,
            phone_number: contact.value,
        });

        Swal.fire({
            title: 'Ad successfully publish',
            text: 'See Your Ad',
            icon: 'success',
            confirmButtonText: 'See ad'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location = './index.html'
                }
            });

        // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
})




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


// logout function
logoutbtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        Swal.fire({
            title: 'Success!',
            text: 'Log-out Successfully',
            icon: 'success',
            confirmButtonText: 'Login'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location = './login.html'
                }
            });
        // window.location = './login.html'
    }).catch((error) => {
        // An error happened.
    });
})