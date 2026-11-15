import { getProducts } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
    const products = getProducts();

    console.log(products);

    //openHomePage();
    hideContainersButOne(document.getElementById("single-product"));
    closeAboutDialog();

    buildProductCard(products[0]);
});

function hideContainersButOne(containerToShow) {
    const homeContainer = document.getElementById("home");
    const categoryContainer = document.getElementById("category");
    const browseContainer = document.getElementById("browse");
    const singleProductContainer = document.getElementById("single-product");
    const cartContainer = document.getElementById("cart");
    homeContainer.style.display = "none";
    categoryContainer.style.display = "none";
    browseContainer.style.display = "none";
    singleProductContainer.style.display = "none";
    cartContainer.style.display = "none";

    containerToShow.style.display = "block";
}

function openHomePage() {
    hideContainersButOne(document.getElementById("home"));
}

function openAboutDialog() {
    const aboutDialog = document.getElementById("about");
    aboutDialog.showModal();
}

function closeAboutDialog() {
    const aboutDialog = document.getElementById("about");
    aboutDialog.close();
}

function toastTimedMessage(message) {
    const toast = document.getElementById("toast-msg");
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => {
        toast.style.display = "none";
    }, 3000);
}

function ratingToStars(rating) {
    const stars = Math.floor(rating);
    return stars;
}

function buildProductCard(product) {
    const productDetails = document.querySelector("#product-details");
    
    //setting up the product card
    const productThumbnail = document.createElement("img");
    productThumbnail.src = product.thumbnail;
    productThumbnail.alt = product.title; 
    const productCard = document.createElement("div");
    const productName = document.createElement("h2");
    productName.textContent = product.title;
    const productPrice = document.createElement("p");
    productPrice.textContent = `$${product.price.toFixed(2)}`;

    //not done yet, need to convert to star emojis
    //const productRating = document.createElement("p");
    //const stars = ratingToStars(product.rating);
    //productRating.textContent = `Rating: ${stars} stars`;

    //appending everything
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productDetails.appendChild(productThumbnail); 
    //productCard.appendChild(productRating); 

    productDetails.appendChild(productCard);
}