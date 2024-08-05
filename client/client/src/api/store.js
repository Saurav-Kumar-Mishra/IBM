import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
    prepareHeaders: (headers, { getState }) => {

        const user = getState().user;
        if (user) {
            const token = getState().user.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
        }

        return headers;
    },
});

const storeApi = createApi({
    reducerPath: "store",
    baseQuery,
    endpoints: builder => ({
        getCategories: builder.query({
            query: () => "categories"
        }),

        products: builder.query({
            query: (params) => ({
                url: "products",
                params
            })
        }),

        view: builder.query({
            query: (id) => `product/${id}`
        }),

        addProduct: builder.mutation({
            query: (product) => ({
                url: '/seller/addProduct',
                method: 'POST',
                body: product,
            }),
        }),

        sellerProducts: builder.query({
            query: () => ({
                url: "seller/",
            })
        }),
    })
})

export default storeApi

export const { useGetCategoriesQuery, useProductsQuery, useViewQuery, useAddProductMutation, useSellerProductsQuery } = storeApi;