import { openSingleProductView } from "./browse.js";

export function toastTimedMessage(message) {
    const toast = document.querySelector("#toast-msg");
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => {
        toast.style.display = "none";
    }, 3000);
}

export function ratingToStars(rating) {
    const stars = Math.floor(rating);
    return stars;
}

export function createCard(product) {
    const card = document.createElement("li");
    card.className = "product-card"; // TO DO: dont forget to make the CSS for this

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
    img.className = "product-thumbnail"; // TO DO: dont forget to make the CSS for this 

    const title = document.createElement("h3");
    title.textContent = product.title;
    title.className = "product-title"; // TO DO: dont forget to make the CSS for this

    const price = document.createElement("p");
    price.textContent = `$${product.price}`;
    price.className = "product-price"; // TO DO: dont forget to make the CSS for this

    const rating = document.createElement("p");
    const stars = ratingToStars(product.rating);
    rating.textContent = `Rating: ${stars} stars`;

    // clickable thumbnail and title
    const productLink = document.createElement("a");
    productLink.href = "#single-product";
    productLink.className = "product-link"; // TO DO: dont forget to make the CSS for this

    productLink.appendChild(img);
    productLink.appendChild(title);
    productLink.addEventListener("click", () => {
        openSingleProductView(product);
    } );

    // add to cart button
    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.className = "add-to-cart-button"; // TO DO: dont forget to make the CSS for this
    addToCartButton.addEventListener("click", () => {
        toastTimedMessage(`${product.title} added to cart!`);
    } );

    card.appendChild(productLink);
    card.appendChild(price);
    card.appendChild(addToCartButton);
    card.appendChild(rating);

    return card;
}