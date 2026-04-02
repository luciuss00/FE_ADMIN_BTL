import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductService from '../services/productService';
import Notification from '../components/Notification';
import Header from '../components/Header';
import SidebarAdmin from '../components/Sidebar/SidebarAdmin';

const UpdateProduct = () => {
    const { id } = useParams(); // Lấy ID sản phẩm từ URL (VD: /update-product/123)
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ isOpen: false, message: '', check: false });

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        subCategory: '',
        imageLink: '',
    });

    // 1. Lấy dữ liệu sản phẩm cũ khi vào trang
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Giả sử bạn có hàm getProductById trong ProductService
                const response = await ProductService.getProductById(id);
                const data = response.data;
                setProduct({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                    category: data.category,
                    subCategory: data.subCategory,
                    imageLink: data.imageLink,
                });
            } catch (error) {
                setNotification({ isOpen: true, message: 'Không tìm thấy sản phẩm!', check: false });
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // --- VALIDATE DỮ LIỆU ---
        const { name, price, stock, category, subCategory, imageLink, description } = product;

        if (!name || !category || !subCategory || !imageLink || !description) {
            setNotification({ isOpen: true, message: 'Vui lòng nhập đầy đủ thông tin!', check: false });
            return;
        }

        if (Number(price) < 0 || Number(stock) < 0) {
            setNotification({ isOpen: true, message: 'Giá và số lượng không được âm!', check: false });
            return;
        }

        try {
            const dataSubmit = {
                id: id, // Backend cần ID để findById
                name: name,
                description: description,
                price: Number(price),
                stock: Number(stock),
                category: category,
                subCategory: subCategory,
                imageLink: imageLink,
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
                                required
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
                                    min="0"
                                    required
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
                                    min="0"
                                    required
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
                                    required
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
                                    required
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
                                required
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
                                required
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md mt-1 outline-none"
                            ></textarea>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-bold transition-all"
                            >
                                Lưu thay đổi
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

export default UpdateProduct;
