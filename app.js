
import { onAuthStateChanged, signOut, } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db } from "./config.js";



let products = [
      {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAJZfuMV284pegBzgftQTbNwojzYziV3Y4Og&s",
        title: "Laptop",
        Description: "Dell XPS 13",
        price: 999
      },
      {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwYHlneKwMmk92NLHShscxO-zC_jbd8P-7tQ&s",
        title: "Smartphone",
        Description: "Samsung Galaxy S21",
        price: 799
      },
      {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1xCZymA8YBV0fHdlsghozXB72eWCQh4oPTQ&s",
        title: "Smartwatch",
        Description: "Apple Watch Series 6",
        price: 399
      },

      {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYCMvbV1T20imUBz9BUTXy7GnHv8w1-AY6OlLd-9rhOYq7UjGXjFed6-rmIZv5Z8AAn9o&usqp=CAU",
        title: "Refrigerator",
        Description: "LG Smart Inverter",
        price: 1200
      },
      {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq8wGz5EgjX3A7oHmDpZKlCQ9g5KB2V3dN3Q&s",
        title: "Microwave Oven",
        Description: "Samsung Convection",
        price: 250
      },
      {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC4LZMzN0tp_rhGc3qiMKL7mebPxKNBH5D_A&s",
        title: "Washing Machine",
        Description: "Bosch Front Load",
        price: 800
      },

      {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQay9akkwJu6yRueKmlnT3GBRqBOSGuF8TaXw&s",
        title: "Running Shoes",
        Description: "Nike Air Zoom Pegasus",
        price: 120
      },
      {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKWY2QyLjd-ITa2c0c-mHtEmmD5GhvIWMK9w&s",
        title: "Casual Sneakers",
        Description: "Adidas Originals",
        price: 85
      },
      {
         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP8U1hF8BhsfzRRs5QfbEsHTSkC9LnF4cbCQ&s",
        title: "Formal Shoes",
        Description: "Clarks Oxford",
        price: 150
      },

      {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh_Qe0NSN8Wf_cJqPNmsgy8ZWcCbW98Iyv7Q&s",
        title: "iPhone 13",
        Description: "Apple",
        price: 999
      },
      {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6i9oc0w4tA_eUzU6TgdgtgLOv2UFg3PTKdQ&s",
        title: "OnePlus 9",
        Description: "OnePlus",
        price: 729
      },
      {
        image: "https://media.wired.com/photos/616e0b46436c4f5f5e47d166/191:100/w_1280,c_limit/Gear-Google-Pixel-6-top.jpg",
        title: "Google Pixel 6",
        Description: "Google",
        price: 599
      },

      {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg0lFi5r-UmHVrYzjROeu237pYepD7Kvqqg2ICLQVA28o3sdcTAmCUvnNnqd9bVt95EBM&usqp=CAU",
        title: "MacBook Pro",
        Description: "Apple",
        price: 1299
      },
      {
        image: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/laptop-family_Surface-Laptop-Go-3_sandstone:VP1-539x400?fmt=png-alpha",
        title: "Surface Laptop",
        Description: "Microsoft",
        price: 999
      },
      {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg6ZoH4yo0gcoqCCo4Ar_zhEnjBXG6dqO_tA&s",
        title: "ThinkPad X1",
        Description: "Lenovo",
        price: 1100
      }
    ];

    // Declares variables of HTML elements
const  display = document.querySelector("#div");
const  Icon = document.querySelector("#usericon");
const  loginDiv = document.querySelector("#login-Div");
const   logout = document.querySelector("#logout-btn");

   onAuthStateChanged(auth ,async (user) =>{
    if (user) {
      const uid = user.uid;
      const q = query(collection(db , "users"),where("uid" , "==" , uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        Icon.src = data.url
      });
    }
    else {
    console.log("User not login");
    loginDiv.innerHTML = `<a href="./login.html"><button class="btn btn-primary">login</button></a>`
    }
   });
  
   Icon.addEventListener("click" , ()=>{
    Swal.fire({
      title: 'Success :)',
      text: 'Do you want to post Ad?',
      confirmButtonText: 'Post Ad'
  }) 
  .then((result) =>{
    if (result.isConfirmed) {
      window.location = "post.html";
    }
  });
  })


logout.addEventListener("click" , ()=>{
  signOut(auth).then(() =>{
    Swal.fire({
      title: 'Success :)',
      text: 'Logout Successfully',
      icon: 'success',
      confirmButtonText: 'Login'
    })
    .then((result) =>{
      if (result.isConfirmed) {
        window.location = "login.html";
      }
    });
  }).catch((error) =>{
    console.log(error);
    
  });
});



// Async Function to render the products:
async function renderProducts() {
  const querySnapshot = await getDocs(collection(db , "Product_Info"));
  querySnapshot.forEach((doc) =>{
    let data = doc.data()
    products.push(data)
  });
  display.innerHTML = " ";
  products.map((items , index) =>{
    display.innerHTML += `
        <div class="card w-96 border shadow-xl text-white left-5">
        <figure>
            <img id="image" src="${items.image}" alt="Sample Image" class="w-full h-48 object-cover">
        </figure>
        <div class="card-body">
            <h1 id="cart-title" class="card-title">Title: ${items.title}</h1>
            <h2  id="cart-brand"  class="card-title">Brand: ${items.Description}</h2>
            <p id="number" class="card-title">Contact Seller: ${items.number}</p>
            <p  id="price"  class="font-size-5"><b>Price: ${items.price}$</b></p>
            <div class="card-actions justify-center">
                <button id="Cart" class="btn btn-primary">Read More</button>
            </div>
        </div>
    </div>
    `
let Cart = document.querySelectorAll("#Cart");
Cart.forEach((btn , index) => {
  btn.addEventListener("click" , () => {
            localStorage.setItem("Product" , JSON.stringify(products[index]));
            window.location = "Cart.html";
  })
})
})
}
renderProducts();