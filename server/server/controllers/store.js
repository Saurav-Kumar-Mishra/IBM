const Category = require("../models/category");
const Product = require("../models/product");
const { BadRequestError } = require("../utils/errors");

exports.getCategories = async (req, res) => {

    let categories = await populatedCategories();

    res.status(200).json({ message: "success", count: categories.length, categories })
}

exports.getProducts = async (req, res) => {
    let { category, search, page = 1, limit = 20, subCategory, minPrice, maxPrice, sortOrder } = req.query;

    if (!category && !search) {
        throw new BadRequestError("Both category and search parameters are missing");
    }

    if ((minPrice !== undefined && isNaN(minPrice)) || (maxPrice !== undefined && isNaN(maxPrice)) || (minPrice !== undefined && maxPrice !== undefined && Number(minPrice) > Number(maxPrice))) {
        throw new BadRequestError("Invalid price range");
    }

    if (minPrice !== undefined) minPrice = Number(minPrice);
    if (maxPrice !== undefined) maxPrice = Number(maxPrice);

    let categories;

    if (category) {
        category = await Category.findById(category).lean();

        if (!category)
            throw new BadRequestError("Invalid Category");

        categories = await getLeafCategories(category);
    }

    const queryObj = {};
    if (category) {
        if (subCategory) queryObj.category = subCategory;
        else queryObj.category = { $in: categories };
    }

    if (search) queryObj.title = new RegExp(search, 'i');
    if (minPrice || maxPrice) {
        queryObj.discountedPrice = {};

        if (minPrice)
            queryObj.discountedPrice.$gte = minPrice;

        if (maxPrice)
            queryObj.discountedPrice.$lte = maxPrice;
    }

    

    let query = Product.find(queryObj).select("-__v -description");

    const countDocs = await query.clone().countDocuments().exec();

    const totalPages = Math.ceil(countDocs / limit);

    if(sortOrder){
        if(sortOrder==="low-to-high")
            query = query.sort({discountedPrice: 1})
        else if(sortOrder==="high-to-low")
            query = query.sort({discountedPrice: -1})
    }

    const products = await query.skip((page - 1) * limit).limit(limit).lean();

    if (!category)
        categories = products.map(prod => prod.category);

    res.status(200).json({ products, categories, subCategories: categories, totalPages })

};

exports.viewProduct = async (req, res) => {

    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product)
        throw BadRequestError("Invalid Product Id");


    res.status(200).json({ product });
}

async function getLeafCategories(category) {
    const subCategories = await Category.find({ parent_id: category._id }).select("-v -parent_id");

    if (subCategories.length === 0) {
        return [category];
    }

    const leafCategoriesArray = await Promise.all(
        subCategories.map(async (subCategory) => {
            return await getLeafCategories(subCategory);
        })
    );

    const leafCategories = leafCategoriesArray.flat();
    return leafCategories;
}


async function getExpandedCategories(category) {

    const subCategories = await Category.find({ parent_id: category._id }).lean();


    category.subCategories = await Promise.all(
        subCategories.map(async subCategory => {
            return getExpandedCategories(subCategory);
        })
    )

    return category;
}

async function populatedCategories(parent_id = null) {

    let categories = await Category.find({ parent_id })
        .select("-__v -parent_id")
        .lean();

    categories = await Promise.all(
        categories.map(async categ => {
            categ.subcategories = await populatedCategories(categ._id);
            return categ;
        })
    );

    return categories;
}

