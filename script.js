// ===============================
// EcoSphere Main Script
// ===============================

// 14 Eco-Friendly Products
const products = [
  {
    id: 1,
    name: "Bamboo Toothbrush",
    price: 99,
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=800&q=80",
    description: "Eco-friendly toothbrush made from sustainable bamboo."
  },
  {
    id: 2,
    name: "Reusable Coffee Cup",
    price: 249,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    description: "Stylish reusable cup to reduce single-use waste."
  },
  {
    id: 3,
    name: "Stainless Steel Bottle",
    price: 499,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    description: "Durable reusable bottle for daily hydration."
  },
  {
    id: 4,
    name: "Organic Cotton Tote Bag",
    price: 199,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    description: "Reusable tote bag perfect for shopping."
  },
  {
    id: 5,
    name: "Wooden Cutlery Set",
    price: 179,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    description: "Portable eco-friendly cutlery set for meals on the go."
  },
  {
    id: 6,
    name: "Reusable Metal Straw Set",
    price: 149,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    description: "Stainless steel straws with cleaning brush."
  },
  {
    id: 7,
    name: "Natural Loofah Scrubber",
    price: 129,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80",
    description: "Biodegradable bath scrubber made from natural loofah."
  },
  {
    id: 8,
    name: "Eco Dishwashing Brush",
    price: 159,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    description: "Wooden handle brush for sustainable kitchen cleaning."
  },
  {
    id: 9,
    name: "Beeswax Food Wraps",
    price: 299,
    image: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=80",
    description: "Reusable wraps for storing food without plastic."
  },
  {
    id: 10,
    name: "Compost Bin",
    price: 699,
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
    description: "Compact compost bin for home kitchen waste."
  },
  {
    id: 11,
    name: "Plantable Seed Pencils",
    price: 99,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    description: "Pencils that can be planted after use to grow herbs."
  },
  {
    id: 12,
    name: "Solar Power Bank",
    price: 1299,
    image: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?auto=format&fit=crop&w=800&q=80",
    description: "Portable solar-powered charger for eco-conscious travel."
  },
  {
    id: 13,
    name: "Coconut Shell Bowl",
    price: 349,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    description: "Handcrafted bowl made from reclaimed coconut shells."
  },
  {
    id: 14,
    name: "Reusable Produce Bags",
    price: 219,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    description: "Washable mesh bags for fruits and vegetables."
  }
];

// Always update products
localStorage.setItem("products", JSON.stringify(products));

// Helpers
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}

function saveOrders(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}

// Update navbar
function updateNavbarUser() {
  const userArea = document.getElementById("userArea");
  if (!userArea) return;

  const currentUser = getCurrentUser();

  if (currentUser) {
    userArea.innerHTML = `
      <li><a href="profile.html">Hi, ${currentUser.name}</a></li>
      <li><a href="#" onclick="logout()">Logout</a></li>
    `;
  } else {
    userArea.innerHTML = `
      <li><a href="login.html">Login</a></li>
      <li><a href="signup.html">Signup</a></li>
    `;
  }
}

// Logout
function logout() {
  localStorage.removeItem("currentUser");
  alert("Logged out successfully!");
  window.location.href = "index.html";
}

// Render products
function renderProducts() {
  const productContainer = document.getElementById("productContainer");
  if (!productContainer) return;

  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  productContainer.innerHTML = "";

  storedProducts.forEach(product => {
    productContainer.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">₹${product.price}</p>
        <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Add to cart
function addToCart(productId) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    alert("Please login first!");
    window.location.href = "login.html";
    return;
  }

  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  const product = storedProducts.find(p => p.id === productId);

  let cart = getCart();
  const existingItem = cart.find(item => item.id === productId && item.userEmail === currentUser.email);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
      userEmail: currentUser.email
    });
  }

  saveCart(cart);
  alert(`${product.name} added to cart!`);
}

