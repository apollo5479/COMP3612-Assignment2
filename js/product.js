import { formatPrice, formatCategory, ratingToStars} from "./helpers.js";

export function displaySingleProduct(product) {

    document.querySelector("#breadcrumb-category").textContent = formatCategory(product.category);
    document.querySelector("#breadcrumb-title").textContent = product.title;


    const image = document.querySelector("#product-img");

    image.src = product.images[0];
    image.alt = product.title;

    document.querySelector("#product-title").textContent = product.title;
    document.querySelector("#product-rating").textContent = `${ratingToStars(product.rating)} ${product.rating.toFixed(1)}`;
    document.querySelector("#product-price").textContent = formatPrice(product.price);
    document.querySelector("#product-sku").textContent = product.sku;
    document.querySelector("#product-availability").textContent = product.availabilityStatus;
    displayTags(product.tags);
    document.querySelector("#product-description").textContent = product.description;

}

export function handleImageDialog() {
    const imgDialog = document.querySelector("#image-dialog");
    const image = document.querySelector("#product-img");

    image.addEventListener("click", () => {
        const dialogBigImg = document.querySelector("#image-dialog-img");
        dialogBigImg.src = image.src;
        dialogBigImg.alt = image.alt;
        imgDialog.showModal();
    });

    document.querySelector("#image-close-button").addEventListener("click", () => {
        imgDialog.close();
    });

    // close the image when the area outside of the dialog is clicked
    imgDialog.addEventListener("click", (e) => {
        
        if (e.target === imgDialog) {
            imgDialog.close();
        }
    });
}

function displayTags(tags) {
    const tagList = document.querySelector("#product-tags");

    for (let tag of tags) {
        const item = document.createElement("li");
        item.textContent = tag;
        item.classList.add("items-center", "rounded-full", "bg-black", "px-3", "py-1", "text-sm", "font-medium", "text-white"); // displays the tags as pill. We can style more later
        tagList.appendChild(item);
    }
}
