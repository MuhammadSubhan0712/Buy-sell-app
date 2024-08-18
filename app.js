const products = [
      {
        name: "Laptop",
        brand: "Dell XPS 13",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAJZfuMV284pegBzgftQTbNwojzYziV3Y4Og&s",
        price: 999
      },
      {
        name: "Smartphone",
        brand: "Samsung Galaxy S21",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwYHlneKwMmk92NLHShscxO-zC_jbd8P-7tQ&s",
        price: 799
      },
      {
        name: "Smartwatch",
        brand: "Apple Watch Series 6",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1xCZymA8YBV0fHdlsghozXB72eWCQh4oPTQ&s",
        price: 399
      },

      {
        name: "Refrigerator",
        brand: "LG Smart Inverter",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYCMvbV1T20imUBz9BUTXy7GnHv8w1-AY6OlLd-9rhOYq7UjGXjFed6-rmIZv5Z8AAn9o&usqp=CAU",
        price: 1200
      },
      {
        name: "Microwave Oven",
        brand: "Samsung Convection",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq8wGz5EgjX3A7oHmDpZKlCQ9g5KB2V3dN3Q&s",
        price: 250
      },
      {
        name: "Washing Machine",
        brand: "Bosch Front Load",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC4LZMzN0tp_rhGc3qiMKL7mebPxKNBH5D_A&s",
        price: 800
      },

      {
        name: "Running Shoes",
        brand: "Nike Air Zoom Pegasus",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQay9akkwJu6yRueKmlnT3GBRqBOSGuF8TaXw&s",
        price: 120
      },
      {
        name: "Casual Sneakers",
        brand: "Adidas Originals",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKWY2QyLjd-ITa2c0c-mHtEmmD5GhvIWMK9w&s",
        price: 85
      },
      {
        name: "Formal Shoes",
        brand: "Clarks Oxford",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP8U1hF8BhsfzRRs5QfbEsHTSkC9LnF4cbCQ&s",
        price: 150
      },

      {
        name: "iPhone 13",
        brand: "Apple",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh_Qe0NSN8Wf_cJqPNmsgy8ZWcCbW98Iyv7Q&s",
        price: 999
      },
      {
        name: "OnePlus 9",
        brand: "OnePlus",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6i9oc0w4tA_eUzU6TgdgtgLOv2UFg3PTKdQ&s",
        price: 729
      },
      {
        name: "Google Pixel 6",
        brand: "Google",
        image: "https://media.wired.com/photos/616e0b46436c4f5f5e47d166/191:100/w_1280,c_limit/Gear-Google-Pixel-6-top.jpg",
        price: 599
      },

      {
        name: "MacBook Pro",
        brand: "Apple",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg0lFi5r-UmHVrYzjROeu237pYepD7Kvqqg2ICLQVA28o3sdcTAmCUvnNnqd9bVt95EBM&usqp=CAU",
        price: 1299
      },
      {
        name: "Surface Laptop",
        brand: "Microsoft",
        image: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/laptop-family_Surface-Laptop-Go-3_sandstone:VP1-539x400?fmt=png-alpha",
        price: 999
      },
      {
        name: "ThinkPad X1",
        brand: "Lenovo",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg6ZoH4yo0gcoqCCo4Ar_zhEnjBXG6dqO_tA&s",
        price: 1100
      }
    ];
  display = document.querySelector("#div");

// Function to render the products:
function renderProducts() {
  display.innerHTML = " ";

  products.map(items =>{
    display.innerHTML += `
        <div class="card w-96 border shadow-xl text-white left-5">
        <figure>
            <img src="${items.image}" alt="Sample Image" class="w-full h-48 object-cover">
        </figure>
        <div class="card-body">
            <h1 class="card-title">Name: ${items.name}</h1>
            <h2 class="card-title">Brand: ${items.brand}</h2>
            <p class="font-size-5"><b>Price: ${items.price}$</b></p>
            <div class="card-actions justify-center">
                <button onclick="tologin()" class="btn btn-primary">Read More</button>
            </div>
        </div>
    </div>
    `
  });
}
renderProducts();


// function to go login page:
function tologin() {
    window.location = "./login.html";
}