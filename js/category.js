import { browseByCategory } from "./browse.js"

// ill implement this to add category filters from the products data
function getCategories(products) { // not done
    let categories = [];

    for (let product of products) {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }
    }
    
    return categories;
}

export function loadCategories(products) {
    const container = document.querySelector("#category-filters");
    const categories = getCategories(products);

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

// hero image and title for the category page
function displayCategoryHero(products) {
    const hero = document.querySelector("#category-hero");
    const h1 = hero.querySelector("h1");

    hero.className =
        "bg-[url('./imgs/campus2.png')] bg-cover bg-center bg-no-repeat h-96 rounded-lg " + "flex flex-col items-center justify-center " + "text-white text-center gap-4";

    h1.className = "text-4xl font-bold drop-shadow-lg";
}

// each category will have thumbnail taken from one of its products
function setCategoryThumbnail(category, products) {
    const ul = document.querySelector("#category-list");
    const li = document.createElement("li");
    const img = document.createElement("img");
    
    const title = document.createElement("h3");
    title.textContent = `${category}`;

    const product = products.find(product =>
        product.category == category
    );

    if (product) {
        img.src = product.thumbnail;
        img.alt = `Category thumbnail for: ${category}`;
    }

    li.className = "relative overflow-hidden rounded-lg cursor-pointer hover:bg-gray-200";
    img.className = "w-full h-64 object-cover";
    title.className = "absolute inset-0 flex items-center " + "justify-center text-2xl font-bold " + "text-white bg-black/40 capitalize";
    li.addEventListener("click", () => { // clicking a category will open Browse with that category already selected as its filter
        browseByCategory(products, category);
    });

    li.appendChild(img);
    li.appendChild(title);
    ul.appendChild(li);
}

export function handleCategoryInit(products) {
    const categories = getCategories(products);
    displayCategoryHero(products);

    /*while (categories.length % 3 !== 0) {
        categories.push(null);
    } // add on to this, but works for now
    */

    for (let category of categories) {
        setCategoryThumbnail(category, products);
    }
}



