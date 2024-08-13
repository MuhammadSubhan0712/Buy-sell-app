
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";



  const firebaseConfig = {
    apiKey: "AIzaSyBGMrQHpyvsGowbqNVy-KJIJt4ekmRCApI",
    authDomain: "olx-clone-13521.firebaseapp.com",
    projectId: "olx-clone-13521",
    storageBucket: "olx-clone-13521.appspot.com",
    messagingSenderId: "916644426986",
    appId: "1:916644426986:web:8bc4ef3920473b57aad393",
    measurementId: "G-64B93BHR7B"
  };


 export  const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
