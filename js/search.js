/**
 * Sərfəli Al - Search Results Page JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ===========================================
  // SORT FUNCTIONALITY
  // ===========================================

  const sortBtn = document.getElementById('sort-btn');
  const sortDropdown = document.getElementById('sort-dropdown');
  const sortOptions = document.querySelectorAll('.sort-option');

  sortBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = sortBtn.getAttribute('aria-expanded') === 'true';
    sortBtn.setAttribute('aria-expanded', !isExpanded);
    sortDropdown?.classList.toggle('active');
  });

  sortOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.preventDefault();
      const sortType = option.dataset.sort;
      
      // Update active state
      sortOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      
      // Update button text
      const sortText = option.textContent.trim();
      sortBtn.querySelector('span').textContent = sortText;
      
      // Close dropdown
      sortBtn.setAttribute('aria-expanded', 'false');
      sortDropdown?.classList.remove('active');
      
      // Here you would implement actual sorting
      console.log('[v0] Sorting by:', sortType);
    });
  });

  // Close sort dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!sortBtn?.contains(e.target) && !sortDropdown?.contains(e.target)) {
      sortBtn?.setAttribute('aria-expanded', 'false');
      sortDropdown?.classList.remove('active');
    }
  });

  // ===========================================
  // FILTER FUNCTIONALITY
  // ===========================================

  const priceMin = document.getElementById('price-min');
  const priceMax = document.getElementById('price-max');
  const priceSliderMin = document.getElementById('price-slider-min');
  const priceSliderMax = document.getElementById('price-slider-max');
  const priceDisplayMin = document.getElementById('price-display-min');
  const priceDisplayMax = document.getElementById('price-display-max');
  const brandCheckboxes = document.querySelectorAll('input[name="brand"]');
  const storageCheckboxes = document.querySelectorAll('input[name="storage"]');
  const discountToggle = document.getElementById('discount-only');
  const stockToggle = document.getElementById('in-stock-only');
  const clearFiltersBtn = document.getElementById('clear-filters');

  // Price range input sync
  const syncPriceInputs = () => {
    let min = parseInt(priceMin.value) || 0;
    let max = parseInt(priceMax.value) || 5000;
    
    if (min > max) [min, max] = [max, min];
    
    priceMin.value = min;
    priceMax.value = max;
    priceSliderMin.value = min;
    priceSliderMax.value = max;
    
    priceDisplayMin.textContent = `₼${min.toLocaleString()}`;
    priceDisplayMax.textContent = `₼${max.toLocaleString()}`;
  };

  priceMin?.addEventListener('input', syncPriceInputs);
  priceMax?.addEventListener('input', syncPriceInputs);
  priceSliderMin?.addEventListener('input', syncPriceInputs);
  priceSliderMax?.addEventListener('input', syncPriceInputs);

  // Brand filters
  brandCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const selected = Array.from(brandCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      console.log('[v0] Selected brands:', selected);
    });
  });

  // Storage filters
  storageCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const selected = Array.from(storageCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      console.log('[v0] Selected storage:', selected);
    });
  });

  // Toggle filters
  discountToggle?.addEventListener('change', () => {
    console.log('[v0] Discount only:', discountToggle.checked);
  });

  stockToggle?.addEventListener('change', () => {
    console.log('[v0] Stock only:', stockToggle.checked);
  });

  // Clear all filters
  clearFiltersBtn?.addEventListener('click', () => {
    priceMin.value = 0;
    priceMax.value = 5000;
    brandCheckboxes.forEach(cb => cb.checked = false);
    storageCheckboxes.forEach(cb => cb.checked = false);
    discountToggle.checked = false;
    stockToggle.checked = false;
    
    syncPriceInputs();
    console.log('[v0] All filters cleared');
  });

  // ===========================================
  // PRODUCT COMPARISON
  // ===========================================

  const compareCheckboxes = document.querySelectorAll('.compare-checkbox');
  const compareBar = document.getElementById('compare-bar');
  const compareSelectedSpan = document.getElementById('compare-selected');
  const compareBtn = document.getElementById('compare-btn');

  const updateCompareBar = () => {
    const selectedCount = Array.from(compareCheckboxes).filter(cb => cb.checked).length;
    compareSelectedSpan.textContent = selectedCount;
    
    if (selectedCount > 0) {
      compareBar.classList.add('active');
    } else {
      compareBar.classList.remove('active');
    }
  };

  compareCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateCompareBar);
  });

  // Compare button click
  compareBtn?.addEventListener('click', () => {
    const selected = Array.from(compareCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => ({
        id: cb.value,
        name: cb.dataset.name
      }));
    
    if (selected.length > 4) {
      alert('Maksimum 4 məhsul müqayisə edə bilərsiniz');
      return;
    }
    
    console.log('[v0] Comparing products:', selected);
    // Here you would navigate to comparison page
  });

  // ===========================================
  // PAGINATION
  // ===========================================

  const paginationPages = document.querySelectorAll('.pagination-page');
  const paginationBtns = document.querySelectorAll('.pagination-btn');

  paginationPages.forEach(page => {
    page.addEventListener('click', (e) => {
      e.preventDefault();
      const pageNum = page.dataset.page;
      
      // Update active state
      paginationPages.forEach(p => p.classList.remove('active'));
      page.classList.add('active');
      
      console.log('[v0] Going to page:', pageNum);
      // Here you would load different products
    });
  });

  paginationBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isNext = btn.classList.contains('next');
      console.log('[v0] Navigation:', isNext ? 'Next' : 'Previous');
      // Here you would handle pagination navigation
    });
  });

  // ===========================================
  // PRODUCT CARD HOVER EFFECTS
  // ===========================================

  const productCards = document.querySelectorAll('.search-product-card');

  productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ===========================================
  // INITIALIZE
  // ===========================================

  console.log('[v0] Search results page initialized');
});
