import { addTextElement, formatPrice, toastTimedMessage, hideContainersButOne } from "./helpers.js";

// ================================================================ Cart Data and Storage ================================================================
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


// ================================================================ Functions Used In Other Files ================================================================

// sets up the cart on page load, shows the saved cart and, sets up the event handlers for the cart view
export function initCart() {
    updateCartCount();
    displayCart();
    handleCartView();
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



// ================================================================ Changing The Cart ================================================================

// whenever there is any change to the cart
function cartChanged() {
    saveCart();
    updateCartCount();
    displayCart();
}

// function for when checkout button is clicked. show toast, clear cart, and return to home
function checkout() {
    cart = [];
    cartChanged();
    toastTimedMessage("Thank you for shopping with us!");
    hideContainersButOne(document.querySelector("#home"));
}


// ================================================================ Event Handling For The Cart ================================================================

// handles everything changed or clicked in the cart view
function handleCartView() {
    const cartView = document.querySelector("#cart");

    // handle the quantity and the shipping and destination change
    cartView.addEventListener("change", (e) => {
        if (e.target.classList.contains("cart-quantity")) {
            const row = e.target.parentNode.parentNode;  // the input is inside td, which is inside the tr that has dataset.id
            const id = Number(row.dataset.id);

            let quantity = Number(e.target.value);
            if (quantity < 1) {
                quantity = 1;   // anything below 1 is set back to 1 cause we use the remove button to remove
            }

            const item = cart.find(item => item.id === id);
            item.quantity = quantity;
            cartChanged();
        } else if (e.target.id === "shipping-select" || e.target.id === "destination-select") {
            displaySummary();       // the change was made to the shipping or destination so we recalculate the summary
        }

    });

    // handle the remove buttons and checkout button
    cartView.addEventListener("click", (e) => {

        if (e.target.classList.contains("cart-remove")) {
            const row = e.target.parentNode.parentNode;  // the button is inside td, which is inside the tr
            const id = Number(row.dataset.id);
            const removedItem = cart.find(item => item.id === id);  // getting the item that was removed for the toast message

            cart = cart.filter(item => item.id !== id);
            cartChanged();
            toastTimedMessage(`${removedItem.title} removed from cart.`);

        } else if (e.target.id === "checkout-button") {
            checkout();         // the checkout button was clicked
        }
    
    });
}


// ================================================================ Displaying The Cart View ================================================================

// redraws the cart table, summary, and empty cart state from the cart array
function displayCart() {
    const cartItems = document.querySelector("#cart-items");
    cartItems.replaceChildren();    // clears the old rows

    for (let item of cart) {
        cartItems.appendChild(buildCartRow(item));
    }

    displaySummary();
    updateEmptyCart();
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

// displays msg if the cart is empty and disables shipping and checkout option
function updateEmptyCart() {
    const isEmpty = cart.length === 0;

    document.querySelector("#cart-empty").classList.toggle("hidden", !isEmpty);
    document.querySelector("#cart-table").classList.toggle("hidden", isEmpty);

    document.querySelector("#shipping-select").disabled = isEmpty;
    document.querySelector("#destination-select").disabled = isEmpty;
    document.querySelector("#checkout-button").disabled = isEmpty;

}

// updates total count in the cart in the header
function updateCartCount() {
    let count = 0;
    
    for (let item of cart) {
        count += item.quantity;
    } 

    document.querySelector("#cart-count").textContent = count;
}


// ================================================================ Summary ================================================================

function displaySummary() {
    const method = document.querySelector("#shipping-select").value;
    const destination = document.querySelector("#destination-select").value;

    const merchandiseTotal = getMerchandiseTotal();
    const shippingCost = getShippingCost(merchandiseTotal, method, destination);
    const tax = getTax(merchandiseTotal, destination);

    document.querySelector("#summary-merchandise").textContent = formatPrice(merchandiseTotal);
    document.querySelector("#summary-shipping").textContent = formatPrice(shippingCost);
    document.querySelector("#summary-tax").textContent = formatPrice(tax);
    document.querySelector("#summary-total").textContent = formatPrice(merchandiseTotal + shippingCost + tax);
    
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
