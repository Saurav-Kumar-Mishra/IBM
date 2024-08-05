import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearFilters } from "../slices/shop";

export default function LandingPage() {
    const { category, search } = useSelector(state => state.shop);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearFilters());
    }, [dispatch]);

    useEffect(() => {
        if (category || search) {
            navigate("/products");
        }
    }, [category, search, navigate]);

    return (
        <>LandingPage</>
    );
}
