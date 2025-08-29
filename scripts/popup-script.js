// Popup functionality for fake websites
document.addEventListener('DOMContentLoaded', function() {
  console.log('Popup script loaded');
  
  // Debug: Check if popup elements exist
  console.log('About popup element:', document.getElementById('about-popup'));
  console.log('Resume popup element:', document.getElementById('resume-popup'));
  console.log('Contact popup element:', document.getElementById('contact-popup'));
  
  // Close popup when clicking outside
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('popup-overlay')) {
      const popup = e.target;
      const type = popup.id.replace('-popup', '');
      closePopup(type);
    }
  });

  // Close popup with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const visiblePopup = document.querySelector('.popup-overlay:not(.hidden)');
      if (visiblePopup) {
        const type = visiblePopup.id.replace('-popup', '');
        closePopup(type);
      }
    }
  });
});

// Global functions for onclick handlers
window.openPopup = function(type) {
  console.log('Opening popup for:', type);
  console.log('Looking for element with ID:', `${type}-popup`);
  
  const popup = document.getElementById(`${type}-popup`);
  console.log('Found popup element:', popup);
  
  if (!popup) {
    console.error('Popup element not found:', type);
    console.error('Available popup elements:', document.querySelectorAll('[id*="-popup"]'));
    return;
  }
  
  // Show popup
  popup.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
  console.log('Popup opened successfully');
};

window.closePopup = function(type) {
  console.log('Closing popup for:', type);
  const popup = document.getElementById(`${type}-popup`);
  if (popup) {
    popup.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restore scrolling
    console.log('Popup closed successfully');
  }
};

