import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSortOrder } from "../slices/shop";

export default function SortOptions() {
    const [sortOrder, _setSortOrder] = useState("");
    const dispatch = useDispatch();

    const handleSortChange = (e) => {
        const order = e.target.value;
        _setSortOrder(order);
        dispatch(setSortOrder(order));
    };

    return (
        <div className="p-2 border-b border-b-stone-800 font-bold">
            Sort by
            <div className="flex flex-col">
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="sortOrder"
                        value="low-to-high"
                        checked={sortOrder === "low-to-high"}
                        onChange={handleSortChange}
                        className="mr-2"
                    />
                    Price Low to High
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="sortOrder"
                        value="high-to-low"
                        checked={sortOrder === "high-to-low"}
                        onChange={handleSortChange}
                        className="mr-2"
                    />
                    Price High to Low
                </label>

            </div>
        </div>
    );
}
