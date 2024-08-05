import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: undefined,
    subCategory: undefined,
    search: "",
    categoryTree: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    sortOrder: "",  // Initialize sortOrder
};

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
            state.subCategory = undefined;
        },

        setSubCategory: (state, action) => {
            state.subCategory = action.payload;
        },

        setSortOrder: (state, action) => {
            state.sortOrder = action.payload;
        },

        setPriceRange: (state, action) => {
            const { min, max } = action.payload;
            if (min > max) return;

            if (min !== state.minPrice)
                state.minPrice = min;

            if (max !== state.maxPrice)
                state.maxPrice = max;
        },

        clearPriceRange: (state) => {
            state.minPrice = state.maxPrice = undefined;
        },

        setCategoryTree: (state, action) => {
            state.categoryTree = action.payload;
        },

        setSearch: (state, action) => {
            state.search = action.payload;
        },

        clearFilters: () => initialState,  // Reset to initialState
    },
});

export default shopSlice.reducer;
export const {
    setCategory,
    setSearch,
    setSubCategory,
    setPriceRange,
    clearPriceRange,
    setCategoryTree,
    setSortOrder,
    clearFilters
} = shopSlice.actions;
