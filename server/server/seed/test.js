const Categories = require("../dataJson/ecommerce.categories.json");
const Products = require("../dataJson/ecommerce.products.json");
const fs = require("fs");

const categMap = {};

Categories.forEach((categ,i)=>{
    categMap[categ._id.$oid] = i;
});


Products.forEach((prod)=>updateRange(prod.category.$oid, prod.discountedPrice));

fs.writeFileSync("../dataJson/ecommerce.categories.json", JSON.stringify(Categories));


console.log("Updated");
function updateRange(categId, price){

    if(categId===null) return;

    const category = Categories[categMap[categId]];

    if(!category.priceRange)
        category.priceRange = {min: Infinity, max: 0};

    category.priceRange.min = Math.min(category.priceRange.min, price);
    category.priceRange.max = Math.max(category.priceRange.max, price);

    const parent_id = category.parent_id ? category.parent_id.$oid : null;
    updateRange(parent_id, price);
}


