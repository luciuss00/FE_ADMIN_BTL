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
        priceProduct: '', // Để rỗng ban đầu thay vì 0 để validate 'thiếu' dễ hơn
        quantity: '',
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

        // 1. Lấy dữ liệu từ state
        const {
            nameProduct,
            priceProduct,
            quantity,
            categoryProduct,
            subCategoryProduct,
            imageLink,
            descriptionProduct,
        } = product;

        // 2. Kiểm tra nhập thiếu (Trường nào trống sẽ báo lỗi)
        if (
            !nameProduct ||
            !categoryProduct ||
            !subCategoryProduct ||
            !imageLink ||
            !descriptionProduct ||
            !priceProduct ||
            !quantity
        ) {
            setNotification({
                isOpen: true,
                message: 'Vui lòng điền đầy đủ tất cả các thông tin!',
                check: false,
            });
            return; // Dừng hàm, không chạy code bên dưới
        }

        // 3. Kiểm tra Giá và Số lượng (Phải là số dương)
        const price = Number(priceProduct);
        const stock = Number(quantity);

        if (price < 0 || stock < 0) {
            setNotification({
                isOpen: true,
                message: 'Giá và số lượng không được là số âm!',
                check: false,
            });
            return;
        }

        // 4. Nếu vượt qua các bước trên mới bắt đầu gọi API
        try {
            const dataSubmit = {
                name: nameProduct,
                description: descriptionProduct,
                price: price,
                stock: stock,
                originalPrice: 0,
                category: categoryProduct,
                imageLink: imageLink,
                subCategory: subCategoryProduct,
            };

            await ProductService.addProduct(dataSubmit);

            setNotification({ isOpen: true, message: 'Thêm sản phẩm thành công!', check: true });
            setTimeout(() => navigate('/product-management'), 1500);
        } catch (error) {
            setNotification({
                isOpen: true,
                message: 'Lỗi hệ thống khi thêm sản phẩm!',
                check: false,
            });
            console.log(error);
        }
    };

    return (
        <div>
            <Header />
            <div className="flex">
                <SidebarAdmin activeTab="product" />
                <div className="mx-auto mt-7 w-200">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Thêm Sản Phẩm Mới</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Tên sản phẩm */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                            <input
                                type="text"
                                name="nameProduct"
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md mt-1 outline-none focus:border-red-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Giá (VNĐ)</label>
                                <input
                                    type="number"
                                    name="priceProduct"
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md mt-1 outline-none focus:border-red-500"
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Số lượng</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    min="0"
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md mt-1 outline-none focus:border-red-500"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        {/* Các field khác giữ nguyên... */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Danh mục chính</label>
                                <input
                                    type="text"
                                    name="categoryProduct"
                                    placeholder="VD: Thiết bị"
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md mt-1 outline-none focus:border-red-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Danh mục phụ</label>
                                <input
                                    type="text"
                                    name="subCategoryProduct"
                                    placeholder="VD: Cân"
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md mt-1 outline-none focus:border-red-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Link hình ảnh</label>
                            <input
                                type="text"
                                name="imageLink"
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md mt-1 outline-none focus:border-red-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mô tả sản phẩm</label>
                            <textarea
                                name="descriptionProduct"
                                rows="4"
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md mt-1 outline-none focus:border-red-500"
                            ></textarea>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                className="flex-1 cursor-pointer bg-red-500 text-white py-2 rounded-md hover:bg-red-600 font-bold transition-all"
                            >
                                Lưu sản phẩm
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

export default AddProduct;
