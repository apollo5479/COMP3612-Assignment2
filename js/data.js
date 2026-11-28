//import productData from "../data/data-minifed.json" with { type: "json" };

export async function getProducts() {
    const savedProducts = localStorage.getItem("products");
    const loading = document.querySelector("#loading");

    if (savedProducts) {
        return JSON.parse(savedProducts);
    }

    loading.classList.remove("hidden");
    return fetch("https://dummyjson.com/products?limit=100")
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => {
            localStorage.setItem("products", JSON.stringify(data.products));
            return data.products;
        })
        .catch(er => {
            console.log(`Error with fetching: ${er}`);
            throw er;
        })
        .finally(() => {
            loading.classList.add("hidden");
        });
}