import { getProducts } from "./data.js";
import { displaySingleProduct, handleImageDialog, handleAddToCart, handleTabs } from "./product.js";

document.addEventListener("DOMContentLoaded", () => {
    const products = getProducts();

    console.log(products);

    openHomePage();
    handleNavigation();
    handleAboutDialog();
    handleImageDialog();
    handleAddToCart();
    handleTabs();
    handleProductLinks();

    // temp: only for testing until we have product cards on Home
    openSingleProduct(products[67]);

});

function hideContainersButOne(containerToShow) {
    const containers = document.querySelectorAll("article");
    for (let container of containers) {
        container.classList.add("hidden");
    }

    containerToShow.classList.remove("hidden");
}

function openHomePage() {
    hideContainersButOne(document.querySelector("#home"));
}


function handleNavigation() {
    document.querySelector("body").addEventListener("click", (e) => {
        let link;
        if (e.target.classList.contains("nav-link")) {
            link = e.target;
        } else if (e.target.parentNode.classList.contains("nav-link")) {
            link = e.target.parentNode;
        } else {
            return;
        }

        e.preventDefault();
        const id = link.getAttribute("href");
        hideContainersButOne(document.querySelector(id));
    });
}


function handleAboutDialog() {
    const aboutDialog = document.querySelector("#about");

    document.querySelector("#about-link").addEventListener("click", (e) => {
        e.preventDefault();
        aboutDialog.showModal();
    });

    document.querySelector("#about-close-button").addEventListener("click", () => {
        aboutDialog.close();
    });
}

// fills the single product view and switches to it
function openSingleProduct(product) {
    displaySingleProduct(product);
    hideContainersButOne(document.querySelector("#single-product"));
}

// opens a product when the img or title is clicked
function handleProductLinks() {

    document.querySelector("main").addEventListener("click", (e) => {

        if (!e.target.classList.contains("product-link")) {
            return;  // it is not a card img or title
        }

        const card = e.target.parentNode;       // the cards li which holds the product id
        const id = Number(card.dataset.id);
        const product = getProducts().find(p => p.id === id);

        openSingleProduct(product);
    });

    // TODO: just like in handleAddToCart function in product.js, the add to carts dont do anything until a proper function to handle that is added
}
