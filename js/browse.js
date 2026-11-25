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

    if (products.length == 0) {
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

function openSingleProductView() { // not done
    //DOMContentLoaded required for event listener for clicking thumbnail or title
}

function whichSort(sortToDo, products){
    // make shallow copy, since sort mutates the array
    const productsCopy = [...products];

    //sort((next,curr)), if negative then next comes before curr, if positive then curr comes before next, if 0 then no change
    switch (sortToDo) {
        case "price":
            productsCopy.sort((a, b) => a.price - b.price);
            break;
        case "category":
            productsCopy.sort((a, b) => {
                if (a.category.toLowerCase() < b.category.toLowerCase()) {
                    return -1;
                }
                if (a.category.toLowerCase() > b.category.toLowerCase()) {
                    return 1;
                }
                return 0;
            });
            break;
        case "AtoZ":
        default:
            productsCopy.sort((a, b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                }
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                }
                return 0;
            });
            break;
    }
    return productsCopy;
}


//four filter groups: name, category, rating, and price
function filterByName(products, name) {
    return products.filter(product =>
        product.title.toLowerCase().includes(name.toLowerCase())
    );
}
function filterByCategory(products, selectedCategories) {
    if (selectedCategories.length == 0) {
        return products;
    }

    return products.filter(product =>
        selectedCategories.includes(product.category)
    );
}
function filterByRating(products, minRating) {
    return products.filter(product =>
        product.rating >= minRating
    );
}
function filterByPrice(products, price, overOrUnder) {
    if (overOrUnder === "over") {
        return products.filter(product =>
            product.price >= price
        );
    } else {
        return products.filter(product =>
            product.price <= price
        );
    }
}

function applyFilters(products, categories, minPrice, maxPrice, name, sortToDo) {
    let results = [...products];

    results = filterByCategory(results, categories);
    results = filterByPrice(results, minPrice, "over");
    results = filterByPrice(results, maxPrice, "under");
    results = filterByName(results, name);
    results = filterByRating(results, minRating);
    results = whichSort(sortToDo, results);

    displayProducts(results);
}

function updateShownFilters() { // not done

}

function clearAllFilters() { // not done

}

function removeFilter(filterType, filterValue) { // not done

}

function countResults(products) {
    if (products.length == 0) {
        //console.log("no matches")
        // not alert or toast message but something else on screen
    }
}

// DOMContentLoaded for event listener with event delegation for removing specific singular filters