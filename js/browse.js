/*
    1) filters products
    2) sorts products
    3) redraw the grid

function drawGrid(products) {
    const results = products.filter(p => {
        
    });
    products.sort( (a,b) => a - b); // change this later to product titles
};*/

function createCard() {
    // thumbnail
    // title
    // price
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