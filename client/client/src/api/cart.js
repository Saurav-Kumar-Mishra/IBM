import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8080/cart/",
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

const cartApi = createApi({
    reducerPath: "cart",
    baseQuery,
    endpoints: builder => ({
        getCart: builder.query({
            query: () => ""
        }),

        postCartItem: builder.mutation({
            query: (product, count = 1) => ({
                url: "",
                method: "POST",
                body: { product, count }
            })
        }),

        updateCartItem: builder.mutation({
            query: ({product, count}) => {
                return {
                    url: "",
                    method: "PUT",
                    body: { product, count }
                }
            }
        })
    })
})

export default cartApi

export const { useGetCartQuery, usePostCartItemMutation, useUpdateCartItemMutation } = cartApi;