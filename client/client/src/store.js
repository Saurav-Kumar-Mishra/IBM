import {configureStore} from "@reduxjs/toolkit";
import storeApi from "./api/store";
import shop from "./slices/shop"
import cartApi from "./api/cart"
import user from "./slices/user"
import authApi from "./api/auth"

const store = configureStore({
    reducer: {
        [storeApi.reducerPath]: storeApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        shop,
        user,
    },

    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(
            storeApi.middleware,
            cartApi.middleware,
            authApi.middleware,
        )
})

export default store;