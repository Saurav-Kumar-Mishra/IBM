const csv = require("csv-parser");
const fs = require("fs");
const User = require("../models/user");
const Product = require("../models/product");
const Seller = require("../models/seller");
const Category = require("../models/category");

let sellerCount = 0;

const sellerMap = {};

async function getSeller(brand) {

    if (sellerMap[brand]) return sellerMap[brand];

    const newUser = await new User({
        name: {
            firstName: "DemoSeller",
        },
        email: `seller${++sellerCount}@mail.com`,
        password: "Seller123",
    }).save();

    const seller = await new Seller({
        userId: newUser._id,
        brand: brand,
        location: {
            street: "ABC",
            district: "Ghaziabad",
            state: "Uttar Pradesh",
            pincode: "201005"
        }
    }).save();

    newUser.sellerProfile = {
        status: "Active",
        sellerId: seller._id
    };
    await newUser.save();

    sellerMap[brand] = seller._id;
    return seller._id;
}

async function getCategory(tree) {



    let categories = await Promise.all(
        tree.map(async name => {
            const category = await Category.findOne({ name });

            if (category) return category;

            return new Category({ name });
        })
    );


    await categories[0].save();
    for (let i = 1; i < categories.length; i++) {
        categories[i].parent_id = categories[i-1]._id;

        await categories[i].save();
    }

    await categories[categories.length - 1].save();

    async function getRootCategory(category) {
        if (category.parent_id === null) return category

        const parent = await Category.findOne({ _id: category.parent_id });
        return getRootCategory(parent);
    }

    return categories[categories.length - 1]._id;
}

async function addProduct(product) {

    let categoryTree;
    let images;
    try {
        if (!product.product_name || product.product_name.length < 5 || product.product_name.length > 50) return;
        if (!product.description || product.description.length < 50 || product.description.length > 500) return;
        if (!product.retail_price || product.retail_price < 0) return;
        if (!product.brand) return;

        images = JSON.parse(product.image);
        if (images.length < 5) return;
        for (url of images) {
            const res = await fetch(url, { method: 'HEAD' });

            if(res.status!==200)
                throw new Error("");
        };


        if (product.discounted_price || product.discounted_price < 0 || product.discounted_price > product.retail_price)
            product.discounted_price = product.retail_price;

        categoryTree = JSON.parse(product.product_category_tree)[0].split(/>+/).slice(0, 3).map(categ => categ.trim());
        if (categoryTree.length < 3) return;
        if (categoryTree.some(name => name.length > 50)) return;

    } catch (err) {
        return;
    }

    let sellerId = await getSeller(product.brand);
    const category = await getCategory(categoryTree);

    const newProduct = {
        category,
        sellerId,
        title: product.product_name,
        description: product.description,
        retailPrice: product.retail_price,
        discountedPrice: product.discounted_price,
        quantity: Math.ceil(Math.random() * 50),
        images
    }

    if (!isNaN(product.product_rating)) newProduct.rating = product.product_rating;
    await new Product(newProduct).save();
}

const stream = fs.createReadStream("./seed/dataSet.csv")
    .pipe(csv());

stream.on("data", async (data) => {
    stream.pause();
    await addProduct(data);
    stream.resume();
});

stream.on("end", () => {
    console.log("Data Added");
});

stream.on("close", () => {
    console.log("Stream closed after adding 500 products");
});
