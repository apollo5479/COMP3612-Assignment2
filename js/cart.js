import { addTextElement, formatPrice, toastTimedMessage } from "./helpers.js";

// constructor function for one item in the cart
function CartItem(product, quantity) {
    this.id = product.id;
    this.title = product.title;
    this.thumbnail = product.thumbnail;
    this.price = product.price;
    this.quantity = quantity;
}

const cartKey = "cart"; //the name that the cart is saved under in the localStoreage 
let cart = loadCart();

// shipping costs for each method and destination
const shippingCosts = {
    standard: {canada: 10, usa: 15, international: 20},
    express: {canada: 25, usa: 25, international: 30},
    priority: {canada: 35, usa: 50, international: 50}
};

// saves the cart so its still there after the browser is closed
function saveCart() {
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

// reads the saved cart or an empty cart if nothing is saved
function loadCart() {
    return JSON.parse(localStorage.getItem(cartKey)) || [];
}

// add item to cart or increase the quantity if it is there
export function addToCart(product, quantity) {

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push(new CartItem(product, quantity));
    }

    cartChanged();
}

// updates total count in the cart in the header
export function updateCartCount() {
    let count = 0;
    
    for (let item of cart) {
        count += item.quantity;
    } 

    document.querySelector("#cart-count").textContent = count;
}

// builds one table row for a cart item
function buildCartRow(item) {
    const row = document.createElement("tr");
    row.dataset.id = item.id;           // with this the quantity and remove controls know which item it is

    row.appendChild(buildItemCell(item));
    addTextElement(row, "td", formatPrice(item.price));

    row.appendChild(buildQuantityCell(item));
    addTextElement(row, "td", formatPrice(item.price * item.quantity));     // subtotal

    row.appendChild(buildRemoveCell());

    return row;
}

// the item column: builds the title and thumbnail
function buildItemCell(item) {
    const cell = document.createElement("td");
    const thumbnail = document.createElement("img");
    thumbnail.src = item.thumbnail;
    thumbnail.alt = item.title;
    thumbnail.classList.add("w-16");
    cell.appendChild(thumbnail);

    addTextElement(cell, "span", item.title);
    return cell;
}

// the quantuty column
function buildQuantityCell(item) {
    const cell = document.createElement("td");
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.min = 1;
    quantityInput.value = item.quantity;
    quantityInput.classList.add("cart-quantity", "w-16", "border");
    cell.appendChild(quantityInput);

    return cell;
}

// the remove column
function buildRemoveCell() {
    const cell = document.createElement("td");
    const button = addTextElement(cell, "button", "X");
    button.classList.add("cart-remove", "cursor-pointer");
    return cell;
}


// allows changing the quantity and removing items in the cart view
export function handleCartItems() {
    const cartItems = document.querySelector("#cart-items");

    // handle the quantity change
    cartItems.addEventListener("change", (e) => {
        if (!e.target.classList.contains("cart-quantity")) {
            return;
        }

        const row = e.target.parentNode.parentNode;  // the input is inside td, which is inside the tr that has dataset.id
        const id = Number(row.dataset.id);

        let quantity = Number(e.target.value);
        if (quantity < 1) {
            quantity = 1;   // anything below 1 is set back to 1 cause we use the remove button to remove
        }

        const item = cart.find(item => item.id === id);
        item.quantity = quantity;
        cartChanged();
    });

    // handle the remove button
    cartItems.addEventListener("click", (e) => {
        if (!e.target.classList.contains("cart-remove")) {
            return;
        }

        const row = e.target.parentNode.parentNode;  // the button is inside td, which is inside the tr
        const id = Number(row.dataset.id);
        const removedItem = cart.find(item => item.id === id);  // getting the item that was removed for the toast message

        cart = cart.filter(item => item.id !== id);
        cartChanged();
        toastTimedMessage(`${removedItem.title} removed from cart.`);
    });
}

// the total price of everything in the cart before shipping and tax
function getMerchandiseTotal() {
    let total = 0;

    for (let item of cart) {
        total += item.price * item.quantity;
    }
    return total;
}

// the shipping cost. it is nothing for an empty cart or free over $500
function getShippingCost(merchandise, method, destination) {
    if (cart.length === 0 || merchandise > 500) {
        return 0;
    }

    return shippingCosts[method][destination];
}

// only canada has a 5% tax
function getTax(merchandise, destination) {
    if (destination === "canada") {
        return merchandise * 0.05;
    }

    return 0;
}

function displaySummary() {
    const method = document.querySelector("#shipping-select").value;
    const destination = document.querySelector("#destination-select").value;

    const merchandiseTotal = getMerchandiseTotal();
    const shippingCost = getShippingCost(merchandise, method, destination);
    const tax = getTax(merchandise, destination);

    // TODO: complete the display and need to recalcute when the shipping or destination changes
}

// redraws the cart table from the cart array
export function displayCart() {
    const cartItems = document.querySelector("#cart-items");
    cartItems.replaceChildren();    // clears the old rows

    for (let item of cart) {
        cartItems.appendChild(buildCartRow(item));
    }
}


function cartChanged() {
    saveCart();
    updateCartCount();
    displayCart();
}
