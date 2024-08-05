import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../slices/shop";
import { useState } from "react";
import { useNavigate } from "react-router";
import Profile from "./Profile";
import { useLogoutMutation } from "../api/auth";
import { removeUser } from "../slices/user";

export default function TopNav() {

    const [search, setSearchValue] = useState("");
    const initial = useSelector(state => state.shop.search);
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        if (e.key === "Enter" || e.keyCode === 13) {
            if (search !== initial) dispatch(setSearch(search));
        }
    }

    const navigate = useNavigate();

    function handleUserIconClick() {
        if (!user) navigate("/auth");
    }

    const [logout] = useLogoutMutation();

    const handleLogout = () => {
        setShowLogoutPrompt(false);
        logout();
        dispatch(removeUser());
    }

    const [showLogoutPrompt, setShowLogoutPrompt] = useState(false);

    return (
        <div className="bg-green-400 h-14 p-2 gap-2 px-4 flex justify-center">

            <div className="max-w-6xl h-10 w-full flex justify-between items-center gap-6">

                <h1 className="text-2xl font-bold px-1">ApnaStore</h1>

                <div className="w-full shrink flex flex-row-reverse">
                    <input
                        className="p-1 px-2 max-w-xl w-full shrink-0 bg-white bg-opacity-75 focus:outline-none"
                        type="text"
                        placeholder="Search here"
                        value={search}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handleSubmit}
                    />
                </div>
                <div className="flex gap-2 items-center relative group hover:cursor-pointer">

                    
                    <FaUserCircle className={`text-2xl text-stone-600 ${user ? "text-blue-600" : "text-stone-600"}`}
                        onClick={handleUserIconClick}
                    />
                    {
                        user &&
                        <div className="absolute top-full  pt-2 z-40 w-max right-0 hidden group-hover:block">
                            <ul className="bg-white p-1 z-40 w-full ">
                                <p className="font-bold text-sm">Hey {user.user.name.firstName}</p>
                                <li className="hover:cursor-pointer text-sm font-semibold hover:bg-gray-200 p-0.5"
                                    onClick={() => navigate("/cart")}
                                >Cart</li>
                                {
                                    user.user.sellerProfile &&
                                    <li className="hover:cursor-pointer text-sm font-semibold hover:bg-gray-200 p-0.5"
                                        onClick={()=>navigate("/seller/dashboard")}
                                    >
                                        Seller Dashboard</li>
                                }
                                <li onClick={() => setShowLogoutPrompt(true)} className="hover:cursor-pointer text-sm font-semibold hover:bg-gray-200 p-0.5">
                                    Log Out
                                </li>
                            </ul>
                        </div>
                    }
                </div>
                {
                    showLogoutPrompt &&
                    <div className="fixed z-[90] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-96 aspect-video p-6 rounded-lg border-2 bg-gray-200 border-gray-500 h-60">
                        <p className="font-bold text-xl mb-4">Are you sure you want to logout??</p>
                        <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            onClick={handleLogout}
                        >
                            Yes
                        </button>
                        <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            onClick={() => setShowLogoutPrompt(false)}
                        >
                            No
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}