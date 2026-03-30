import { createContext, useState, useContext } from 'react';
import ProductService from '../services/productService';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const fetchProductsOnce = async () => {
        if (isLoaded) return;
        try {
            const response = await ProductService.getAllProduct();
            setProducts(response.data);
            setIsLoaded(true);
        } catch (error) {
            console.error('Lỗi khi tải sản phẩm:', error);
        }
    };

    const refreshProduct = async () => {
        if (isLoaded) return;
        try {
            const response = await ProductService.getAllProduct();
            setProducts(response.data);
            setIsLoaded(true);
        } catch (error) {
            console.error('Lỗi khi tải sản phẩm:', error);
        }
    };

    const deleteProductFromState = (id) => {
        setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, fetchProductsOnce, refreshProduct, deleteProductFromState }}>
            {children}
        </ProductContext.Provider>
    );
};

// Hook để dùng context nhanh hơn
export const useProducts = () => useContext(ProductContext);
