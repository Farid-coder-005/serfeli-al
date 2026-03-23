/**
 * Sərfəli Al - Main JavaScript
 * Premium Price Comparison Platform
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ===========================================
  // HEADER SCROLL EFFECT
  // ===========================================
  
  const header = document.querySelector('.header');
  
  const handleHeaderScroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

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
    
    // Change icon
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
  // SEARCH AUTOCOMPLETE
  // ===========================================
  
  const searchProducts = [
    { name: 'iPhone 15 Pro 256GB', category: 'Telefonlar', price: '2549 ₼' },
    { name: 'iPhone 15 Pro Max 512GB', category: 'Telefonlar', price: '3299 ₼' },
    { name: 'iPhone 15 128GB', category: 'Telefonlar', price: '1899 ₼' },
    { name: 'Samsung Galaxy S24 Ultra', category: 'Telefonlar', price: '2199 ₼' },
    { name: 'MacBook Air M3 15"', category: 'Noutbuklar', price: '2099 ₼' },
    { name: 'MacBook Pro 14" M3', category: 'Noutbuklar', price: '3499 ₼' },
    { name: 'Sony WH-1000XM5', category: 'Qulaqlıqlar', price: '509 ₼' },
    { name: 'Apple Watch Series 9', category: 'Ağıllı Saatlar', price: '699 ₼' },
    { name: 'PlayStation 5 Slim', category: 'Oyun Konsolları', price: '649 ₼' },
    { name: 'LG OLED C3 55"', category: 'Televizorlar', price: '2519 ₼' },
    { name: 'iPad Pro 12.9" M2', category: 'Planşetlər', price: '2199 ₼' },
    { name: 'Samsung Galaxy Tab S9', category: 'Planşetlər', price: '1499 ₼' },
  ];

  const setupAutocomplete = (inputId, autocompleteId) => {
    const input = document.getElementById(inputId);
    const autocomplete = document.getElementById(autocompleteId);
    
    if (!input || !autocomplete) return;

    const resultsContainer = autocomplete.querySelector('.autocomplete-results');
    const loadingContainer = autocomplete.querySelector('.autocomplete-loading');
    
    let debounceTimer;

    input.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      clearTimeout(debounceTimer);
      
      if (query.length < 2) {
        autocomplete.classList.remove('active');
        return;
      }

      // Show loading state
      autocomplete.classList.add('active');
      if (loadingContainer) loadingContainer.classList.add('active');
      if (resultsContainer) resultsContainer.innerHTML = '';

      debounceTimer = setTimeout(() => {
        const results = searchProducts.filter(product => 
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );

        if (loadingContainer) loadingContainer.classList.remove('active');

        if (results.length === 0) {
          if (resultsContainer) {
            resultsContainer.innerHTML = `
              <div style="padding: 1rem; text-align: center; color: var(--gray-500);">
                Nəticə tapılmadı
              </div>
            `;
          }
        } else {
          if (resultsContainer) {
            resultsContainer.innerHTML = results.slice(0, 6).map(product => `
              <a href="#" class="autocomplete-item" role="option">
                <div class="autocomplete-item-info">
                  <span class="autocomplete-item-name">${highlightMatch(product.name, query)}</span>
                  <span class="autocomplete-item-category">${product.category}</span>
                </div>
                <span class="autocomplete-item-price">${product.price}</span>
              </a>
            `).join('');
          }
        }
      }, 300);
    });

    // Close autocomplete on click outside
    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !autocomplete.contains(e.target)) {
        autocomplete.classList.remove('active');
      }
    });

    // Keyboard navigation
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        autocomplete.classList.remove('active');
        input.blur();
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

  setupAutocomplete('hero-search', 'hero-autocomplete');
  setupAutocomplete('nav-search-input', 'nav-autocomplete');

  // Add autocomplete item styles dynamically
  const autocompleteStyles = document.createElement('style');
  autocompleteStyles.textContent = `
    .autocomplete-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      cursor: pointer;
      transition: background 0.15s ease;
    }
    .autocomplete-item:hover {
      background: var(--gray-50);
    }
    .autocomplete-item-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .autocomplete-item-name {
      font-weight: 500;
      color: var(--ink);
    }
    .autocomplete-item-name mark {
      background: var(--primary-lighter);
      color: var(--primary);
      padding: 0 2px;
      border-radius: 2px;
    }
    .autocomplete-item-category {
      font-size: 0.75rem;
      color: var(--gray-500);
    }
    .autocomplete-item-price {
      font-family: var(--font-heading);
      font-weight: 700;
      color: var(--primary);
    }
  `;
  document.head.appendChild(autocompleteStyles);

  // ===========================================
  // FAQ ACCORDION
  // ===========================================
  
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const answerId = answer?.id;
    
    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQs
      faqItems.forEach(faq => {
        if (faq !== item) {
          faq.classList.remove('active');
          faq.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current FAQ
      item.classList.toggle('active');
      question.setAttribute('aria-expanded', !isActive);
    });
  });

  // ===========================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ===========================================
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // Trigger chart animation if it's the price chart
        if (entry.target.classList.contains('price-history-chart')) {
          const chartLine = entry.target.querySelector('.chart-line-animated');
          chartLine?.classList.add('animated');
        }
        
        // Trigger step progress animation
        if (entry.target.classList.contains('how-step')) {
          entry.target.classList.add('in-view');
        }
        
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-fade').forEach(el => {
    revealObserver.observe(el);
  });

  // Observe chart and steps
  document.querySelectorAll('.price-history-chart, .how-step').forEach(el => {
    revealObserver.observe(el);
  });

  // ===========================================
  // COUNTER ANIMATION
  // ===========================================
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.target, 10);
        animateCounter(counter, target);
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
  });

  const animateCounter = (element, target) => {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeOutQuart(progress);
      const current = Math.floor(start + (target - start) * easeProgress);
      
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };
    
    requestAnimationFrame(updateCounter);
  };

  const easeOutQuart = (x) => {
    return 1 - Math.pow(1 - x, 4);
  };

  // ===========================================
  // DEALS CAROUSEL
  // ===========================================
  
  const setupCarousel = (trackId, prevBtnId, nextBtnId) => {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    
    if (!track) return;

    const scrollAmount = 280;

    prevBtn?.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn?.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Update button states based on scroll position
    const updateButtons = () => {
      if (prevBtn) {
        prevBtn.style.opacity = track.scrollLeft <= 0 ? '0.5' : '1';
        prevBtn.disabled = track.scrollLeft <= 0;
      }
      if (nextBtn) {
        const maxScroll = track.scrollWidth - track.clientWidth;
        nextBtn.style.opacity = track.scrollLeft >= maxScroll - 10 ? '0.5' : '1';
        nextBtn.disabled = track.scrollLeft >= maxScroll - 10;
      }
    };

    track.addEventListener('scroll', updateButtons, { passive: true });
    updateButtons();
  };

  setupCarousel('deals-track', 'deals-prev', 'deals-next');

  // ===========================================
  // PRICE ANIMATION ON FLOATING CARD
  // ===========================================
  
  const animatePriceCards = () => {
    const priceRows = document.querySelectorAll('.floating-card .price-row');
    let currentHighlight = 0;
    
    setInterval(() => {
      priceRows.forEach((row, index) => {
        row.classList.toggle('highlight', index === currentHighlight);
      });
      currentHighlight = (currentHighlight + 1) % priceRows.length;
    }, 3000);
  };

  animatePriceCards();

  // ===========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ===========================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===========================================
  // CATEGORIES DROPDOWN KEYBOARD NAVIGATION
  // ===========================================
  
  const categoriesDropdown = document.querySelector('.nav-categories-dropdown');
  const categoriesBtn = categoriesDropdown?.querySelector('.nav-categories-btn');
  const dropdownMenu = categoriesDropdown?.querySelector('.categories-dropdown-menu');
  const dropdownItems = dropdownMenu?.querySelectorAll('.category-dropdown-item');

  categoriesBtn?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      categoriesBtn.setAttribute('aria-expanded', 'true');
      dropdownItems?.[0]?.focus();
    }
  });

  dropdownItems?.forEach((item, index) => {
    item.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextItem = dropdownItems[index + 1] || dropdownItems[0];
        nextItem.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevItem = dropdownItems[index - 1] || dropdownItems[dropdownItems.length - 1];
        prevItem.focus();
      } else if (e.key === 'Escape') {
        categoriesBtn.setAttribute('aria-expanded', 'false');
        categoriesBtn.focus();
      }
    });
  });

  // ===========================================
  // SORT SELECT FUNCTIONALITY
  // ===========================================
  
  const sortSelect = document.getElementById('sort-select');
  const comparisonTable = document.querySelector('.comparison-tbody');
  
  sortSelect?.addEventListener('change', () => {
    const sortValue = sortSelect.value;
    const rows = Array.from(comparisonTable?.querySelectorAll('.comparison-row') || []);
    
    rows.sort((a, b) => {
      const priceA = parseInt(a.querySelector('.price-current')?.textContent.replace(/\D/g, '') || '0', 10);
      const priceB = parseInt(b.querySelector('.price-current')?.textContent.replace(/\D/g, '') || '0', 10);
      
      switch(sortValue) {
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'discount':
          const discountA = a.classList.contains('best-deal-row') ? 2 : (a.querySelector('.badge-real') ? 1 : 0);
          const discountB = b.classList.contains('best-deal-row') ? 2 : (b.querySelector('.badge-real') ? 1 : 0);
          return discountB - discountA;
        default:
          return 0;
      }
    });
    
    // Re-append sorted rows
    rows.forEach(row => comparisonTable?.appendChild(row));
  });

  // ===========================================
  // NEWSLETTER FORM
  // ===========================================
  
  const newsletterForm = document.querySelector('.newsletter-form');
  
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]')?.value;
    
    if (email) {
      // Show success feedback
      const btn = newsletterForm.querySelector('button');
      const originalHTML = btn?.innerHTML;
      
      if (btn) {
        btn.innerHTML = '<i class="ph ph-check"></i>';
        btn.style.background = 'var(--success)';
        
        setTimeout(() => {
          btn.innerHTML = originalHTML || '';
          btn.style.background = '';
          newsletterForm.reset();
        }, 2000);
      }
    }
  });

  // ===========================================
  // BUTTON RIPPLE EFFECT
  // ===========================================
  
  document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple styles
  const rippleStyles = document.createElement('style');
  rippleStyles.textContent = `
    .btn-primary {
      position: relative;
      overflow: hidden;
    }
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    }
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyles);

  // ===========================================
  // SKELETON LOADER DEMO
  // ===========================================
  
  // Simulate loading state on deal cards if needed
  const simulateLoading = (container, duration = 1000) => {
    const cards = container?.querySelectorAll('.deal-card, .recommendation-card');
    
    cards?.forEach(card => {
      card.classList.add('skeleton-loading');
    });
    
    setTimeout(() => {
      cards?.forEach(card => {
        card.classList.remove('skeleton-loading');
      });
    }, duration);
  };

  // ===========================================
  // PERFORMANCE: LAZY LOAD IMAGES
  // ===========================================
  
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          lazyImageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => lazyImageObserver.observe(img));
  }

  // ===========================================
  // ACCESSIBILITY: FOCUS TRAP FOR MODALS
  // ===========================================
  
  const trapFocus = (element) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    });
  };

  // Apply focus trap to mobile menu
  if (mobileMenu) {
    trapFocus(mobileMenu);
  }

  // ===========================================
  // INITIALIZE
  // ===========================================
  
  console.log('Sərfəli Al - Platform initialized successfully');
});
