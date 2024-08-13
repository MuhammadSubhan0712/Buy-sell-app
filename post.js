

export const form  = document.querySelector("#form");

export const image = document.querySelector("#image");

export const ptitle  = document.querySelector("#title");

export const pdesc  = document.querySelector("#description");

export const price  = document.querySelector("#price");

export const fname  = document.querySelector("#fname");

export const contact  = document.querySelector("#number");

export const products = [];


form.addEventListener("submit" , (event)=>{
    event.preventDefault();
    products.push({
        Image : image.value,
        Title : ptitle.value,
        Description: pdesc.value,
        Price : price.value,
        Fullname : fname.value,
        Contact : contact.value,
    });
console.log(products);
window.location = "./products.html"
});
