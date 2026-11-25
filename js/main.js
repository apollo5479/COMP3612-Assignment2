import { getProducts } from "./data.js";
import { displaySingleProduct, initSingleProductView } from "./product.js";
import { addToCart, initCart } from "./cart.js";
import { toastTimedMessage, hideContainersButOne } from "./helpers.js";

document.addEventListener("DOMContentLoaded", () => {
    const products = getProducts();

    console.log(products);

    openHomePage();
    handleNavigation();
    handleAboutDialog();
    initSingleProductView();
    handleProductCards();
    initCart();

    // temp: only for testing until we have product cards on Home
    openSingleProduct(products[67]);

});

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

// handles the clicks on any product card
function handleProductCards() {

    document.querySelector("main").addEventListener("click", (e) => {
        const isProductLink = e.target.classList.contains("product-link");  // the card img or title
        const isAddToCart = e.target.classList.contains("add-to-cart");     // the add to cart button

        if (!(isProductLink || isAddToCart)) {
            return;
        }


        const card = e.target.parentNode;       // the cards li which holds the product id
        const id = Number(card.dataset.id);
        const product = getProducts().find(p => p.id === id);

        if (isProductLink) {
            openSingleProduct(product);
        } else {
            addToCart(product, 1);
            toastTimedMessage(`1x ${product.title} added to cart.`);
        }
    });
}
