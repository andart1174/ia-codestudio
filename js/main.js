let currentLang = 'fr'; // Default language

function applyTranslations(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update active state of language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    }
  });
}

function setLanguage(lang) {
  currentLang = lang;
  applyTranslations(lang);
  localStorage.setItem('hub_lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  // Load saved language if available, else default to 'fr'
  const savedLang = localStorage.getItem('hub_lang');
  if (savedLang && (savedLang === 'en' || savedLang === 'fr')) {
    currentLang = savedLang;
  }
  
  applyTranslations(currentLang);

  // Setup event listeners for language toggle
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.target.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  // Simple scroll reveal animation for cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
      }
    });
  });

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });
});

/* Modal Logic */
function openModal(id) {
  const modal = document.getElementById(`modal-${id}`);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
  }
}

function closeModal(id) {
  const modal = document.getElementById(`modal-${id}`);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
  }
}

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

/* FAQ Toggle */
function toggleFaq(btn) {
  const item = btn.parentElement;
  item.classList.toggle('active');
  
  // Close other FAQ items (optional accordion behavior)
  const allItems = document.querySelectorAll('.faq-item');
  allItems.forEach(otherItem => {
    if (otherItem !== item) {
      otherItem.classList.remove('active');
    }
  });
}

/* Contact Form Submission */
function handleContactSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  const originalText = btn.textContent;
  
  // Save message to localStorage
  const nameInput = e.target.querySelector('input[type="text"]').value;
  const emailInput = e.target.querySelector('input[type="email"]').value;
  const messageInput = e.target.querySelector('textarea').value;
  const messages = JSON.parse(localStorage.getItem('ia_messages') || '[]');
  messages.push({
      name: nameInput,
      email: emailInput,
      message: messageInput,
      date: Date.now()
  });
  localStorage.setItem('ia_messages', JSON.stringify(messages));

  // Visual feedback
  btn.disabled = true;
  btn.textContent = currentLang === 'fr' ? 'Envoi en cours...' : 'Sending...';
  
  setTimeout(() => {
    btn.textContent = currentLang === 'fr' ? 'Message Envoyé ! ✅' : 'Message Sent! ✅';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    // Notify admin
    if(typeof adminLog === 'function') {
        adminLog(`📩 Nouveau message de ${emailInput}`);
    }
    if(typeof refreshAdminStats === 'function') {
        refreshAdminStats();
    }
    
    setTimeout(() => {
      closeModal('contact');
      e.target.reset();
      btn.disabled = false;
      btn.textContent = originalText;
      btn.style.background = '';
    }, 2000);
  }, 1500);
}
