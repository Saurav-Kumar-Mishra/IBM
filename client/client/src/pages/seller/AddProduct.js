import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddProductMutation, useGetCategoriesQuery } from '../../api/store';
import { useSelector } from 'react-redux';

export default function AddProduct() {
    const [addProduct] = useAddProductMutation();
    const { data, isLoading: categoriesLoading } = useGetCategoriesQuery();
    const user = useSelector(state => state.user);

    const categories = data?.categories || [];

    const [subCategories, setSubCategories] = useState([]);
    const [subSubCategories, setSubSubCategories] = useState([]);

    const formik = useFormik({
        initialValues: {
            category: '',
            subCategory: '',
            subSubCategory: '',
            title: '',
            description: '',
            retailPrice: '',
            discountedPrice: '',
            images: [],
            quantity: '',
        },
        validationSchema: Yup.object({
            category: Yup.string().required('Category is required'),
            subCategory: Yup.string().required('Subcategory is required'),
            subSubCategory: Yup.string().required('Subsubcategory is required'),
            title: Yup.string().min(5, 'Must be at least 5 characters').max(100, 'Must be 100 characters or less').required('Title is required'),
            description: Yup.string().min(50, 'Must be at least 50 characters').max(500, 'Must be 500 characters or less').required('Description is required'),
            retailPrice: Yup.number().positive('Must be a positive number').required('Retail Price is required'),
            discountedPrice: Yup.number().positive('Must be a positive number'),
            images: Yup.array().of(Yup.mixed().required('Image is required')).max(10, 'You can upload up to 10 images'),
            quantity: Yup.number().integer('Must be an integer').positive('Must be a positive number').required('Quantity is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const productData = {
                    ...values,
                    sellerId: user._id,
                    category: values.subSubCategory
                };
                await addProduct(productData).unwrap();
                resetForm();
            } catch (error) {
                console.error('Failed to add product: ', error);
            }
        }
    });

    useEffect(() => {
        if (formik.values.category) {
            const selectedCategory = categories.find(cat => cat._id === formik.values.category);
            setSubCategories(selectedCategory ? selectedCategory.subcategories : []);
            setSubSubCategories([]);
        } else {
            setSubCategories([]);
            setSubSubCategories([]);
        }
    }, [formik.values.category, categories]);

    useEffect(() => {
        if (formik.values.subCategory) {
            const selectedSubCategory = subCategories.find(subCat => subCat._id === formik.values.subCategory);
            setSubSubCategories(selectedSubCategory ? selectedSubCategory.subcategories : []);
        } else {
            setSubSubCategories([]);
        }
    }, [formik.values.subCategory, subCategories]);

    if (categoriesLoading) {
        return <p>Loading categories...</p>;
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 10) {
            alert('You can upload up to 10 images.');
            return;
        }
        formik.setFieldValue('images', files);
    };

    return (
        <div className=' w-full max-w-4xl mx-auto bg-gray-200 p-2 rouded-lg '>

            <form onSubmit={formik.handleSubmit} className="p-4 flex flex-col gap-4 min-w-96">
                <p className="text-2xl font-bold">Add Product</p>
                <div className="flex flex-col gap-2">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                    >
                        <option value="" label="Select category" />
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.category && formik.errors.category ? (
                        <div className="text-red-600">{formik.errors.category}</div>
                    ) : null}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="subCategory">Subcategory</label>
                    <select
                        id="subCategory"
                        name="subCategory"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.subCategory}
                        disabled={!subCategories.length}
                    >
                        <option value="" label="Select subcategory" />
                        {subCategories.map(subCategory => (
                            <option key={subCategory._id} value={subCategory._id}>
                                {subCategory.name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.subCategory && formik.errors.subCategory ? (
                        <div className="text-red-600">{formik.errors.subCategory}</div>
                    ) : null}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="subSubCategory">Subsubcategory</label>
                    <select
                        id="subSubCategory"
                        name="subSubCategory"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.subSubCategory}
                        disabled={!subSubCategories.length}
                    >
                        <option value="" label="Select subsubcategory" />
                        {subSubCategories.map(subSubCategory => (
                            <option key={subSubCategory._id} value={subSubCategory._id}>
                                {subSubCategory.name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.subSubCategory && formik.errors.subSubCategory ? (
                        <div className="text-red-600">{formik.errors.subSubCategory}</div>
                    ) : null}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        className="w-full h-10 p-2 border border-gray-300 rounded-md"
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="text-red-600">{formik.errors.title}</div>
                    ) : null}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                        className="w-full h-20 p-2 border border-gray-300 rounded-md"
                    />
                    {formik.touched.description && formik.errors.description ? (
                        <div className="text-red-600">{formik.errors.description}</div>
                    ) : null}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="retailPrice">Retail Price</label>
                    <input
                        id="retailPrice"
                        name="retailPrice"
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.retailPrice}
                        className="w-full h-10 p-2 border border-gray-300 rounded-md"
                    />
                    {formik.touched.retailPrice && formik.errors.retailPrice ? (
                        <div className="text-red-600">{formik.errors.retailPrice}</div>
                    ) : null}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="discountedPrice">Discounted Price</label>
                    <input
                        id="discountedPrice"
                        name="discountedPrice"
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.discountedPrice}
                        className="w-full h-10 p-2 border border-gray-300 rounded-md"
                    />
                    {formik.touched.discountedPrice && formik.errors.discountedPrice ? (
                        <div className="text-red-600">{formik.errors.discountedPrice}</div>
                    ) : null}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="images">Images</label>
                    <input
                        id="images"
                        name="images"
                        type="file"
                        onChange={handleImageChange}
                        multiple
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                    {formik.touched.images && formik.errors.images ? (
                        <div className="text-red-600">{formik.errors.images}</div>
                    ) : null}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        id="quantity"
                        name="quantity"
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.quantity}
                        className="w-full h-10 p-2 border border-gray-300 rounded-md"
                    />
                    {formik.touched.quantity && formik.errors.quantity ? (
                        <div className="text-red-600">{formik.errors.quantity}</div>
                    ) : null}
                </div>

                <button type="submit" className="bg-blue-600 text-white rounded-md h-10 flex items-center justify-center">
                    Submit
                </button>
            </form>
        </div>
    );
}
