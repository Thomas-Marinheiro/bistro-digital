// Menu Data
const menuItems = [
  {
    id: 1,
    name: "Burrata Especial",
    category: "entradas",
    description:
      "Burrata fresca com tomates cereja confitados e pesto de manjericão.",
    price: 45.0,
    image:
      "https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    name: "Bruschetta de Parma",
    category: "entradas",
    description:
      "Pão artesanal, presunto de parma, figos frescos e redução de balsâmico.",
    price: 38.0,
    image:
      "https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "Risoto de Cogumelos",
    category: "principais",
    description: "Arroz arbóreo com mix de cogumelos frescos e azeite trufado.",
    price: 68.0,
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 4,
    name: "Salmão Grelhado",
    category: "principais",
    description:
      "Salmão com crosta de gergelim, purê de mandioquinha e aspargos.",
    price: 75.0,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 5,
    name: "Filé au Poivre",
    category: "principais",
    description: "Filé mignon com molho de pimenta preta e batatas rústicas.",
    price: 82.0,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 6,
    name: "Tiramisu Clássico",
    category: "sobremesas",
    description: "Tradicional sobremesa italiana com café, cacau e mascarpone.",
    price: 28.0,
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 7,
    name: "Cheesecake de Frutas Vermelhas",
    category: "sobremesas",
    description: "Base crocante com creme suave e calda artesanal de frutas.",
    price: 26.0,
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 8,
    name: "Vinho Tinto Reserva",
    category: "bebidas",
    description: "Garrafa de vinho tinto selecionado da casa.",
    price: 120.0,
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 9,
    name: "Drink de Frutas Tropicais",
    category: "bebidas",
    description: "Mix de frutas da estação, gin premium e tônica.",
    price: 32.0,
    image:
      "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
];

// State
let cart = JSON.parse(localStorage.getItem("bistro-cart")) || [];

// DOM Elements
const menuGrid = document.getElementById("menu-grid");
const cartCount = document.getElementById("cart-count");
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalValue = document.getElementById("cart-total-value");
const cartIcon = document.getElementById("cart-icon");
const closeCartBtn = document.getElementById("close-cart");
const checkoutBtn = document.getElementById("checkout-btn");
const categoryBtns = document.querySelectorAll(".cat-btn");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.querySelector(".close-lightbox");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  if (menuGrid) {
    renderMenu("todos");
  }
  updateCartUI();
  setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
  // Category Filtering
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderMenu(btn.dataset.category);
    });
  });

  // Cart Toggles
  if (cartIcon) {
    cartIcon.addEventListener("click", toggleCart);
  }
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", toggleCart);
  }
  if (cartOverlay) {
    cartOverlay.addEventListener("click", toggleCart);
  }

  // Checkout
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", checkout);
  }

  // Lightbox for Gallery
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const imgSrc = item.querySelector("img").src;
      lightboxImg.src = imgSrc;
      lightbox.style.display = "flex";
    });
  });

  if (closeLightbox) {
    closeLightbox.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });
  }
}

// Render Menu Items
function renderMenu(category) {
  if (!menuGrid) return;

  menuGrid.innerHTML = "";

  const filteredItems =
    category === "todos"
      ? menuItems
      : menuItems.filter((item) => item.category === category);

  filteredItems.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("menu-item");
    itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-info">
                <div>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
                <div class="menu-item-footer">
                    <span class="menu-item-price">R$ ${item.price.toFixed(2)}</span>
                    <button class="btn btn-primary btn-sm" onclick="addToCart(${item.id})">
                        <i class="fas fa-plus"></i> Adicionar
                    </button>
                </div>
            </div>
        `;
    menuGrid.appendChild(itemElement);
  });
}

// Cart Functions
function toggleCart() {
  cartSidebar.classList.toggle("active");
  cartOverlay.classList.toggle("active");
}

window.addToCart = function (id) {
  const item = menuItems.find((p) => p.id === id);
  const cartItem = cart.find((p) => p.id === id);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart();
  updateCartUI();

  // Open cart automatically when adding item
  if (!cartSidebar.classList.contains("active")) {
    toggleCart();
  }
};

window.removeFromCart = function (id) {
  cart = cart.filter((p) => p.id !== id);
  saveCart();
  updateCartUI();
};

window.updateQuantity = function (id, change) {
  const cartItem = cart.find((p) => p.id === id);
  if (cartItem) {
    cartItem.quantity += change;
    if (cartItem.quantity <= 0) {
      removeFromCart(id);
    } else {
      saveCart();
      updateCartUI();
    }
  }
};

function saveCart() {
  localStorage.setItem("bistro-cart", JSON.stringify(cart));
}

function updateCartUI() {
  if (cartCount) {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalCount;
  }

  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<p style="text-align: center; margin-top: 20px;">Seu carrinho está vazio.</p>';
    } else {
      cart.forEach((item) => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");
        cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>R$ ${item.price.toFixed(2)}</p>
                        <div class="cart-item-qty">
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <span class="cart-item-remove" onclick="removeFromCart(${item.id})">Remover</span>
                    </div>
                `;
        cartItemsContainer.appendChild(cartItemElement);
      });
    }
  }

  if (cartTotalValue) {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    cartTotalValue.innerText = `R$ ${total.toFixed(2)}`;
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("Adicione itens ao carrinho antes de finalizar.");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let message = "Resumo do Pedido - Bistrô Digital:\n\n";

  cart.forEach((item) => {
    message += `• ${item.name} (x${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
  });

  message += `\nTotal: R$ ${total.toFixed(2)}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/5511999999999?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");

  // Optional: Clear cart after checkout
  // cart = [];
  // saveCart();
  // updateCartUI();
}
