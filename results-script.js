document.addEventListener('DOMContentLoaded', () => {
  const resultsSearchBar = document.getElementById('results-search-bar');
  const resultsSearchBtn = document.getElementById('results-search-btn');
  const resultsSearchSuggestions = document.getElementById('results-search-suggestions');
  const resultsSearchForm = document.getElementById('results-search-form');
  const resultsPage = document.getElementById('results-page');

  // Results page search bar suggestion dropdown
  function showResultsSuggestionDropdown() {
    if (resultsSearchBar && document.activeElement === resultsSearchBar) {
      resultsSearchSuggestions.innerHTML = '<div class="suggestion" tabindex="0">do a barrel roll</div>';
      resultsSearchSuggestions.classList.remove('hidden');
      const suggestion = resultsSearchSuggestions.querySelector('.suggestion');
      suggestion.addEventListener('mousedown', (e) => {
        e.preventDefault();
        resultsSearchBar.value = 'do a barrel roll';
        hideResultsSuggestionDropdown();
        resultsSearchBar.focus();
      });
      suggestion.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          resultsSearchBar.value = 'do a barrel roll';
          hideResultsSuggestionDropdown();
          resultsSearchBar.focus();
        }
      });
    }
  }
  
  function hideResultsSuggestionDropdown() {
    resultsSearchSuggestions.classList.add('hidden');
    resultsSearchSuggestions.innerHTML = '';
  }
  
  if (resultsSearchBar) {
    resultsSearchBar.addEventListener('focus', showResultsSuggestionDropdown);
    resultsSearchBar.addEventListener('input', showResultsSuggestionDropdown);
    resultsSearchBar.addEventListener('blur', () => {
      setTimeout(hideResultsSuggestionDropdown, 120);
    });
  }

  // Prevent form submission from reloading page
  if (resultsSearchForm) {
    resultsSearchForm.addEventListener('submit', e => {
      e.preventDefault();
    });
  }

  // Barrel roll logic - apply to the body element instead
  function triggerBarrelRoll() {
    if (resultsPage) {
      // If results-page element exists, use it
      resultsPage.classList.remove('barrel-roll');
      void resultsPage.offsetWidth;
      resultsPage.classList.add('barrel-roll');
    } else {
      // Otherwise, apply to body element
      document.body.classList.remove('barrel-roll');
      void document.body.offsetWidth;
      document.body.classList.add('barrel-roll');
    }
  }

  // Results page search bar (barrel roll only here)
  resultsSearchBtn && resultsSearchBtn.addEventListener('click', () => {
    if (resultsSearchBar.value.trim().toLowerCase() === 'do a barrel roll') {
      triggerBarrelRoll();
    }
  });
  
  resultsSearchBar && resultsSearchBar.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (resultsSearchBar.value.trim().toLowerCase() === 'do a barrel roll') {
        triggerBarrelRoll();
      }
    }
  });

  // Click Google logo on results page to return to landing and replay animation
  const resultsLogo = document.querySelector('.google-logo-img.small');
  if (resultsLogo) {
    resultsLogo.style.cursor = 'pointer';
    resultsLogo.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
});
