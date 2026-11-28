// ill implement this to add category filters from the products data
export function loadCategories(products) { // not done
    const container = document.querySelector("#category-filters");

    let categories = [];

    for (let product of products) {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }
    }
    
    for (let category of categories) {
        // name for categories
        const label = document.createElement("label");
        label.textContent = category;
        label.htmlFor = category;
        container.appendChild(label);

        // the actual checkboxes
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = category;
        checkbox.value = category;
        checkbox.className = "category-checkbox";
        container.appendChild(checkbox);
    }
}
