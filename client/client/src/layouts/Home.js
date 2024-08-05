import { Outlet, useNavigate } from "react-router";
import TopNav from "../components/TopNav";
import CategoryNav from "../components/CategoryNav"

export default function Home() {

    return (
        <div>
            <TopNav />

            <div className="max-w-7xl mx-auto mt-4">
                <CategoryNav/>
            </div>

            <div className="max-w-7xl mx-auto py-2">
                <Outlet/>
            </div>
        </div>

    )
}