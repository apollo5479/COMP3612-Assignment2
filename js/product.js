import { getProducts } from "./data.js";
import { formatPrice, formatCategory, ratingToStars, toastTimedMessage, formatDate, addTextElement, buildProductCard } from "./helpers.js";
import { addToCart } from "./cart.js";
import { browseByCategory } from "./browse.js";


// ================================================================ Functions Used In Other Files ================================================================

// sets up the event handlers for the single product view on page load
export function initSingleProductView() {
    handleImageDialog();
    handleAddToCart();
    handleTabs();
    handleBreadcrumb();
}

// main function for displaying a single product
export function displaySingleProduct(product) {

    document.querySelector("#breadcrumb-category").textContent = formatCategory(product.category);
    document.querySelector("#breadcrumb-category").dataset.category = product.category;     // so the link knows which category to open
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
    displaySpecification(product);
    displayReviews(product.reviews);
    displayRelatedProducts(product);
    selectTab(document.querySelector("#specs-tab"), document.querySelector("#specs-panel"));   // every product opens on the specification tab
    document.querySelector("#product-quantity").value = 1;
    document.querySelector("#add-to-cart-button").dataset.id = product.id; // with this the button knows which product its for. adds the attribute data-id with products id as its vaule
    document.querySelector("#product-description").textContent = product.description;

}



// ================================================================ Functions For Displaying Used In displaySingleProduct ================================================================
function displayTags(tags) {
    const tagList = document.querySelector("#product-tags");
    tagList.replaceChildren(); // clear the previous product's tags

    for (let tag of tags) {
        const item = addTextElement(tagList, "li", tag);
        item.classList.add("rounded-full", "bg-black", "px-3", "py-1", "text-sm", "font-medium", "text-white"); // displays the tags as pill. We can style more later
    }
}

function displaySpecification(product) {
    const dimensions = product.dimensions;

    document.querySelector("#product-weight").textContent = `${product.weight} kg`;
    document.querySelector("#product-dimensions").textContent = `${dimensions.width} x ${dimensions.height} x ${dimensions.depth} cm`;
    document.querySelector("#product-warranty").textContent = product.warrantyInformation;
    document.querySelector("#product-shipping").textContent = product.shippingInformation;
    document.querySelector("#product-return-policy").textContent = product.returnPolicy;
}

function displayReviews(reviews) {
    const reviewList = document.querySelector("#reviews-panel");
    reviewList.replaceChildren();       // clear the previous product's reviews

    if (reviews.length === 0) {
        addTextElement(reviewList, "li", "No reviews.");
        return;
    }

    for (let review of reviews) {
        const item = document.createElement("li");
        item.classList.add("border-b", "py-2"); // TODO: styling

        const name = addTextElement(item, "p", review.reviewerName);
        name.classList.add("font-bold"); // TODO: styling

        addTextElement(item, "p", ratingToStars(review.rating));

        const date = addTextElement(item, "p", formatDate(review.date));
        date.classList.add("text-sm", "text-gray-500") // TODO: styling

        addTextElement(item, "p", review.comment);
        reviewList.appendChild(item);
    }
}

// shows up to 5 other products from the same category 
function displayRelatedProducts(product) {
    const relatedList = document.querySelector("#related-list");
    relatedList.replaceChildren();    // clears the previous product's related items

    const related = getProducts().filter(p => p.category === product.category && p.id !== product.id);  // the same category but not the product being viewd

    if (related.length === 0) {
        addTextElement(relatedList, "li", "No related products.");
        return;
    }

    for (let relatedProduct of related.slice(0, 5)) {
        relatedList.appendChild(buildProductCard(relatedProduct));
    }   
}


// ================================================================ Functions For Event Handling Used In initSingleProductView ================================================================

function handleImageDialog() {
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

// the add to cart on the single product view
function handleAddToCart() {
    const button = document.querySelector("#add-to-cart-button");

    button.addEventListener("click", () => {

        const quantity = Number(document.querySelector("#product-quantity").value); // convert from text
        if (quantity < 1) {
            toastTimedMessage("Enter a quantity of 1 or more.");
            return;
        }

        const id = Number(button.dataset.id);
        const product = getProducts().find(p => p.id === id);

        addToCart(product, quantity);
        toastTimedMessage(`${quantity}x ${product.title} added to cart.`);
    });
}

// opens browse filtered to the product's category when the breadcrumb category is clicked
function handleBreadcrumb() {
    const categoryLink = document.querySelector("#breadcrumb-category");

    categoryLink.addEventListener("click", (e) => {
        e.preventDefault();
        browseByCategory(getProducts(), categoryLink.dataset.category);
    });
}

function handleTabs() {
    const specsTab = document.querySelector("#specs-tab");
    const reviewsTab = document.querySelector("#reviews-tab");

    specsTab.addEventListener("click", () => {selectTab(specsTab, document.querySelector("#specs-panel"))});
    reviewsTab.addEventListener("click", () => {selectTab(reviewsTab, document.querySelector("#reviews-panel"))});
}

// shows one panel and hides the others
function selectTab(tabToSelect, panelToShow) {

    for (let tab of document.querySelectorAll(".product-tab")) {
        tab.classList.remove("font-bold");
    }

    for (let panel of document.querySelectorAll(".product-panel")) {
        panel.classList.add("hidden");
    }

    tabToSelect.classList.add("font-bold");  // the bold font shows which tab is selected
    panelToShow.classList.remove("hidden");

}
