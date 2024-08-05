import { NavLink, Outlet } from "react-router-dom";

export default function Seller() {
    return (
        <div className="w-full h-screen flex">
            <div className="w-80 h-screen bg-stone-800 text-white py-4 flex flex-col">
                <div>
                    <h1 className="font-bold text-white text-xl text-center">Apna Store</h1>
                    <p className="font-semibold text-sm text-center">Seller Dashboard</p>
                </div>

                <div className="mt-5 flex flex-col items-start w-full grow">
                    <NavLink
                        to="/seller/dashboard"
                        className={({ isActive }) =>
                            `px-4 p-2 font-bold text-lg w-full text-left ${isActive ? 'bg-gray-200 text-black' : 'hover:bg-gray-200 hover:text-black'}`
                        }
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/seller/addProduct"
                        className={({ isActive }) =>
                            `px-4 p-2 font-bold text-lg w-full text-left ${isActive ? 'bg-gray-200 text-black' : 'hover:bg-gray-200 hover:text-black'}`
                        }
                    >
                        Add Product
                    </NavLink>
                </div>
            </div>
            <div className="w-full h-screen overflow-y-auto p-4">
                <Outlet />
            </div>
        </div>
    );
}
