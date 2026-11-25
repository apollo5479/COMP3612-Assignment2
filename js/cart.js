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

    saveCart();
    updateCartCount();
}

// updates total count in the cart in the header
export function updateCartCount() {
    let count = 0;
    
    for (let item of cart) {
        count += item.quantity;
    } 

    document.querySelector("#cart-count").textContent = count;
}
