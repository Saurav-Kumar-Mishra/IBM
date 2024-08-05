import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8080/auth/",
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

const authApi = createApi({
    reducerPath: "auth",
    baseQuery,
    endpoints: builder => ({
        login: builder.mutation({
            query: ({email, password})=>({
                url: "login",
                method: "POST",
                body: {email, password}
            })
        }),

        logout: builder.mutation({
            query: ()=>({
                url: "logout",
                method: "POST"
            })
        })
    })
})

export default authApi

export const {useLoginMutation, useLogoutMutation} = authApi;