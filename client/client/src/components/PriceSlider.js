import PriceSlider from "multi-range-slider-react";
import "../css/multiRangeSlide.css";
import { useEffect, useState, useCallback } from "react";
import { setPriceRange, clearPriceRange } from "../slices/shop";
import { useDispatch, useSelector } from "react-redux";

export default function _PriceSlider({ min, max, step }) {
    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(max);

    const dispatch = useDispatch();

    const handleInput = useCallback((e) => {
        const { minValue, maxValue } = e;
        if (minValue !== min || maxValue !== max) {
            setMinValue(minValue);
            setMaxValue(maxValue);
            dispatch(setPriceRange({ min: minValue, max: maxValue }));
        }
    }, [dispatch, min, max]);

    useEffect(() => {
        setMinValue(min);
        setMaxValue(max);
        dispatch(clearPriceRange());
    }, [min, max, dispatch]);

    return (
        <div className="p-2 border-b border-b-stone-800 font-bold">
            Price Range
            <div className="text-sm font-normal">
                <PriceSlider
                    min={min}
                    max={max}
                    step={step}
                    stepOnly
                    minValue={minValue}
                    maxValue={maxValue}
                    onInput={handleInput}
                />
            </div>
        </div>
    );
}
