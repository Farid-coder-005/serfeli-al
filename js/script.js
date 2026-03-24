/**
 * Sərfəli Al - Main JavaScript
 * Clean Price Comparison Platform
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ===========================================
  // MOBILE MENU
  // ===========================================
  
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuBtn?.addEventListener('click', () => {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu?.classList.toggle('active');
    document.body.style.overflow = isExpanded ? '' : 'hidden';
    
    const icon = mobileMenuBtn.querySelector('i');
    if (icon) {
      icon.className = isExpanded ? 'ph ph-list' : 'ph ph-x';
    }
  });

  // Close mobile menu on link click
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileMenuBtn?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      const icon = mobileMenuBtn?.querySelector('i');
      if (icon) icon.className = 'ph ph-list';
    });
  });

  // ===========================================
  // CATEGORY DROPDOWN
  // ===========================================
  
  const categoryBtn = document.querySelector('.search-category-btn');
  const categoryDropdown = document.getElementById('category-dropdown');
  
  categoryBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = categoryBtn.getAttribute('aria-expanded') === 'true';
    categoryBtn.setAttribute('aria-expanded', !isExpanded);
    categoryDropdown?.classList.toggle('active');
  });

  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!categoryBtn?.contains(e.target) && !categoryDropdown?.contains(e.target)) {
      categoryBtn?.setAttribute('aria-expanded', 'false');
      categoryDropdown?.classList.remove('active');
    }
  });

  // ===========================================
  // SEARCH AUTOCOMPLETE
  // ===========================================
  
  const searchProducts = [
    { name: 'iPhone 15 Pro 128GB', category: 'Telefonlar', price: '2 299 ₼' },
    { name: 'iPhone 15 Pro Max 256GB', category: 'Telefonlar', price: '2 799 ₼' },
    { name: 'iPhone 15 128GB', category: 'Telefonlar', price: '1 599 ₼' },
    { name: 'Samsung Galaxy S24 Ultra 256GB', category: 'Telefonlar', price: '2 599 ₼' },
    { name: 'Samsung Galaxy S24 128GB', category: 'Telefonlar', price: '1 799 ₼' },
    { name: 'Xiaomi 14T Pro 256GB', category: 'Telefonlar', price: '1 199 ₼' },
    { name: 'MacBook Air M3 15" 256GB', category: 'Noutbuklar', price: '2 799 ₼' },
    { name: 'MacBook Pro 14" M3', category: 'Noutbuklar', price: '3 499 ₼' },
    { name: 'Sony WH-1000XM5', category: 'Qulaqlıqlar', price: '549 ₼' },
    { name: 'Apple Watch Series 9 45mm', category: 'Ağıllı saatlar', price: '749 ₼' },
    { name: 'PlayStation 5 Slim', category: 'Oyun konsolları', price: '899 ₼' },
    { name: 'LG OLED C4 55" 4K', category: 'Televizorlar', price: '3 199 ₼' },
    { name: 'iPad Pro 11" M4 256GB', category: 'Planşetlər', price: '1 899 ₼' },
    { name: 'Google Pixel 9 Pro', category: 'Telefonlar', price: '1 899 ₼' },
    { name: 'OnePlus 12 256GB', category: 'Telefonlar', price: '1 499 ₼' },
  ];

  const setupAutocomplete = (inputId, autocompleteId) => {
    const input = document.getElementById(inputId);
    const autocomplete = document.getElementById(autocompleteId);
    
    if (!input || !autocomplete) return;

    let debounceTimer;

    input.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      clearTimeout(debounceTimer);
      
      if (query.length < 2) {
        autocomplete.classList.remove('active');
        autocomplete.innerHTML = '';
        return;
      }

      debounceTimer = setTimeout(() => {
        const results = searchProducts.filter(product => 
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );

        if (results.length === 0) {
          autocomplete.innerHTML = `
            <div class="autocomplete-item" style="justify-content: center; color: var(--gray-500);">
              Nəticə tapılmadı
            </div>
          `;
        } else {
          autocomplete.innerHTML = results.slice(0, 6).map(product => `
            <a href="#" class="autocomplete-item">
              <div>
                <div class="autocomplete-item-name">${highlightMatch(product.name, query)}</div>
                <div class="autocomplete-item-category">${product.category}</div>
              </div>
              <span class="autocomplete-item-price">${product.price}</span>
            </a>
          `).join('');
        }
        
        autocomplete.classList.add('active');
      }, 200);
    });

    // Close autocomplete on click outside
    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !autocomplete.contains(e.target)) {
        autocomplete.classList.remove('active');
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        autocomplete.classList.remove('active');
      }
    });
  };

  const highlightMatch = (text, query) => {
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  const escapeRegex = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  setupAutocomplete('main-search', 'search-autocomplete');
  setupAutocomplete('hero-search', 'search-autocomplete');

  // ===========================================
  // SMOOTH SCROLL
  // ===========================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = 72;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===========================================
  // PRODUCT CARD HOVER EFFECT
  // ===========================================
  
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ===========================================
  // POPULAR SCROLL DRAG
  // ===========================================
  
  const popularScroll = document.querySelector('.popular-scroll');
  
  if (popularScroll) {
    let isDown = false;
    let startX;
    let scrollLeft;

    popularScroll.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - popularScroll.offsetLeft;
      scrollLeft = popularScroll.scrollLeft;
    });

    popularScroll.addEventListener('mouseleave', () => {
      isDown = false;
    });

    popularScroll.addEventListener('mouseup', () => {
      isDown = false;
    });

    popularScroll.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - popularScroll.offsetLeft;
      const walk = (x - startX) * 2;
      popularScroll.scrollLeft = scrollLeft - walk;
    });
  }

  // ===========================================
  // INITIALIZE
  // ===========================================
  
  console.log('Sərfəli Al initialized');
});
