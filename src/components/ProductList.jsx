import { useEffect, useState } from 'react'; // Thêm useState
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';

function ProductList({ filterType, name = '' }) {
    const { products, fetchProductsOnce } = useProducts();

    const [visibleCount, setVisibleCount] = useState(12);

    useEffect(() => {
        fetchProductsOnce();
    }, [fetchProductsOnce]);

    let filterProduct;
    if (name === '') filterProduct = filterType ? products.filter((p) => p.categoryProduct === filterType) : products;
    else filterProduct = products.filter((p) => p.nameProduct.toLowerCase().includes(name.toLowerCase()));
    const displayProducts = filterProduct.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 12); // Hiện thêm 2 hàng nữa
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="grid grid-cols-6 px-[130px] w-full">
                {displayProducts && displayProducts.length > 0 ? (
                    displayProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.nameProduct}
                            description={product.descriptionProduct}
                            type={product.categoryProduct}
                            subType={product.subCategoryProduct}
                            cost={product.priceProduct}
                            quantity={product.quantity}
                            img={product.imageLink}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center py-10">Đang tải . . . </p>
                )}
            </div>

            {filterProduct.length > visibleCount && (
                <button
                    onClick={handleLoadMore}
                    className="mt-8 px-8 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                >
                    Xem tiếp
                </button>
            )}
        </div>
    );
}

export default ProductList;
