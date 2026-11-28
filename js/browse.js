import { buildProductCard, toastTimedMessage, hideContainersButOne } from "./helpers.js";
import { loadCategories } from "./category.js";

export function handleBrowseInit(products) {
    loadCategories(products);
    clearAllFilters(products);

    document.querySelector("#apply-filters").addEventListener("click", () => {
        applyFilters(products);
    });
    document.querySelector("#clear-filters").addEventListener("click", () => {
        clearAllFilters(products);
    });
    document.querySelector("#sort-select").addEventListener("change", () => {
        applyFilters(products);
    });
}


function displayProducts(products) {
    const results_list = document.querySelector("#results-list");
    const no_matches = document.querySelector("#no-matches");

    results_list.replaceChildren(); // clear the results list

    if (products.length == 0) {
        no_matches.style.display = "block";
        return;
    }
    no_matches.style.display = "none";
    
    for (const product of products) {
        const card = buildProductCard(product);
        results_list.appendChild(card);
    }
}


// https://www.w3schools.com/jsref/prop_text_value.asp
// was looking for a to get input value instead of passing values into the function
function applyFilters(products) {
    const target_price = document.querySelector("#price-filter").value;
    const name = document.querySelector("#name-filter").value;
    const min_rating = document.querySelector("#rating-filter").value;
    const sort_to_do = document.querySelector("#sort-select").value;
    const over_or_under = document.querySelector("#over-under").value;
    
    let results = [...products];

    const checkedCategories = document.querySelectorAll(
        "#category-filters input:checked"
    );
    const selected_categories = [];
    for (const category of checkedCategories) {
        selected_categories.push(category.value);
    }

    results = filterByCategory(results, selected_categories);
    results = filterByPrice(results, target_price, over_or_under);
    results = filterByName(results, name);
    results = filterByRating(results, min_rating);
    results = whichSort(sort_to_do, results);

    if (results.length == 0) {
        toastTimedMessage("No matches found.");
    }
    
    displayProducts(results);
}


function whichSort(sort_to_do, products){
    // make shallow copy, since sort mutates the array
    const productsCopy = [...products];

    //sort((next,curr)), if negative then next comes before curr, if positive then curr comes before next, if 0 then no change
    switch (sort_to_do) {
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
function filterByCategory(products, selected_categories) {
    if (selected_categories.length == 0) {
        return products;
    }

    return products.filter(product =>
        selected_categories.includes(product.category)
    );
}
function filterByRating(products, min_rating) {
    return products.filter(product =>
        product.rating >= min_rating
    );
}
function filterByPrice(products, price, over_or_under) {
    if (price == "") {
        return products;
    }

    const target_price = Number(price);

    if (over_or_under == "over") {
        return products.filter(product =>
            product.price >= target_price
        );
    } else if (over_or_under == "under") {
        return products.filter(product =>
            product.price <= target_price
        );
    }
}


function clearAllFilters(products) {
    // reset the filter inputs to their default values
    document.querySelector("#name-filter").value = "";
    document.querySelector("#price-filter").value = "";
    document.querySelector("#rating-filter").value = "0";
    document.querySelector("#over-under").value = "Over";

    const categories = document.querySelectorAll("#category-filters input[type='checkbox']");
    for (const category of categories) {
        category.checked = false;
    }

    // update the displayed filters and products
    document.querySelector("#current-filters").replaceChildren();
    applyFilters(products);
}

export function browseByCategory(products, selected_category) {
    clearAllFilters(products);

    const categories = document.querySelectorAll(
        "#category-filters input[type='checkbox']"
    );

    for (const category of categories) {
        if (category.value == selected_category) {
            category.checked = true;
            break;
        }
    }

    applyFilters(products);

    const browse = document.querySelector("#browse");
    hideContainersButOne(browse);
}