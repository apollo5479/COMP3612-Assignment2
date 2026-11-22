import { getProducts } from "./data.js";

document.addEventListener("DOMContentLoaded", function() {
    // TO DO: put code here later
});

/*
    1) filters products
    2) sorts products
    3) redraw the grid

function drawGrid(products) {
    const results = products.filter(p => {
        
    });
    products.sort( (a,b) => a - b); // change this later to product titles
};*/


function displayProducts(products) {
    const resultsList = document.querySelector("#results-list");
    const noMatches = document.querySelector("#no-matches");

    resultsList.replaceChildren(); // clear the results list

    if (products.length === 0) {
        noMatches.style.display = "block"; // show the no matches message
        return;
    }

    noMatches.style.display = "none"; // hide the no matches message

    for (const product of products) {
        const card = createCard(product);
        resultsList.appendChild(card);
    }
}


function createCard(product) {
    const card = document.createElement("li");
    //card.className = "product-card"; // TO DO: dont forget to make the CSS for this

    // thumbnail
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
    //img.className = "product-thumbnail"; // TO DO: dont forget to make the CSS for this 

    // title
    const title = document.createElement("h3");
    title.textContent = product.title;
    //title.className = "product-title"; // TO DO: dont forget to make the CSS for this

    // price
    const price = document.createElement("p");
    price.textContent = `$${product.price}`;
    //price.className = "product-price"; // TO DO: dont forget to make the CSS for this

    // clickable thumbnail and title
    const productLink = document.createElement("a");
    productLink.href = "#single-product"; // TO DO: CHECK IF THIS WORKS
    //productLink.className = "product-link"; // TO DO: dont forget to make the CSS for this

    productLink.appendChild(img);
    productLink.appendChild(title);
    productLink.addEventListener("click", (e) => {} ); // TO DO: not done

    // add to cart button
    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    //addToCartButton.className = "add-to-cart-button"; // TO DO: dont forget to make the CSS for this
    addToCartButton.addEventListener("click", (e) => {} ); // TO DO: not done, show toast message

    card.appendChild(productLink);
    card.appendChild(price);
    card.appendChild(addToCartButton);

    return card;
}

// TO DO: add event listener for addToCartButton to show toast message AND add product to cart
function showToast(message) {
    const toast = document.querySelector("#toast-msg");
    toast.textContent = message;
    //toast.className = "show"; // TO DO: dont forget to make the CSS for this
    let toastTimeout = setTimeout(() => {
        toast.style.display = "none"; 
    }, 3000);
}

function openSingleProductView() {
    //DOMContentLoaded required for event listener for clicking thumbnail or title
}

function whichSort(sortToDo, products){
    //switch case sortToDo
    switch (sortToDo) {
        case "AtoZ":
            console.log("whichSort AtoZ");
            break;
        case "price":
            console.log("whichSort price");
            break;
        case "category":
            console.log("whichSort category");
            break;
    }
}


//four filter groups: name, category, rating, and price
function filterProducts(products, whichFilter) {
    if () {

    } else {
        //default to product name filter if nothing else
    }
}

function updateShownFilters(){

}

function clearAllFilters() {

}

function countResults(products) {
    if (products.length == 0) {
        //console.log("no matches")
        // not alert or toast message but something else on screen
    }
}

// DOMContentLoaded for event listener with event delegation for removing specific singular filters