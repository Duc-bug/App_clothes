import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiHeart } from 'react-icons/fi';
import { logout } from '../../store/slices/authSlice';
import { toast } from 'react-toastify';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Đăng xuất thành công');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products with search query
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900">
            <span className="text-green-600">Fashion</span>Store
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors"
              >
                <FiSearch size={20} />
              </button>
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/wishlist"
                    className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <FiHeart size={24} />
                  </Link>
                  <Link
                    to="/cart"
                    className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <FiShoppingCart size={24} />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                  <div className="relative group">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                      <FiUser size={24} />
                      <span className="hidden lg:block">{user?.name}</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Thông tin cá nhân
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đơn hàng của tôi
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/cart"
                    className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <FiShoppingCart size={24} />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex border-t border-gray-200 py-4">
          <div className="flex space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-green-600 transition-colors font-medium"
            >
              Trang chủ
            </Link>
            <Link
              to="/products?category=nam"
              className="text-gray-600 hover:text-green-600 transition-colors font-medium"
            >
              Nam
            </Link>
            <Link
              to="/products?category=nu"
              className="text-gray-600 hover:text-green-600 transition-colors font-medium"
            >
              Nữ
            </Link>
            <Link
              to="/products?category=tre-em"
              className="text-gray-600 hover:text-green-600 transition-colors font-medium"
            >
              Trẻ em
            </Link>
            <Link
              to="/products?category=giay-dep"
              className="text-gray-600 hover:text-green-600 transition-colors font-medium"
            >
              Giày dép
            </Link>
            <Link
              to="/products?category=phu-kien"
              className="text-gray-600 hover:text-green-600 transition-colors font-medium"
            >
              Phụ kiện
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg text-sm"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-green-600 text-white rounded-r-lg"
              >
                <FiSearch size={18} />
              </button>
            </form>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <Link
                to="/"
                className="block py-2 text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <Link
                to="/products?category=nam"
                className="block py-2 text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Nam
              </Link>
              <Link
                to="/products?category=nu"
                className="block py-2 text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Nữ
              </Link>
              <Link
                to="/products?category=tre-em"
                className="block py-2 text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Trẻ em
              </Link>
              <Link
                to="/products?category=giay-dep"
                className="block py-2 text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Giày dép
              </Link>
              <Link
                to="/products?category=phu-kien"
                className="block py-2 text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Phụ kiện
              </Link>
            </div>

            {/* Mobile Auth Links */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="block py-2 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Thông tin cá nhân
                  </Link>
                  <Link
                    to="/orders"
                    className="block py-2 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đơn hàng của tôi
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block py-2 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Yêu thích
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-gray-600"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block py-2 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="block py-2 bg-green-600 text-white text-center rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
