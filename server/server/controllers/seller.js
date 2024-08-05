const Product = require("../models/product");
const mongoose = require("mongoose");
const Seller = require("../models/seller")


exports.getProducts = async (req, res) => {

    const seller = await Seller.findOne({userId: req.user._id});

    const products = await Product.find({ sellerId: seller._id })

    res.status(200).json({ products });
}


exports.addProduct = async (req, res) => {
    try {
        const {
            category,
            subCategory,
            subSubCategory,
            title,
            description,
            retailPrice,
            discountedPrice,
            quantity
        } = req.body;

        if (!category || !subCategory || !subSubCategory || !title || !description || !retailPrice || !quantity) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        if (!req.files || req.files.length > 10) {
            return res.status(400).json({ message: "Images must be an array with a maximum of 10 URLs" });
        }

        const images = req.images.map(file => file.path);
        console.log(images);

        const product = new Product({
            category: mongoose.Types.ObjectId(category),
            sellerId: req.user._id,
            title,
            description,
            retailPrice,
            discountedPrice: discountedPrice || null,
            images,
            quantity,
            sold: 0
        });

        await product.save();

        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: "An error occurred while adding the product" });
    }
};
