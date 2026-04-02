import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductService from '../services/productService';
import Notification from '../components/Notification';
import Header from '../components/Header';
import SidebarAdmin from '../components/Sidebar/SidebarAdmin';

const UpdateProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const productCurr = location.state;
    const [notification, setNotification] = useState({ isOpen: false, message: '', check: false });

    const [product, setProduct] = useState({
        id: productCurr.id,
        name: productCurr.name,
        description: productCurr.description,
        price: productCurr.cost,
        stock: productCurr.quantity,
        originalPrice: 0,
        category: productCurr.type,
        imageLink: productCurr.img,
        subCategory: productCurr.subCategory,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, price, stock, category, subCategory, imageLink, description } = product;

        // Validation
        if (!name || !category || !subCategory || !imageLink || !description || !price || !stock) {
            setNotification({ isOpen: true, message: 'Vui lòng nhập đầy đủ thông tin!', check: false });
            return;
        }

        if (Number(price) < 0 || Number(stock) < 0) {
            setNotification({ isOpen: true, message: 'Giá và số lượng không được là số âm!', check: false });
            return;
        }

        try {
            const dataSubmit = {
                id: product.id,
                name: product.name,
                description: product.description,
                price: Number(product.price),
                stock: Number(product.stock),
                originalPrice: 0,
                category: product.category,
                imageLink: product.imageLink,
                subCategory: product.subCategory,
            };

            await ProductService.updateProduct(dataSubmit);

            setNotification({ isOpen: true, message: 'Cập nhật thành công!', check: true });
            setTimeout(() => navigate('/product-management'), 1500);
        } catch (error) {
            setNotification({
                isOpen: true,
                message: error.response?.data?.message || 'Lỗi khi cập nhật sản phẩm!',
                check: false,
            });
        }
    };

    return (
        <div>
            <Header />
            <div className="flex">
                <SidebarAdmin />
                <div className="mx-auto mt-7 w-200">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Chỉnh Sửa Sản Phẩm</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                            <input
                                type="text"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md mt-1 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Giá (VNĐ)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={product.price}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md mt-1 outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Số lượng</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={product.stock}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md mt-1 outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Danh mục chính</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={product.category}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md mt-1 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Danh mục phụ</label>
                                <input
                                    type="text"
                                    name="subCategory"
                                    value={product.subCategory}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md mt-1 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Link hình ảnh</label>
                            <input
                                type="text"
                                name="imageLink"
                                value={product.imageLink}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md mt-1 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mô tả sản phẩm</label>
                            <textarea
                                name="description"
                                value={product.description}
                                rows="4"
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md mt-1 outline-none"
                            ></textarea>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                className="flex-1 cursor-pointer bg-red-500 text-white py-2 rounded-md hover:bg-red-600 font-bold transition-all"
                            >
                                Lưu thay đổi
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="flex-1 cursor-pointer bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 font-bold"
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

export default UpdateProduct;
