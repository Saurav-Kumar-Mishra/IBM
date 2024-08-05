const User = require("../models/user");
const Product = require("../models/product");
const { BadRequestError } = require("../utils/errors");

exports.getCart = async (req, res) => {
    const { user } = req;

    const products = await Promise.all(
        user.cart.map(async cartItem => {
            cartItem.product = await Product.findById(cartItem.product);
            return cartItem;
        })
    );

    res.status(200).json({ products });
}

exports.addToCart = async (req, res) => {
    let { product: productId, count } = req.body;

    if (!productId || !count || count <= 0) {
        return res.status(400).json({ message: "Invalid product ID or count" });
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new BadRequestError("Invalid Product ID");
    }

    if (product.quantity < count) {
        throw new BadRequestError("Product quantity is less than item count");
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        throw new BadRequestError("User not found");
    }

    const existingCartItem = user.cart.find(item => item.product.toString() === productId);
    if (existingCartItem) {
        existingCartItem.quantity = Math.min(count+existingCartItem.quantity, product.quantity);
    } else {
        user.cart.push({ product: productId, quantity: count });
    }

    await user.save();

    res.status(201).json({ message: "Item added to cart" });
};

exports.updateCartItem = async (req, res) => {
    const { product: productId, count } = req.body;

    const product = await Product.findById(productId);

    if (!product)
        throw new BadRequestError("Invalid Product Id");

    if (req.user.cart.every(item => item.product.toString() !== productId))
        throw new BadRequestError("Product not in cart");

    if (product.quantity < count)
        throw new BadRequestError("Product quantity is less than item count");

    const user = await User.findById(req.user._id);

    if (count == 0) {
        user.cart = user.cart.filter(item => item.product.toString() !== productId);
    } else {
        user.cart = user.cart.map(item => {
            if (item.product.toString() === productId) {
                item.quantity = count;
            }
            return item;
        });
    }

    await user.save();
    res.status(200).json({ message: "Cart updated successfully" });
}

exports.updateCartItem = async (req, res) => {
    let { product: productId, count } = req.body;
    console.log(count,productId);
    if (typeof count !== 'number' || count < 0) {
        return res.status(400).json({ message: "Invalid item count" });
    }

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(400).json({ message: "Invalid Product Id" });
    }

    const user = req.user;

    const cartItem = user.cart.find(item => item.product.toString() === productId);
    if (!cartItem) {
        return res.status(400).json({ message: "Product not in cart" });
    }

    if (product.quantity < count) {
        return res.status(400).json({ message: "Product quantity is less than item count" });
    }

    if (count === 0) {
        user.cart = user.cart.filter(item => item.product.toString() !== productId);
    } else {
        user.cart = user.cart.map(item => {
            if (item.product.toString() === productId) {
                item.quantity = count;
                console.log("update", count)
            }
            return item;
        });
    }

    await user.save();
    res.status(200).json({ message: "Cart updated successfully" });
};
