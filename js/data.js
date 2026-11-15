import productData from "../data/data-minifed.json" with { type: "json" };

export function getProducts() {
    return productData.products;
}