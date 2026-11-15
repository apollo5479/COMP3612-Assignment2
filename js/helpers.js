export function toastTimedMessage(message) {
    const toast = document.getElementById("toast-msg");
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
