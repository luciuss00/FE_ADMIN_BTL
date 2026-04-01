import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductService from '../services/productService';
import Notification from '../components/Notification';
import Header from '../components/Header';
import SidebarAdmin from '../components/Sidebar/SidebarAdmin';

const AddProduct = () => {
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ isOpen: false, message: '', check: false });
    const [product, setProduct] = useState({
        nameProduct: '',
        descriptionProduct: '',
        priceProduct: 0,
        quantity: 0,
        categoryProduct: '',
        subCategoryProduct: '',
        imageLink: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Chuyển đổi để khớp chính xác với các field trong ảnh
            const dataSubmit = {
                name: product.nameProduct,
                description: product.descriptionProduct,
                price: product.priceProduct,
                stock: product.quantity, // ảnh dùng "stock" thay vì "quantity"
                originalPrice: 0,
                category: product.categoryProduct,
                imageLink: product.imageLink,
                subCategory: product.subCategoryProduct,
            };

            console.log('Dữ liệu gửi đi:', dataSubmit);

            await ProductService.addProduct(dataSubmit);

            setNotification({ isOpen: true, message: 'Thêm sản phẩm thành công!', check: true });
            setTimeout(() => navigate('/product-management'), 1500);
        } catch (error) {
            setNotification({ isOpen: true, message: 'Lỗi khi thêm sản phẩm!', check: false });
            console.error('Chi tiết lỗi:', error.response?.data || error.message);
        }
    };

    return (
        <div>
            <Header />
            <div className="flex">
                <SidebarAdmin />
                <div className="mx-auto mt-7 w-200">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Thêm Sản Phẩm Mới</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                            <input
                                type="text"
                                name="nameProduct"
                                required
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md mt-1 outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Giá (VNĐ)</label>
                                <input
                                    type="number"
                                    name="priceProduct"
                                    required
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md mt-1  outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Số lượng</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    required
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md mt-1  outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Danh mục chính</label>
                                <input
                                    type="text"
                                    name="categoryProduct"
                                    placeholder="VD: Thiết bị"
                                    required
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md mt-1  outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Danh mục phụ</label>
                                <input
                                    type="text"
                                    name="subCategoryProduct"
                                    placeholder="VD: Cân"
                                    required
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md mt-1  outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Link hình ảnh</label>
                            <input
                                type="text"
                                name="imageLink"
                                required
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md mt-1  outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mô tả sản phẩm</label>
                            <textarea
                                name="descriptionProduct"
                                rows="4"
                                required
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md mt-1  outline-none"
                            ></textarea>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 font-bold transition-all"
                            >
                                Lưu sản phẩm
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 font-bold"
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Notification
                isOpen={notification.isOpen}
                message={notification.message}
                check={notification.check}
                onClose={() => setNotification({ ...notification, isOpen: false })}
            />
        </div>
    );
};

export default AddProduct;
