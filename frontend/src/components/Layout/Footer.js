import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-green-400">Fashion</span>Store
            </h3>
            <p className="text-gray-300 mb-4">
              Chuyên cung cấp thời trang chất lượng cao với giá cả phải chăng. 
              Mang đến phong cách hiện đại và thanh lịch cho bạn.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <FiFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <FiInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Danh mục</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products?category=nam"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Thời trang Nam
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=nu"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Thời trang Nữ
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=tre-em"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Trẻ em
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=giay-dep"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Giày dép
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=phu-kien"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Phụ kiện
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Thông tin liên hệ</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FiMapPin className="text-green-400" size={18} />
                <span className="text-gray-300">
                  123 Đường ABC, Quận 1, TP.HCM
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="text-green-400" size={18} />
                <span className="text-gray-300">
                  0123 456 789
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="text-green-400" size={18} />
                <span className="text-gray-300">
                  info@fashionstore.com
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="text-md font-semibold mb-2">Nhận thông báo</h5>
              <p className="text-gray-400 text-sm mb-3">
                Đăng ký để nhận thông tin về sản phẩm mới và khuyến mãi
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white text-sm focus:outline-none focus:border-green-400"
                />
                <button className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors text-sm">
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2025 FashionStore. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-green-400 transition-colors text-sm"
              >
                Chính sách bảo mật
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-green-400 transition-colors text-sm"
              >
                Điều khoản sử dụng
              </Link>
              <Link
                to="/return-policy"
                className="text-gray-400 hover:text-green-400 transition-colors text-sm"
              >
                Chính sách đổi trả
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
