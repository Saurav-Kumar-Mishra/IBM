import { useNavigate, useParams } from "react-router-dom";
import { useViewQuery } from "../api/store";
import { useState, useEffect, useRef } from 'react';
import { usePostCartItemMutation } from "../api/cart";
import { useSelector } from "react-redux";

export default function ViewProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, err } = useViewQuery(id);
    const [postCartItem] = usePostCartItemMutation();
    const user = useSelector(stat=>stat.user)

    if (isLoading) {
        return <p>Loading</p>;
    }

    if (err) {
        return <p>Error</p>;
    }

    const { title, description, retailPrice, discountedPrice, images, rating, _id } = data.product;
    
    const addToCart = async () => {
        await postCartItem(_id);
        if(user)
            navigate("/cart");
        else navigate("/auth")
    };

    return (
        <div className="max-w-5xl mt-5 flex mx-auto w-full min-h-96 gap-4">
            <div className="max-w-sm aspect-square bg-white border-gray-300 border-2 min-w-80">
                <ImageSlider images={images} />
            </div>

            <div className="flex flex-col">
                <p className="font-bold text-2xl">{title}</p>
                <p className="font-semibold text-gray-400">{rating ? rating : "No Rating Available"}</p>
                <p className='font-bold text-xl mt-4'>
                    {discountedPrice} ₹
                    {discountedPrice < retailPrice &&
                        <span className="text-gray-400 line-through ml-2">{retailPrice}</span>}
                </p>
                <p className="font-normal text-md min-h-40">{description}</p>
                <div className="flex gap-4 mt-5">
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Buy Now
                </button>
                <button type="button" class="text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                    onClick={addToCart}
                >
                    Add to Cart
                </button>
                </div>
            </div>
        </div>
    );
}

const ImageSlider = ({ images, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            ),
            interval
        );

        return () => {
            resetTimeout();
        };
    }, [currentIndex, images.length, interval]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative overflow-hidden w-full h-full">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <div key={index} className="flex-shrink-0 w-full h-full flex items-center justify-center bg-gray-100">
                        <img
                            src={image}
                            alt={`Slide ${index}`}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                ))}
            </div>
            <button
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                onClick={handlePrev}
            >
                Prev
            </button>
            <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                onClick={handleNext}
            >
                Next
            </button>
        </div>
    );
};

