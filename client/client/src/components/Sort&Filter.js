import { useDispatch, useSelector } from "react-redux";
import { setSubCategory } from "../slices/shop";
import { useState, useEffect } from "react";
import PriceSlider from "../components/PriceSlider";
import SortOptions from "./SortOptions";

export default function SortAndFilter({ subCategories }) {

    const { subCategory } = useSelector(state => state.shop)
    const dispatch = useDispatch();


    if (!subCategories) return null;

    let min, max;
    if (subCategory) {

        const _subCategory = subCategories.find(subcateg => subcateg._id === subCategory);

        min = Math.floor(_subCategory.priceRange.min / 100) * 100;
        max = Math.ceil(_subCategory.priceRange.max / 100) * 100;

    } else {

        min = Infinity; max = -Infinity;

        for (let subCateg of subCategories) {
            min = Math.min(subCateg.priceRange.min, min);
            max = Math.max(subCateg.priceRange.max, max);
        }

        min = Math.floor(min / 100) * 100;
        max = Math.ceil(max / 100) * 100;
    }


    return (
        <>
            <p className="font-bold text-xl text-center text-stone-700 p-1">Filters</p>

            {subCategories.length > 1 && (
                <div className="p-2 border-b border-b-stone-800 font-bold">
                    SubTypes
                    <ul className="max-h-60 overflow-y-auto thinScroll">
                        {subCategories.map((subCateg) => (
                            <li
                                key={subCateg._id}
                                className={`hover:text-blue-600 hover:cursor-pointer
                                ${subCateg._id == subCategory ? "font-semibold" : "font-normal"}`}
                                onClick={() => dispatch(setSubCategory(subCateg._id))}
                            >
                                {subCateg.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <PriceSlider min={min} max={max} step={100} />

            <div>
                <SortOptions/>
            </div>
        </>
    );
}
