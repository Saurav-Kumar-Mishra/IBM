import { useSellerProductsQuery } from "../../api/store";

export default function Dashboard() {
    const { data, isLoading, error } = useSellerProductsQuery();

    if (isLoading) {
        return <p className="text-xl font-semibold text-gray-500">Loading products...</p>;
    }

    if (error) {
        return <p className="text-xl font-semibold text-red-600">Error loading products: {error.message}</p>;
    }

    console.log(data);

    return (
        <div className="p-6">
            <p className="text-3xl font-bold mb-6">Dashboard</p>

            {data?.products.length === 0 ? (
                <p className="text-xl font-semibold text-gray-500">No products found</p>
            ) : (
                <div className="space-y-4">
                    {data.products.map(product => (
                        <div key={product._id} className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
                            <img
                                src={product.images[0]} // Assuming the first image as the thumbnail
                                alt={product.title}
                                className="w-32 h-32 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold">{product.title}</h2>
                                <p className="text-gray-600">{product.description.slice(0, 100)}{product.description.length > 100 ? '...' : ''}</p>
                                <p className="text-lg font-medium mt-2">
                                    <span className="text-gray-600">Price:</span> ${product.retailPrice}
                                </p>
                                <p className="text-lg font-medium mt-1">
                                    <span className="text-gray-600">Quantity:</span> {product.quantity}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
