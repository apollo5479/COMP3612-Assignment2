import { getProducts } from "./data.js";
import { toastTimedMessage, ratingToStars, buildProductCard} from "./helpers.js";
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

    // temp: only for testing
    displaySingleProduct(products[67]);
    hideContainersButOne(document.querySelector("#single-product"));

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
