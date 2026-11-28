import { browseByCategory } from "./browse.js";
import { openHomePage } from "./main.js";

// add category filters from the products data
function getCategories(products) {
    let categories = [];

    for (let product of products) {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }
    }
    
    return categories;
}

// helper for browse.js to list the categories
export function loadCategories(products) {
    const container = document.querySelector("#category-filters");
    const categories = getCategories(products);
    container.className = "flex flex-col gap-2";

    for (let category of categories) {
        // name for categories
        const label = document.createElement("label");
        label.className = "flex items-center gap-2 cursor-pointer hover:bg-gray-500/25 rounded-lg transition-colors duration-200 pl-1";

        // the actual checkboxes
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = category;
        checkbox.value = category;
        checkbox.className = "category-checkbox";
        const categoryName = document.createElement("span");
        categoryName.textContent = category;
        categoryName.className = "capitalize";

        label.appendChild(checkbox);
        label.appendChild(categoryName);
        container.appendChild(label);
    }
}

// hero image and title for the category page
function displayCategoryHero() {
    const hero = document.querySelector("#category-hero");
    const h1 = hero.querySelector("h1");

    hero.className = "bg-[url('./imgs/campus2.png')] bg-cover bg-center bg-no-repeat h-96 rounded-lg " + "flex flex-col items-center justify-center " + "text-white text-center gap-4";
    h1.className = "text-4xl font-bold [text-shadow:3px_3px_6px_black]";
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
    } else {
        img.src = products[67].thumbnail;
        img.alt = "Missing Category, replaced by Home Page button";
        title.textContent = "Home Page";
    }

    // i used ChatGPT for getting relevant Tailwind CSS classes to use for overlaying text on top of the thumbnails
    li.className = "relative overflow-hidden rounded-lg cursor-pointer border border-gray-200 rounded-xl hover:bg-gray-500/25 transition-colors duration-200";
    img.className = "w-full h-64 object-contain";
    title.className = "absolute inset-0 flex items-center " + "justify-center text-2xl font-bold " + "text-white capitalize [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)]";
    if (category != null) {    
        li.addEventListener("click", () => { // clicking a category will open Browse with that category already selected as its filter
            browseByCategory(products, category);
        });
    } else {
        li.addEventListener("click", () => {
            openHomePage();
        });
    }

    li.appendChild(img);
    li.appendChild(title);
    ul.appendChild(li);
} 
// border border-gray-200 rounded-xl
// .className = "rounded-lg p-2 hover:bg-gray-500/25 transition-colors duration-200"

// to be used in DOMContentLoaded
export function handleCategoryInit(products) {
    const categories = getCategories(products);
    displayCategoryHero();

    /*while (categories.length % 4 !== 0) {
        categories.push(null);
    } // add on to this, but works for now
    */
    categories.push(null);

    for (let category of categories) {
        setCategoryThumbnail(category, products);
    }
}