// Render cart
function renderCart() {
  const cartContainer = document.getElementById("cartContainer");
  const cartTotal = document.getElementById("cartTotal");
  if (!cartContainer || !cartTotal) return;

  const currentUser = getCurrentUser();
  if (!currentUser) {
    cartContainer.innerHTML = `<div class="info-card"><p>Please login to view cart.</p></div>`;
    cartTotal.textContent = "";
    return;
  }

  const cart = getCart().filter(item => item.userEmail === currentUser.email);

  if (cart.length === 0) {
    cartContainer.innerHTML = `<div class="info-card"><p>Your cart is empty.</p></div>`;
    cartTotal.textContent = "";
    return;
  }

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    cartContainer.innerHTML += `
      <div class="info-card">
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Subtotal: ₹${item.price * item.quantity}</p>
      </div>
    `;
  });

  cartTotal.innerHTML = `<h2>Total: ₹${total}</h2>`;
}

// Place order
function placeOrder(event) {
  event.preventDefault();

  const currentUser = getCurrentUser();
  if (!currentUser) {
    alert("Please login first!");
    window.location.href = "login.html";
    return;
  }

  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!address || !phone) {
    alert("Please fill all details.");
    return;
  }

  const cart = getCart().filter(item => item.userEmail === currentUser.email);

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const newOrder = {
    orderId: "ORD" + Date.now(),
    userEmail: currentUser.email,
    userName: currentUser.name,
    items: cart,
    total,
    address,
    phone,
    date: new Date().toLocaleString(),
    status: "Placed"
  };

  const orders = getOrders();
  orders.push(newOrder);
  saveOrders(orders);

  const allCart = getCart();
  const remainingCart = allCart.filter(item => item.userEmail !== currentUser.email);
  saveCart(remainingCart);

  alert("Order placed successfully!");
  window.location.href = "orders.html";
}

// Render orders
function renderOrders() {
  const ordersContainer = document.getElementById("ordersContainer");
  if (!ordersContainer) return;

  const currentUser = getCurrentUser();

  if (!currentUser) {
    ordersContainer.innerHTML = `<div class="info-card"><p>Please login to view orders.</p></div>`;
    return;
  }

  const orders = getOrders().filter(order => order.userEmail === currentUser.email);

  if (orders.length === 0) {
    ordersContainer.innerHTML = `<div class="info-card"><p>No previous orders found.</p></div>`;
    return;
  }

  ordersContainer.innerHTML = "";

  orders.reverse().forEach(order => {
    let itemsHTML = "";
    order.items.forEach(item => {
      itemsHTML += `<p>${item.name} × ${item.quantity} = ₹${item.price * item.quantity}</p>`;
    });

    ordersContainer.innerHTML += `
      <div class="info-card">
        <h3>Order ID: ${order.orderId}</h3>
        <p><strong>Date:</strong> ${order.date}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Address:</strong> ${order.address}</p>
        <div style="margin:10px 0;">
          <strong>Items:</strong>
          ${itemsHTML}
        </div>
        <p><strong>Total:</strong> ₹${order.total}</p>
      </div>
    `;
  });
}

// Render profile
function renderProfile() {
  const profileContainer = document.getElementById("profileContainer");
  if (!profileContainer) return;

  const currentUser = getCurrentUser();

  if (!currentUser) {
    profileContainer.innerHTML = `<div class="info-card"><p>Please login to view profile.</p></div>`;
    return;
  }

  profileContainer.innerHTML = `
    <div class="info-card">
      <h3>${currentUser.name}</h3>
      <p><strong>Email:</strong> ${currentUser.email}</p>
      <p><strong>Phone:</strong> ${currentUser.phone || "Not added"}</p>
      <p><strong>Address:</strong> ${currentUser.address || "Not added"}</p>
    </div>
  `;
}

// Signup
function setupSignup() {
  const signupForm = document.getElementById("signupForm");
  if (!signupForm) return;

  signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const phone = document.getElementById("signupPhone").value.trim();
    const address = document.getElementById("signupAddress").value.trim();

    let users = getUsers();
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      alert("User already exists. Please login.");
      return;
    }

    const newUser = { name, email, password, phone, address };
    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser);

    alert("Signup successful!");
    window.location.href = "index.html";
  });
}

// Login
function setupLogin() {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("Invalid email or password.");
      return;
    }

    setCurrentUser(user);
    alert("Login successful!");
    window.location.href = "index.html";
  });
}

// Run everything
document.addEventListener("DOMContentLoaded", () => {
  updateNavbarUser();
  renderProducts();
  renderCart();
  renderOrders();
  renderProfile();
  setupSignup();
  setupLogin();
});