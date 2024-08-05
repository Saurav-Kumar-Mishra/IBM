import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCartQuery, useUpdateCartItemMutation } from "../api/cart";
import { useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Cart() {
    const navigate = useNavigate();
    const { data, isLoading, error, refetch } = useGetCartQuery();
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading cart</p>;
    }

    const totalAmount = data.products.reduce((amount, item) => {
        return amount + item.product.discountedPrice * item.quantity;
    }, 0);

    return (
        <div className="max-w-5xl mx-auto mt-5 bg-gray-100 rounded-md min-h-40 py-2 px-6">
            <p className="text-3xl font-bold">Cart</p>

            {
                data.products.length === 0 &&
                <p className="text-2xl font-bold p-4 mx-auto text-red-700">
                    There is no Item in Your Cart, Please add atleast one item first!!
                </p>
            }


            {data.products.map(prod => (
                <CartItem item={prod} key={prod.product._id} refresh={refetch} />
            ))}
            {
                data.products.length > 0 &&
                <div className="border-t border-black flex flex-col gap-4 mt-8 p-2">
                    <p className="font-bold text-xl text-gray-600">Cart Summary</p>
                    <div className="flex justify-between">
                        <p className="font-bold text-xl">Total Amount: {totalAmount}₹</p>
                        <button
                            type="button"
                            className="text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                        >
                            Check Out
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

function CartItem({ item, refresh }) {
    const [update] = useUpdateCartItemMutation();

    if (!item) return null;

    const { product, quantity } = item;

    const handleDelete = () => {
        update({ product: product._id, count: 0 }).then(() => refresh());
    };

    const reduceItem = () => {
        if (quantity > 1) {
            update({ product: product._id, count: quantity - 1 }).then(() => refresh());
        } else {
            handleDelete();
        }
    };

    const increaseItem = () => {
        if (product.quantity > quantity) {
            update({ product: product._id, count: quantity + 1 }).then(() => refresh());
        }
    };

    return (
        <div className="flex justify-between bg-white m-2 p-4">
            <div className="flex gap-4">
                <img src={product.images[0]} alt={product.title} className="h-32 w-32 object-cover" />
                <div>
                    <p className="font-bold text-lg">{product.title}</p>
                    <p className="font-semibold">Qty: {quantity}</p>
                    <p className="font-semibold">{product.discountedPrice}₹</p>
                </div>
            </div>
            <div className="flex gap-2 text-gray-500">
                {quantity > 1 && (
                    <FaMinus className="hover:cursor-pointer hover:text-gray-800" onClick={reduceItem} />
                )}
                {product.quantity > quantity && (
                    <FaPlus className="hover:cursor-pointer hover:text-gray-800" onClick={increaseItem} />
                )}
                <MdDelete className="hover:cursor-pointer hover:text-gray-800" onClick={handleDelete} />
            </div>
        </div>
    );
}
