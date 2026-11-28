const productsKey = "products";
const productsURL = "https://dummyjson.com/products?limit=100";
let products = [];


function loadSavedProducts() {
    return JSON.parse(localStorage.getItem(productsKey));
}

// saves products so they dont get fetched again
function saveProducts() {
    localStorage.setItem(productsKey, JSON.stringify(products));
}

export function getProducts() {
    return products;
}

// gets the products from localStorage or fetches them once and saves them if they aren't saved yet
export async function loadProducts() {
    const savedProducts = loadSavedProducts();
    const loading = document.querySelector("#loading");

    if (savedProducts) {
        products = savedProducts;
        return products;                // saved so no fetch
    }

    loading.classList.remove("hidden");
    return fetch(productsURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(`Fetch failed: ${response.status} ${response.statusText}`);
            }
        })
        .then(data => {
            loading.classList.add("hidden");
            products = data.products;
            saveProducts();
            return products;
        })
        .catch(er => {
            loading.classList.add("hidden");
            console.log(`Error with fetching: ${er}`);
            throw er;
        });
}
