import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useProductsQuery } from '../api/store';
import { MdOutlineNavigateNext } from "react-icons/md"
import SortAndFilter from '../components/Sort&Filter';
import { useDispatch, useSelector } from 'react-redux';
import { setSubCategories, setPage, clearFilters } from "../slices/shop";
import { useNavigate } from 'react-router';

export default function Products() {

    const { category, subCategory, search, minPrice, maxPrice, sortOrder } = useSelector(state => state.shop);

    const navigate = useNavigate();
    if (!category) navigate("/");


    const [page, setPage] = useState(1);

    const { data, isLoading, err } = useProductsQuery({
        category, 
        subCategory, 
        search, 
        page, 
        limit: 20,
        minPrice,
        maxPrice,
        sortOrder
    });

    useEffect(() => {
        setPage(1);
    }, [subCategory])

    if (err) {
        return <p>isError</p>;
    }

    return (

        <div>
            <div className='flex gap-2 w-full'>

                <div className='relative w-60 shrink-0 '>

                    <div className='sticky bg-gray-100  top-3 w-60 mt-3  .'>
                        <SortAndFilter subCategories={data?.subCategories || null} />
                    </div>
                </div>

                <div className='flex w-full flex-col items-center'>

                    <div className="flex gap-5 flex-wrap  py-3">

                        {
                            (data?.products || Array.from({ length: 20 }, () => null)).map((product, index) => (


                                <Product product={product} key={`prod_${product?._id || index}`} />
                            ))}

                    </div>

                    <Pagination totalPages={data?.totalPages || null} page={page} setPage={setPage} />
                </div>

            </div>
        </div>
    );
}

function Product({ product, key }) {
    const [ref, inView] = useInView({
        triggerOnce: true,
    });
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/view/${product._id}`)
    }


    if (!product) {
        return null
    }

    return (
        <div
            ref={ref}
            onClick={handleClick}
            key={key}
            className={`p-2 w-60 bg-gray-200 rounded-md hover:scale-105 hover:cursor-pointer duration-100`}
        >
            {inView && (
                <div className={`bg-white h-60 w-full p-4 `}>
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className={`h-full mx-auto ${isImageLoaded ? "block" : "hidden"} `}
                        onLoad={() => setIsImageLoaded(true)}
                    />
                </div>
            )}

            <div className='p-2'>
                <p className="font-bold overflow-hidden">{product.title}</p>
                <p className='font-bold text-lg'>
                    {product.discountedPrice}

                    {
                        product.discountedPrice < product.retailPrice ?
                            <span className="text-gray-400 line-through ml-2">{product.retailPrice}</span> :
                            null
                    }
                </p>
            </div>
        </div>
    );
}


function Pagination({ totalPages, page, setPage }) {

    if (!totalPages)
        return null;

    const start = Math.max(1, page - 3);
    const end = Math.min(start + 2, totalPages);

    return (
        <div className='flex gap-4 max-w-60 w-fit mx-auto justify-between mt-10'>
            {
                Array.from({ length: end - start + 1 }, (_, i) => {

                    return (
                        <div className={`w-8 h-8 rounded-full font-semibold p-1 text-center hover:cursor-pointer
                            ${page == i + start ? "bg-yellow-500" : "bg-gray-400"}`}
                            onClick={() => setPage(i + start)}
                        >
                            {i + start}
                        </div>
                    )
                })
            }
        </div>
    )
}