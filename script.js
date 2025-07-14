// script.js - Adisport

// Demo data (có thể thay bằng API/backend sau này)
const products = [
  {
    id: 1,
    name: "Áo Thun Nam Thể Thao",
    price: 350000,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    type: "nam",
    desc: "Áo thun thể thao nam, chất liệu co giãn, thấm hút tốt."
  },
  {
    id: 2,
    name: "Quần Jogger Nữ",
    price: 420000,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    type: "nữ",
    desc: "Quần jogger nữ năng động, phù hợp tập luyện và dạo phố."
  },
  {
    id: 3,
    name: "Giày Sneaker Unisex",
    price: 990000,
    image: "https://t4.ftcdn.net/jpg/04/42/54/79/360_F_442547913_tWYOcGkO06Vbo30KOvrOPte5JqDHVWmR.jpg",
    type: "giày",
    desc: "Giày sneaker phong cách, phù hợp mọi giới tính."
  },
  {
    id: 4,
    name: "Áo Khoác Thể Thao",
    price: 650000,
    image: "https://images.unsplash.com/photo-1528701800484-905dffb7c6b4?auto=format&fit=crop&w=400&q=80",
    type: "nam",
    desc: "Áo khoác thể thao giữ ấm, chống gió nhẹ."
  },
  {
    id: 5,
    name: "Áo Bra Nữ",
    price: 320000,
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    type: "nữ",
    desc: "Áo bra thể thao nữ, nâng đỡ và thoải mái."
  },
  {
    id: 6,
    name: "Quần Short Nam",
    price: 280000,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
    type: "nam",
    desc: "Quần short nam, nhẹ, thoáng mát cho mùa hè."
  }
];

// Render sản phẩm nổi bật (index.html)
function renderFeatured() {
  const featured = products.slice(0, 3);
  const list = document.getElementById('featured-list');
  if (!list) return;
  list.innerHTML = featured.map(p => `
    <div class="product-card" onclick="location.href='product-detail.html?id=${p.id}'">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <span>${p.price.toLocaleString()}₫</span>
    </div>
  `).join('');
}

// Khởi tạo trang
window.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
});

// --- PRODUCT PAGE RENDER ---
function renderProductsPage() {
  const list = document.getElementById('products-list');
  if (!list) return;
  let type = localStorage.getItem('productFilter') || 'all';
  const filtered = type === 'all' ? products : products.filter(p => {
    if(type === 'áo') return p.name.toLowerCase().includes('áo');
    return p.type === type;
  });
  list.innerHTML = filtered.map(p => `
    <div class="product-card" onclick="location.href='product-detail.html?id=${p.id}'">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <span>${p.price.toLocaleString()}₫</span>
    </div>
  `).join('');
  // Set active filter
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === type);
  });
}

// --- FILTER BUTTONS ---
document.addEventListener('DOMContentLoaded', () => {
  if(document.getElementById('products-list')) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.onclick = () => {
        localStorage.setItem('productFilter', btn.dataset.type);
        renderProductsPage();
      };
    });
    renderProductsPage();
  }
});

// --- PRODUCT DETAIL PAGE RENDER ---
function renderProductDetail() {
  const detail = document.getElementById('product-detail');
  if (!detail) return;
  const params = new URLSearchParams(window.location.search);
  const id = +params.get('id');
  const p = products.find(x => x.id === id);
  if (!p) {
    detail.innerHTML = '<p>Không tìm thấy sản phẩm.</p>';
    return;
  }
  detail.innerHTML = `
    <div class="product-detail-img">
      <img src="${p.image}" alt="${p.name}">
    </div>
    <div class="product-detail-info">
      <h2>${p.name}</h2>
      <span style="color:#1ed760;font-weight:bold;font-size:1.3rem">${p.price.toLocaleString()}₫</span>
      <p>${p.desc}</p>
      <form id="add-cart-form">
        <div class="size-select">
          <label for="size">Chọn size:</label>
          <select id="size" name="size" required>
            <option value="">-- Size --</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <button type="submit" class="add-cart-btn">Thêm vào giỏ hàng</button>
      </form>
    </div>
  `;
  document.getElementById('add-cart-form').onsubmit = function(e) {
    e.preventDefault();
    const size = document.getElementById('size').value;
    if(!size) return alert('Vui lòng chọn size!');
    addToCart({id: p.id, name: p.name, price: p.price, image: p.image, size, qty: 1});
    alert('Đã thêm vào giỏ hàng!');
  };
}

// --- CART LOGIC ---
function getCart() {
  return JSON.parse(localStorage.getItem('cart')||'[]');
}
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function addToCart(item) {
  let cart = getCart();
  let idx = cart.findIndex(x => x.id === item.id && x.size === item.size);
  if(idx>-1) cart[idx].qty += item.qty;
  else cart.push(item);
  setCart(cart);
}
function updateCartQty(id, size, delta) {
  let cart = getCart();
  let idx = cart.findIndex(x => x.id === id && x.size === size);
  if(idx>-1) {
    cart[idx].qty += delta;
    if(cart[idx].qty<=0) cart.splice(idx,1);
    setCart(cart);
    renderCart();
  }
}

// --- CART PAGE RENDER ---
function renderCart() {
  const list = document.getElementById('cart-list');
  if (!list) return;
  let cart = getCart();
  if(cart.length===0) {
    list.innerHTML = '<p>Giỏ hàng trống.</p>';
    document.getElementById('cart-total').textContent = '';
    return;
  }
  list.innerHTML = cart.map(item => {
    return `<div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-size">Size: ${item.size}</div>
        <div class="cart-item-qty">
          <button onclick="updateCartQty(${item.id},'${item.size}',-1)">-</button>
          <span>${item.qty}</span>
          <button onclick="updateCartQty(${item.id},'${item.size}',1)">+</button>
        </div>
      </div>
      <div class="cart-item-price">${(item.price*item.qty).toLocaleString()}₫</div>
    </div>`;
  }).join('');
  let total = cart.reduce((s,x)=>s+x.price*x.qty,0);
  document.getElementById('cart-total').textContent = 'Tổng: ' + total.toLocaleString() + '₫';
}

document.addEventListener('DOMContentLoaded', () => {
  if(document.getElementById('product-detail')) renderProductDetail();
  if(document.getElementById('cart-list')) {
    renderCart();
    document.getElementById('checkout-btn').onclick = function() {
      alert('Cảm ơn bạn đã mua hàng! (Demo)');
      setCart([]);
      renderCart();
    };
  }
});
