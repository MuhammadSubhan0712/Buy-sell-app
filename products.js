
import {products , form, image, ptitle, pdesc, price, fname, contact} from  "./post.js";

const display = document.querySelector("#div");

if (products === 0) {
    display.innerHTML = "No product inserted yet";
}

display.innerHTML += `
  <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img class="w-full" src=${products.image} alt="Sample Image">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">${products.ptitle}</div>
          <p class="text-gray-700 text-base">
          ${products.pdesc}
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          ${products.price}</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          ${products.fname}</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          ${products.contact}</span>
        </div>
      </div>
`;





