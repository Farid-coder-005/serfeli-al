document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header Effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other faqs
      faqItems.forEach(faq => faq.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- MOCK DATA ---
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB Natural Titanium",
      category: "Smartphones",
      price: 2699.00,
      oldPrice: 3199.00,
      image: "img/product_smartphone_1774182160713.png",
      badge: "-500 ₼ Cashback"
    },
    {
      id: 2,
      name: "MacBook Pro 14 M3 512GB Space Gray",
      category: "Noutbuklar",
      price: 3499.00,
      oldPrice: 3899.00,
      image: "img/product_laptop_1774182337051.png",
      badge: "Ən Ucuz"
    },
    {
      id: 3,
      name: "Sony WH-1000XM5 Premium Qulaqlıq",
      category: "Aksesuarlar",
      price: 649.00,
      oldPrice: 849.00,
      image: "img/product_headphones_1774182079847.png",
      badge: "Fürsət"
    },
    {
      id: 4,
      name: "Apple Watch Series 9 GPS 45mm",
      category: "Ağıllı Saatlar",
      price: 899.00,
      oldPrice: 1049.00,
      image: "img/product_smartwatch_1774182093546.png",
      badge: "-14% Endirim"
    }
  ];

  let cart = [];

  // --- DOM ELEMENTS ---
  const productGrid = document.getElementById('product-grid');
  const cartIcon = document.getElementById('cart-icon');
  const cartBadge = document.getElementById('cart-badge');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const closeCartBtn = document.getElementById('close-cart');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartEmptyState = document.getElementById('cart-empty-state');
  const cartTotalPrice = document.getElementById('cart-total-price');

  // --- FUNCTIONS ---
  
  // Format Price
  const formatPrice = (price) => {
    return price.toFixed(2) + ' ₼';
  };

  // Render Products
  const renderProducts = () => {
    if (!productGrid) return;
    productGrid.innerHTML = '';
    
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      
      const badgeHTML = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
      const oldPriceHTML = product.oldPrice ? `<div class="product-price-old">${formatPrice(product.oldPrice)}</div>` : '';
      
      card.innerHTML = `
        ${badgeHTML}
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <div class="product-category">${product.category}</div>
          <h3 class="product-title">${product.name}</h3>
          <div class="product-price-container">
            <div class="product-price">${formatPrice(product.price)}</div>
            ${oldPriceHTML}
          </div>
          <button class="btn-add-cart" data-id="${product.id}">
            <i class="ph ph-shopping-cart"></i> Səbətə at
          </button>
        </div>
      `;
      productGrid.appendChild(card);
    });

    // Add Event Listeners for Add to Cart
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        addToCart(id);
        // Small feedback animation
        const icon = btn.querySelector('i');
        icon.classList.remove('ph-shopping-cart');
        icon.classList.add('ph-check-circle');
        btn.style.backgroundColor = 'var(--primary-color)';
        btn.style.color = 'white';
        setTimeout(() => {
          icon.classList.remove('ph-check-circle');
          icon.classList.add('ph-shopping-cart');
          btn.style.backgroundColor = '';
          btn.style.color = '';
        }, 1000);
      });
    });
  };

  // Cart Logic
  const openCart = () => {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeCart = () => {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  const updateCartUI = () => {
    // Total count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if(cartBadge) cartBadge.textContent = totalItems;
    
    // Total price
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if(cartTotalPrice) cartTotalPrice.textContent = formatPrice(totalPrice);

    // Render items
    if(cartItemsContainer) {
      const existingItemElements = cartItemsContainer.querySelectorAll('.cart-item');
      existingItemElements.forEach(el => el.remove());

      if (cart.length === 0) {
        if(cartEmptyState) cartEmptyState.style.display = 'block';
      } else {
        if(cartEmptyState) cartEmptyState.style.display = 'none';
        
        cart.forEach(item => {
          const itemEl = document.createElement('div');
          itemEl.className = 'cart-item';
          itemEl.innerHTML = `
            <div class="cart-item-img">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
              <div class="cart-item-title">${item.name}</div>
              <div class="cart-item-price">${formatPrice(item.price)}</div>
              <div class="cart-item-actions">
                <div class="quantity-ctrl">
                  <button class="quantity-btn decrement" data-id="${item.id}">-</button>
                  <div class="quantity-val">${item.quantity}</div>
                  <button class="quantity-btn increment" data-id="${item.id}">+</button>
                </div>
                <button class="btn-remove" data-id="${item.id}"><i class="ph ph-trash"></i></button>
              </div>
            </div>
          `;
          // Insert before empty state
          cartItemsContainer.insertBefore(itemEl, cartEmptyState);
        });

        // Bind dynamic buttons inside cart
        document.querySelectorAll('.increment').forEach(btn => {
          btn.addEventListener('click', (e) => {
            updateQuantity(parseInt(e.currentTarget.dataset.id), 1);
          });
        });
        document.querySelectorAll('.decrement').forEach(btn => {
          btn.addEventListener('click', (e) => {
            updateQuantity(parseInt(e.currentTarget.dataset.id), -1);
          });
        });
        document.querySelectorAll('.btn-remove').forEach(btn => {
          btn.addEventListener('click', (e) => {
            removeFromCart(parseInt(e.currentTarget.dataset.id));
          });
        });
      }
    }
  };

  const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    openCart();
  };

  const updateQuantity = (productId, change) => {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartUI();
    }
  };

  const removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
  };

  // --- INITIALIZATION ---
  if (cartIcon) cartIcon.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Stop propagation on cart drawer click
  if (cartDrawer) {
    cartDrawer.addEventListener('click', (e) => e.stopPropagation());
  }

  renderProducts();
  updateCartUI();
});
