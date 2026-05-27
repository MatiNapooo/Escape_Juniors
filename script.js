// Scroll reveal (IntersectionObserver)
(function initReveal(){
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("in-view"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("in-view");
    });
  }, { threshold: 0.15 });

  els.forEach(el => io.observe(el));
})();

// Accordion
(function initAccordion(){
  const root = document.querySelector("[data-accordion]");
  if (!root) return;

  const items = Array.from(root.querySelectorAll(".acc-item"));
  const panels = Array.from(root.querySelectorAll(".acc-panel"));

  function closeAll(exceptIndex = -1){
    items.forEach((btn, i) => {
      const expanded = i === exceptIndex;
      btn.setAttribute("aria-expanded", expanded ? "true" : "false");

      const icon = btn.querySelector(".acc-icon");
      if (icon) icon.textContent = expanded ? "—" : "+";

      const panel = panels[i];
      if (!panel) return;
      panel.classList.toggle("open", expanded);
    });
  }

  // Inicial: el primero abierto si viene marcado así
  const firstOpen = panels.findIndex(p => p.classList.contains("open"));
  closeAll(firstOpen >= 0 ? firstOpen : 0);

  items.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      closeAll(isOpen ? -1 : i);
    });
  });
})();

// Reviews Slider
(function initReviewsSlider() {
  const slider = document.getElementById("reviewsSlider");
  const prevBtn = document.getElementById("prevReview");
  const nextBtn = document.getElementById("nextReview");

  if (!slider || !prevBtn || !nextBtn) return;

  const getScrollAmount = () => {
    // Scroll one card width plus gap (approximately)
    return slider.clientWidth > 768 ? 370 : slider.clientWidth * 0.8;
  };

  nextBtn.addEventListener("click", () => {
    slider.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    slider.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });
})();

// Booking Modal
(function initBookingModal() {
  const modal = document.getElementById('bookingModal');
  const openBtns = document.querySelectorAll('.open-booking-modal');
  const closeBtn = document.querySelector('.booking-modal-close');
  const overlay = document.querySelector('.booking-modal-overlay');

  if (!modal) return;

  const openModal = (e) => {
    e.preventDefault();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent scrolling on body
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  // Auto-open if hash matches
  if (window.location.hash === '#bookingModal') {
    openModal({ preventDefault: () => {} });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
})();

// Mobile Menu
(function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const overlay = document.getElementById('mobileMenu');
  const links = document.querySelectorAll('.mobile-link');
  const closeBtn = overlay ? overlay.querySelector('.mobile-menu-close') : null;

  if (!btn || !overlay) return;

  const toggleMenu = () => {
    const isOpen = overlay.classList.contains('open');
    if (isOpen) {
      overlay.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      overlay.classList.add('open');
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  btn.addEventListener('click', toggleMenu);
  if (closeBtn) closeBtn.addEventListener('click', toggleMenu);

  // Close menu when a link is clicked
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (overlay.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // Close when clicking overlay (outside the panel)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay && overlay.classList.contains('open')) {
      toggleMenu();
    }
  });
})();
