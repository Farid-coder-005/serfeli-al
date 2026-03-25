// Product Detail Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Thumbnail Image Selection
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.querySelector('.main-image img');

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      thumbnails.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      mainImage.src = this.src;
    });
  });

  // Specifications Accordion
  const specToggles = document.querySelectorAll('.spec-toggle');

  specToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const isActive = this.classList.contains('active');

      // Close all other sections
      specToggles.forEach(t => {
        if (t !== this) {
          t.classList.remove('active');
          t.nextElementSibling.classList.remove('active');
        }
      });

      // Toggle current section
      this.classList.toggle('active');
      content.classList.toggle('active');
    });
  });

  // Price Alert Form
  const priceAlertForm = document.querySelector('.alert-form');
  if (priceAlertForm) {
    priceAlertForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      const targetPrice = this.querySelector('input[type="number"]').value;
      
      console.log('[v0] Price alert set:', { email, targetPrice });
      alert(`Xəbərdarlıq quruldu! ₼${targetPrice} qiymətinə çatdığında ${email} ünvanına bildiriş göndərəcəyik.`);
      this.reset();
    });
  }

  // Review Feedback Buttons
  const feedbackButtons = document.querySelectorAll('.review-footer span');
  feedbackButtons.forEach(button => {
    button.addEventListener('click', function() {
      const action = this.textContent.includes('Faydalı') ? 'faydalı' : 'faydasız';
      console.log('[v0] Review feedback:', { action, button: this.textContent });
      this.textContent = this.textContent.replace(/\(\d+\)/, '(' + (parseInt(this.textContent.match(/\d+/)[0]) + 1) + ')');
    });
  });

  // Compare Button (if on search page with compare functionality)
  const compareButtons = document.querySelectorAll('.visit-btn');
  compareButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      console.log('[v0] Visiting store:', this.textContent);
    });
  });

  // Write Review Button
  const writeReviewBtn = document.querySelector('.reviews-section > .btn-primary');
  if (writeReviewBtn) {
    writeReviewBtn.addEventListener('click', function() {
      console.log('[v0] Opening review form');
      alert('Rəy yazma forması açılacaq (implementasyon lazımdır)');
    });
  }

  // CTA Buttons
  const primaryBtn = document.querySelector('.product-actions .btn-primary');
  if (primaryBtn) {
    primaryBtn.addEventListener('click', function() {
      console.log('[v0] User clicked: Ən ucuz təklifi gör');
      alert('Ən ucuz mağazaya yönləndirməsi burada işləyəcəkdir');
    });
  }

  // Price Watch Button
  const priceWatchBtn = document.querySelector('.product-actions .btn-secondary');
  if (priceWatchBtn) {
    priceWatchBtn.addEventListener('click', function() {
      console.log('[v0] User clicked: Price watch');
      alert('Qiymət izləmə aktivləşdirildi. Qiymət dəyişəndə bildiriş alacaqsınız.');
    });
  }

  // Share Button
  const shareBtn = document.querySelector('.btn-share');
  if (shareBtn) {
    shareBtn.addEventListener('click', function() {
      const url = window.location.href;
      console.log('[v0] Sharing product:', url);
      
      if (navigator.share) {
        navigator.share({
          title: 'Apple iPhone 15 Pro 256GB',
          text: 'Bu məhsulu Sərfəli Al-da bax',
          url: url
        }).catch(err => console.log('[v0] Share error:', err));
      } else {
        alert('Məhsul linkini kopyala:\n' + url);
      }
    });
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
