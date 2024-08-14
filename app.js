const products = [
      {
        name: "Laptop",
        brand: "Dell XPS 13",
        image: "https://example.com/images/dell-xps-13-hd.jpg",
        price: 999
      },
      {
        name: "Smartphone",
        brand: "Samsung Galaxy S21",
        image: "https://example.com/images/samsung-galaxy-s21-hd.jpg",
        price: 799
      },
      {
        name: "Smartwatch",
        brand: "Apple Watch Series 6",
        image: "https://example.com/images/apple-watch-series-6-hd.jpg",
        price: 399
      },

      {
        name: "Refrigerator",
        brand: "LG Smart Inverter",
        image: "https://example.com/images/lg-smart-inverter-hd.jpg",
        price: 1200
      },
      {
        name: "Microwave Oven",
        brand: "Samsung Convection",
        image: "https://example.com/images/samsung-microwave-hd.jpg",
        price: 250
      },
      {
        name: "Washing Machine",
        brand: "Bosch Front Load",
        image: "https://example.com/images/bosch-washing-machine-hd.jpg",
        price: 800
      },

      {
        name: "Running Shoes",
        brand: "Nike Air Zoom Pegasus",
        image: "https://example.com/images/nike-air-zoom-hd.jpg",
        price: 120
      },
      {
        name: "Casual Sneakers",
        brand: "Adidas Originals",
        image: "https://example.com/images/adidas-originals-hd.jpg",
        price: 85
      },
      {
        name: "Formal Shoes",
        brand: "Clarks Oxford",
        image: "https://example.com/images/clarks-oxford-hd.jpg",
        price: 150
      },

      {
        name: "iPhone 13",
        brand: "Apple",
        image: "https://example.com/images/iphone-13-hd.jpg",
        price: 999
      },
      {
        name: "OnePlus 9",
        brand: "OnePlus",
        image: "https://example.com/images/oneplus-9-hd.jpg",
        price: 729
      },
      {
        name: "Google Pixel 6",
        brand: "Google",
        image: "https://example.com/images/google-pixel-6-hd.jpg",
        price: 599
      },

      {
        name: "MacBook Pro",
        brand: "Apple",
        image: "https://example.com/images/macbook-pro-hd.jpg",
        price: 1299
      },
      {
        name: "Surface Laptop",
        brand: "Microsoft",
        image: "https://example.com/images/surface-laptop-hd.jpg",
        price: 999
      },
      {
        name: "ThinkPad X1",
        brand: "Lenovo",
        image: "https://example.com/images/thinkpad-x1-hd.jpg",
        price: 1100
      }
    ];
  display = document.querySelector("#div");

  
function renderProducts() {
  display.innerHTML = " ";

  products.map(items =>{
    display.innerHTML += `
        <div class="card w-96 bg-blue-800 shadow-xl text-white left-5">
        <figure>
            <img src="${items.image}" alt="Sample Image" class="w-full h-48 object-cover">
        </figure>
        <div class="card-body">
            <h2 class="card-title">${items.name}</h2>
            <h3 class="card-title">${items.brand}</h3>
            <h4><b>${items.price}$</b></h4>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Product</button>
            </div>
        </div>
    </div>
    `
  });
}
renderProducts();


