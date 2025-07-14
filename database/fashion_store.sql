-- Fashion Store Database Schema
-- MySQL 8.0+

CREATE DATABASE IF NOT EXISTS fashion_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE fashion_store;

-- Users table
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    avatar VARCHAR(255),
    role ENUM('admin', 'customer') DEFAULT 'customer',
    is_active BOOLEAN DEFAULT TRUE,
    remember_token VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image VARCHAR(255),
    parent_id BIGINT UNSIGNED NULL,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Products table
CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    sku VARCHAR(100) UNIQUE,
    price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2),
    stock_quantity INT DEFAULT 0,
    weight DECIMAL(8,2),
    dimensions VARCHAR(100),
    status ENUM('active', 'inactive', 'draft') DEFAULT 'active',
    featured BOOLEAN DEFAULT FALSE,
    category_id BIGINT UNSIGNED,
    brand VARCHAR(100),
    material VARCHAR(100),
    care_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_price (price),
    INDEX idx_status (status),
    INDEX idx_featured (featured),
    INDEX idx_category (category_id)
);

-- Product images table
CREATE TABLE product_images (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT UNSIGNED NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Product attributes (sizes, colors, etc.)
CREATE TABLE product_attributes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(100) NOT NULL, -- 'size', 'color', etc.
    value VARCHAR(100) NOT NULL, -- 'S', 'Red', etc.
    price_adjustment DECIMAL(10,2) DEFAULT 0,
    stock_quantity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_product_attribute (product_id, name, value)
);

-- Carts table
CREATE TABLE carts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED,
    session_id VARCHAR(255),
    product_id BIGINT UNSIGNED NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    attributes JSON, -- Store selected size, color, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_user_session (user_id, session_id)
);

-- Orders table
CREATE TABLE orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    
    -- Shipping information
    shipping_name VARCHAR(255) NOT NULL,
    shipping_email VARCHAR(255),
    shipping_phone VARCHAR(20),
    shipping_address TEXT NOT NULL,
    shipping_city VARCHAR(100),
    shipping_district VARCHAR(100),
    shipping_ward VARCHAR(100),
    
    -- Payment information
    payment_method ENUM('cod', 'vnpay', 'momo') DEFAULT 'cod',
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    payment_transaction_id VARCHAR(255),
    
    notes TEXT,
    shipped_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_order_number (order_number),
    INDEX idx_status (status),
    INDEX idx_user (user_id)
);

-- Order items table
CREATE TABLE order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_sku VARCHAR(100),
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    attributes JSON, -- Store selected size, color, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Coupons table
CREATE TABLE coupons (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    type ENUM('fixed', 'percentage') NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    minimum_amount DECIMAL(10,2) DEFAULT 0,
    maximum_discount DECIMAL(10,2),
    usage_limit INT,
    used_count INT DEFAULT 0,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE reviews (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    order_id BIGINT UNSIGNED,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,
    UNIQUE KEY unique_user_product_review (user_id, product_id)
);

-- Wishlists table
CREATE TABLE wishlists (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product_wishlist (user_id, product_id)
);

-- Insert sample data
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@fashionstore.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
('John Doe', 'john@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'customer'),
('Jane Smith', 'jane@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'customer');

INSERT INTO categories (name, slug, description) VALUES
('Nam', 'nam', 'Thời trang nam'),
('Nữ', 'nu', 'Thời trang nữ'),
('Trẻ em', 'tre-em', 'Thời trang trẻ em'),
('Giày dép', 'giay-dep', 'Giày dép thời trang'),
('Phụ kiện', 'phu-kien', 'Phụ kiện thời trang'),
('Áo thun', 'ao-thun', 'Áo thun các loại'),
('Quần jeans', 'quan-jeans', 'Quần jeans thời trang');

INSERT INTO products (name, slug, description, short_description, sku, price, sale_price, stock_quantity, category_id, brand, featured) VALUES
('Áo Thun Nam Cotton Premium', 'ao-thun-nam-cotton-premium', 'Áo thun nam chất liệu cotton 100% cao cấp, thoáng mát, form dáng suông vừa, phù hợp mọi hoạt động.', 'Áo thun nam cotton cao cấp, thoáng mát', 'TSM001', 299000, 249000, 50, 1, 'Adisport', true),
('Quần Jeans Nữ Skinny', 'quan-jeans-nu-skinny', 'Quần jeans nữ form skinny ôm dáng, chất liệu denim co giãn, tôn lên đường cong cơ thể.', 'Quần jeans nữ skinny ôm dáng', 'JNF001', 599000, 499000, 30, 2, 'Fashion', true),
('Giày Sneaker Unisex', 'giay-sneaker-unisex', 'Giày sneaker unisex phong cách thể thao, đế cao su chống trượt, phù hợp cả nam và nữ.', 'Giày sneaker unisex thể thao', 'SNK001', 899000, 799000, 25, 4, 'SportShoes', true),
('Áo Khoác Hoodie Nam', 'ao-khoac-hoodie-nam', 'Áo khoác hoodie nam có mũ, chất liệu nỉ ấm áp, phù hợp mùa đông.', 'Áo hoodie nam ấm áp', 'HDM001', 699000, 599000, 40, 1, 'Streetwear', false),
('Váy Maxi Nữ Dạo Phố', 'vay-maxi-nu-dao-pho', 'Váy maxi nữ dáng dài thướt tha, chất liệu voan mềm mại, phù hợp dạo phố.', 'Váy maxi nữ dáng dài', 'VXF001', 449000, 399000, 20, 2, 'Elegant', false),
('Balo Du Lịch Thời Trang', 'balo-du-lich-thoi-trang', 'Balo du lịch đa năng, nhiều ngăn tiện lợi, chống nước, phù hợp cả nam và nữ.', 'Balo du lịch đa năng', 'BLU001', 359000, 299000, 35, 5, 'TravelGear', false);

INSERT INTO product_images (product_id, image_url, alt_text, is_primary) VALUES
(1, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', 'Áo thun nam cotton', true),
(1, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', 'Áo thun nam mặt sau', false),
(2, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500', 'Quần jeans nữ skinny', true),
(3, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500', 'Giày sneaker unisex', true),
(4, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500', 'Áo hoodie nam', true),
(5, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500', 'Váy maxi nữ', true),
(6, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', 'Balo du lịch', true);

INSERT INTO product_attributes (product_id, name, value, stock_quantity) VALUES
-- Sizes for Áo thun nam
(1, 'size', 'S', 10),
(1, 'size', 'M', 15),
(1, 'size', 'L', 15),
(1, 'size', 'XL', 10),
-- Colors for Áo thun nam
(1, 'color', 'Trắng', 25),
(1, 'color', 'Đen', 15),
(1, 'color', 'Xanh navy', 10),
-- Sizes for Quần jeans nữ
(2, 'size', 'S', 8),
(2, 'size', 'M', 12),
(2, 'size', 'L', 10),
-- Sizes for Giày sneaker
(3, 'size', '38', 5),
(3, 'size', '39', 5),
(3, 'size', '40', 5),
(3, 'size', '41', 5),
(3, 'size', '42', 5);

INSERT INTO coupons (code, type, value, minimum_amount, expires_at, is_active) VALUES
('WELCOME10', 'percentage', 10.00, 200000, '2024-12-31 23:59:59', true),
('SAVE50K', 'fixed', 50000.00, 500000, '2024-12-31 23:59:59', true),
('FREESHIP', 'fixed', 30000.00, 300000, '2024-12-31 23:59:59', true);
