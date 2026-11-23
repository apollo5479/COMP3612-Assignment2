import { getProducts } from "./data.js";
import { formatPrice, formatCategory, ratingToStars, toastTimedMessage} from "./helpers.js";

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
    document.querySelector("#product-quantity").value = 1;
    document.querySelector("#add-to-cart-button").dataset.id = product.id; // with this the button knows which product its for. adds the attribute data-id with products id as its vaule
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

// the add to cart on the single product view
export function handleAddToCart() {
    const button = document.querySelector("#add-to-cart-button");

    button.addEventListener("click", () => {

        const quantity = Number(document.querySelector("#product-quantity").value); // convert from text
        if (quantity < 1) {
            toastTimedMessage("Enter a quantity of 1 or more.");
            return;
        }

        const id = Number(button.dataset.id);
        const product = getProducts().find(p => p.id === id);

        // temp: we dont have an actual add to cart function yet
        console.log("add to cart:", product.title, quantity);

        toastTimedMessage(`${quantity}x ${product.title} added to cart.`);
    })
}
