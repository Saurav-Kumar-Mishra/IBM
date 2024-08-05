import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../slices/shop";
import { useNavigate } from "react-router";
import { useGetCategoriesQuery } from "../api/store";

export default function CategoryNav() {
    const { data, error, isLoading } = useGetCategoriesQuery();

    const [listCategories, setListCategories] = useState([]);
    
    const container = useRef(null);
    const categList = useRef(null);

    useEffect(() => {
        if (data?.categories) {
            setListCategories(data.categories);
        }
    }, [data]);

    useEffect(() => {
        const adjustCategories = () => {
            if (container.current && categList.current) {
                if (container.current.offsetWidth < categList.current.offsetWidth && listCategories.length > 0) {
                    setListCategories(prev => {
                        const newCategories = [...prev];
                        newCategories.pop();
                        return newCategories;
                    });
                }
            }
        };

        adjustCategories();
        window.addEventListener("resize", adjustCategories);
        return () => window.removeEventListener("resize", adjustCategories);
    }, [listCategories]);


    if (error) {
        return <p>Error: {error.message}</p>;
    }

    console.log(data);

    return (
        <div className="w-full bg-stone-600 h-9 relative transition-all z-20" ref={container}>
            {
                !isLoading &&
                <ul className="h-9 flex justify-between gap-1 w-fit min-w-full px-1 items-end text-white font-semibold" ref={categList}>

                    {
                        listCategories.map((categ) => (
                            <Category category={categ} key={categ._id} />
                        ))

                    }

                    <AllCategories categories={data.categories} />

                </ul>
            }
        </div>
    );
}

function Category({ category }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (id) => {
        dispatch(setCategory(id));
        navigate("/products")
    };

    return (
        <li className="inline-block p-1 relative whitespace-nowrap group hover:cursor-pointer">
            <p onClick={() => handleClick(category._id)} className="hover:text-blue-200">
                {category.name}
            </p>
            <ul className="hidden group-hover:flex absolute left-0 top-full bg-gray-100 text-black gap-1 flex-col min-w-full">
                {category.subcategories.map((subCateg) => (
                    <li className="px-2 hover:bg-gray-300"
                        onClick={() => handleClick(subCateg._id)}
                        key={subCateg._id}>
                        {subCateg.name}
                    </li>
                ))}
            </ul>
        </li>
    );
}

function AllCategories({ categories }) {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handleClick = (id) => {
        dispatch(setCategory(id));
        navigate("/products")
    };

    return (
        <li className="group inline-block whitespace-nowrap p-1">
            All Categories
            <div className="group-hover:flex flex-col flex-wrap absolute bg-gray-100 text-black left-0 right-0 gap-1 top-full
                max-h-96 items-start hidden shadow-md shadow-stone-800">
                {categories.map((categ) => (
                    <span className="p-1 px-2 font-bold" key={categ._id}>
                        <p className="hover:cursor-pointer hover:text-blue-600"
                            onClick={() => handleClick(categ._id)}>
                            {categ.name}
                        </p>
                        <ul className="font-medium text-sm max-h-72 overflow-y-auto thinScroll">
                            {categ.subcategories.map((subCateg) => (
                                <li className="hover:cursor-pointer hover:text-blue-600"
                                    onClick={() => handleClick(subCateg._id)}
                                    key={subCateg._id}>
                                    {subCateg.name}
                                </li>
                            ))}
                        </ul>
                    </span>
                ))}
            </div>
        </li>
    );
}
