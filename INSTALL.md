# Fashion Store - Hướng dẫn cài đặt

## 🚀 Cài đặt Backend (Laravel)

### 1. Yêu cầu hệ thống
- PHP >= 8.1
- Composer
- MySQL >= 8.0
- Git

### 2. Clone và cài đặt
```bash
# Clone repository
git clone <your-repository-url>
cd fashion-store/backend

# Cài đặt dependencies
composer install

# Copy file cấu hình
cp .env.example .env

# Tạo application key
php artisan key:generate
```

### 3. Cấu hình database
Mở file `.env` và cấu hình:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fashion_store
DB_USERNAME=root
DB_PASSWORD=your_password

# JWT Secret (tạo bằng: php artisan jwt:secret)
JWT_SECRET=your_jwt_secret

# VNPAY Config
VNPAY_TMN_CODE=your_tmn_code
VNPAY_HASH_SECRET=your_hash_secret
VNPAY_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html

# Momo Config
MOMO_PARTNER_CODE=your_partner_code
MOMO_ACCESS_KEY=your_access_key
MOMO_SECRET_KEY=your_secret_key
MOMO_ENDPOINT=https://test-payment.momo.vn
```

### 4. Tạo database và chạy migration
```bash
# Tạo database
mysql -u root -p -e "CREATE DATABASE fashion_store"

# Chạy migrations và seeders
php artisan migrate --seed

# Tạo symbolic link cho storage
php artisan storage:link

# Khởi động server
php artisan serve
```

## 🎨 Cài đặt Frontend (React)

### 1. Yêu cầu hệ thống
- Node.js >= 16
- npm hoặc yarn

### 2. Cài đặt
```bash
cd frontend

# Cài đặt dependencies
npm install

# Tạo file .env
cp .env.example .env.local
```

### 3. Cấu hình environment
Mở file `.env.local`:
```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_APP_NAME=Fashion Store
REACT_APP_VNPAY_RETURN_URL=http://localhost:3000/payment/vnpay/return
REACT_APP_MOMO_RETURN_URL=http://localhost:3000/payment/momo/return
```

### 4. Khởi động development server
```bash
npm start
```

## 🌐 Triển khai Production

### Backend (Laravel)
```bash
# Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize

# Set permissions
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

### Frontend (React)
```bash
# Build for production
npm run build

# Deploy thư mục build/ lên web server
```

## 📊 Database Schema

### Các bảng chính:
- `users` - Thông tin người dùng
- `categories` - Danh mục sản phẩm  
- `products` - Sản phẩm
- `product_images` - Hình ảnh sản phẩm
- `product_attributes` - Thuộc tính sản phẩm (size, màu)
- `carts` - Giỏ hàng
- `orders` - Đơn hàng
- `order_items` - Chi tiết đơn hàng
- `reviews` - Đánh giá sản phẩm
- `wishlists` - Danh sách yêu thích
- `coupons` - Mã giảm giá

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/profile` - Thông tin profile

### Products
- `GET /api/products` - Danh sách sản phẩm
- `GET /api/products/{id}` - Chi tiết sản phẩm
- `GET /api/products/featured` - Sản phẩm nổi bật
- `GET /api/products/categories` - Danh mục

### Cart
- `GET /api/cart` - Giỏ hàng
- `POST /api/cart` - Thêm vào giỏ
- `PUT /api/cart/{id}` - Cập nhật giỏ hàng
- `DELETE /api/cart/{id}` - Xóa khỏi giỏ

### Orders
- `POST /api/orders` - Tạo đơn hàng
- `GET /api/orders` - Lịch sử đơn hàng
- `GET /api/orders/{id}` - Chi tiết đơn hàng

### Payments
- `POST /api/payments/vnpay/create` - Tạo thanh toán VNPAY
- `POST /api/payments/momo/create` - Tạo thanh toán Momo

## 🔐 Tài khoản mặc định

### Admin
- Email: `admin@fashionstore.com`
- Password: `password`

### Customer
- Email: `john@example.com`
- Password: `password`

## 🚀 Tính năng chính

✅ **Frontend (React)**
- Trang chủ với sản phẩm nổi bật
- Danh sách và chi tiết sản phẩm
- Tìm kiếm và lọc sản phẩm
- Giỏ hàng và thanh toán
- Đăng ký/Đăng nhập
- Quản lý profile và đơn hàng
- Wishlist
- Responsive design

✅ **Backend (Laravel)**
- RESTful API
- JWT Authentication
- CRUD cho tất cả entities
- Upload và quản lý hình ảnh
- Tích hợp VNPAY, Momo
- Admin panel APIs
- Email notifications
- Caching và optimization

✅ **Database**
- Thiết kế normalized
- Indexes cho performance
- Foreign key constraints
- Sample data

## 🚀 Khởi tạo Git Repository mới

```bash
# Khởi tạo git repository
git init

# Thêm tất cả files
git add .

# Commit đầu tiên
git commit -m "Initial commit - Fashion Store Project"

# Tạo branch main
git branch -M main

# Thêm remote repository (thay <your-repository-url> bằng URL thực tế)
git remote add origin <your-repository-url>

# Push lên remote
git push -u origin main
```

## 📞 Hỗ trợ

Nếu gặp vấn đề trong quá trình cài đặt:
1. Kiểm tra log files (`storage/logs/laravel.log`)
2. Đảm bảo các services (MySQL, PHP) đang chạy
3. Kiểm tra file permissions
4. Verify database connection

**Email hỗ trợ:** support@fashionstore.com
