import { buildProductCard } from "./helpers.js";


// large hero image with title and button that goes to browse
function displayHomeHero(products) {
    const hero = document.querySelector("#hero");
    const h1 = hero.querySelector("h1");
    const p = hero.querySelector("p");
    const a = hero.querySelector("a");

    h1.textContent = "COMP3612 Assignment 2 Shop";
    p.textContent = "We offer the best deals only!";

    hero.className = "bg-[url('./imgs/campus1.png')] bg-cover bg-center bg-no-repeat h-96 rounded-lg " + "flex flex-col items-center justify-center " + "text-white text-center gap-4";
    h1.className = "text-5xl font-bold drop-shadow-lg";
    p.className = "text-xl drop-shadow-lg";
    a.className = "button nav-link bg-white text-black " + "px-6 py-3 rounded-lg font-semibold " + "hover:bg-gray-200";
    
}


export function handleHomeInit(products) {
    displayHomeHero(products);
    displayFeaturedProducts(products);
}

// a few feature products that are shown larger (and links to the single product view)
function displayFeaturedProducts(products) {
    const featuredList = document.querySelector("#featured-list");
    const topList = document.querySelector("#top-list");
    featuredList.className = "grid grid-cols-1 md:grid-cols-3 gap-8";
    topList.className = "grid grid-cols-1 md:grid-cols-5 gap-8";

    // shallow copy then sort by rating. track first 3 products and next 15 products
    const topProducts = [...products].sort((a, b) => b.rating - a.rating);
    const featuredProducts = topProducts.slice(0, 3);
    const remainingProducts = topProducts.slice(3, 18);

    for (const product of featuredProducts) {
        const card = buildProductCard(product);

        featuredList.appendChild(card);
    }
    for (const product of remainingProducts) {
        const card = buildProductCard(product);
        topList.appendChild(card);
    }
}