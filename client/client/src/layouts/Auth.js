import { Outlet } from "react-router";

export default function Auth() {
    return (
        <div className="flex w-full h-screen flex-row-reverse">

            <div className="flex flex-col shrink-0 justify-center items-center w-1/2 max-w-md h-full p-8">

                <div className="bg-stone-100 rounded-md shadow-sm shadow-stone-400  overflow-hidden">
                    <div className="bg-green-500 h-6">

                    </div>
                    <Outlet/>
                </div>

            </div>


            <img src={`${process.env.PUBLIC_URL}/authBg.jpg`}
                alt="Authentication Background"
                className="w-full h-full object-cover shrink" />

        </div>
    );
}
