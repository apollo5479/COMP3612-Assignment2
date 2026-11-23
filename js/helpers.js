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

export function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

// formats the category like home-decoration into like Home Decoration. We only use this helper for text the user sees
export function formatCategory(category) {
    const parts = category.split("-"); // we get ["home", "decoration"]
    const capitalized = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
    return capitalized.join(" "); // we get "Home Decoration"
}
