import { getProducts } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
    const products = getProducts();

    console.log(products);
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
    const aboutDialog = document.getElementById("about-dialog");
    aboutDialog.showModal();
}

