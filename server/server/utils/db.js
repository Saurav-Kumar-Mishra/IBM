const mongoose = require("mongoose");
require('dotenv').config();

require("../models/category");
require("../models/order");
require("../models/product");
require("../models/seller");
require("../models/token");
require("../models/user");

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce";


const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connection attempt initiated");

        const db = mongoose.connection;

        // await db.dropDatabase();
        // require("../seed/index");

        db.once('open', async () => {
            console.log("MongoDB connected successfully");
        });

        db.on('error', (err) => {
            console.error("MongoDB connection error:", err);
        });

        db.on('disconnected', () => {
            console.warn("MongoDB disconnected");
        });

        db.on('reconnected', () => {
            console.log("MongoDB reconnected");
        });

    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

connectDB();

const Category = require("../models/category");
const Product = require("../models/product");

async function updateDB() {

    const roots = await Category.find({ parent_id: null });

    for (let root of roots) {
        const deleted = await update(root);

        if (deleted === root.productsCount) {
            await Category.findByIdAndDelete(root._id);
        }
    }

    async function update(category) {

        const subCategories = await Category.find({ parent_id: category._id });

        let deleted = 0;
        if (subCategories.length > 0) {

            for (let subCategory of subCategories) {
                deleted += await update(subCategory);
            }

            category.productsCount -= deleted;

            if (category.productsCount === 0) {
                await Category.findByIdAndDelete(category._id);
            }

            return deleted;
        } else {

            if (category.productsCount > 4) {
                return 0;
            }

            await Product.deleteMany({ category: category._id });
            deleted = category.productsCount;

            await Category.findByIdAndDelete(category._id);
            return deleted;
        }
    }
}

// updateDB().catch(console.error);


// updateDB().then(()=>console.log("Update Done"))