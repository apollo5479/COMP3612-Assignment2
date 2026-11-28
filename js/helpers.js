export function toastTimedMessage(message) {
    const toast = document.querySelector("#toast-msg");
    toast.textContent = message;
    toast.classList.remove("hidden");
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 3000);
}

export function hideContainersButOne(containerToShow) {
    const containers = document.querySelectorAll("article");
    for (let container of containers) {
        container.classList.add("hidden");
    }

    containerToShow.classList.remove("hidden");
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

// builds one product card for Home, browse, and releated products
// this returns the <li> so each different view adds it to its own list
export function buildProductCard(product) {
    const card = document.createElement("li");
    card.dataset.id = product.id;
    card.classList.add("border", "rounded", "p-2"); // TODO: styling on the card

    const thumbnail = document.createElement("img");
    thumbnail.src = product.thumbnail;
    thumbnail.alt = product.title;
    thumbnail.classList.add("product-link", "cursor-pointer", "mx-auto", "w-full");   // clicking opens the product
    card.appendChild(thumbnail);

    const title = addTextElement(card, "h3", product.title);
    title.classList.add("product-link", "cursor-pointer", "font-bold");
    
    addTextElement(card, "p", `${ratingToStars(product.rating)} ${product.rating.toFixed(1)}`);
    addTextElement(card, "p", formatPrice(product.price));

    const button = addTextElement(card, "button", "Add to Cart");
    button.className = "add-to-cart border border-solid border-black hover:bg-black hover:text-white rounded-lg px-2 py-1  transition-colors duration-200";
    card.className = "hover:bg-gray-500/25 rounded-lg transition-colors duration-200 p-2"

    return card;
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

// helper for creating an element with text inside and adding to parent
export function addTextElement(parent, tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    parent.appendChild(element);
    return element;
}

// helper for turning the date like 2025-04-30T09:41:02.053Z into April 30, 2025
export function formatDate(dateText) {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];    // https://www.w3schools.com/jsref/jsref_getmonth.asp 
    const date = new Date(dateText);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
