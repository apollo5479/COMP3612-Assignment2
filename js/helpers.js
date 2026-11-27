import { displaySingleProduct } from "./product.js";

export function toastTimedMessage(message) {
    const toast = document.querySelector("#toast-msg");
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => {
        toast.style.display = "none";
    }, 3000);
}

export function ratingToStars(rating) {
    const fullStars = Math.round(rating);
    let stars = "";

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += "★";
        } else {
            stars += "☆";
        }
    }
    return stars;
}

export function buildProductCard(product) {
const productDetails = document.querySelector("#product-details");

    // setting up the product card
    const productCard = document.createElement("div");

    const productThumbnail = document.createElement("img");
    productThumbnail.src = product.thumbnail;
    productThumbnail.alt = product.title;

    const productName = document.createElement("h2");
    productName.textContent = product.title;

    const productPrice = document.createElement("p");
    productPrice.textContent = `$${product.price.toFixed(2)}`;

    // starEmojis is whole number, product.rating is the original value
    const productRating = document.createElement("p");
    productRating.textContent = `Rating: ${ratingToStars(product.rating)} (${product.rating})`;

    // add to cart button
    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.className = "add-to-cart-button";

    addToCartButton.addEventListener("click", () => {
        toastTimedMessage(`${product.title} added to cart!`);
    });

    // clickable thumbnail and title
    const productLink = document.createElement("a");
    productLink.href = "#single-product";
    productLink.className = "product-link";

    productLink.appendChild(productThumbnail);
    productLink.appendChild(productName);

    productLink.addEventListener("click", () => {
        displaySingleProduct(product);
    });

    //appending everything
    productCard.appendChild(productLink);
    productCard.appendChild(productPrice);
    productCard.appendChild(productRating);
    productCard.appendChild(addToCartButton);

    productDetails.appendChild(productCard);
}