document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('fake-cursor');
  const searchBar = document.getElementById('search-bar');
  const searchBtn = document.getElementById('search-btn');
  const luckyBtn = document.getElementById('lucky-btn');

  // Navigate to web.html
  function navigateToWeb() {
    console.log('Navigating to web.html...');
    // Simple direct navigation
    window.location.href = 'web.html';
  }

  // Handle manual search
  function handleSearch(query) {
    navigateToWeb();
  }

  searchBtn && searchBtn.addEventListener('click', () => {
    handleSearch(searchBar.value);
  });
  luckyBtn && luckyBtn.addEventListener('click', () => {
    handleSearch(searchBar.value);
  });
  searchBar && searchBar.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(searchBar.value);
    }
  });

  // Animation logic
  function moveCursorTo(x, y, duration = 600) {
    return new Promise(resolve => {
      cursor.style.display = 'block';
      cursor.style.transition = `left ${duration}ms cubic-bezier(.4,0,.2,1), top ${duration}ms cubic-bezier(.4,0,.2,1)`;
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';
      setTimeout(resolve, duration + 30);
    });
  }

  function getCenterPos(el) {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 + window.scrollX,
      y: rect.top + rect.height / 2 + window.scrollY
    };
  }

  function typeText(el, text, delay = 80) {
    return new Promise(async resolve => {
      el.focus();
      el.value = '';
      for (let i = 0; i < text.length; i++) {
        el.value += text[i];
        await new Promise(r => setTimeout(r, delay + Math.random() * 40));
      }
      resolve();
    });
  }

  async function runAnimation() {
    try {
      // Start cursor off-screen
      cursor.style.position = 'absolute';
      cursor.style.left = '-40px';
      cursor.style.top = '60vh';
      cursor.style.display = 'block';

      // Move to search bar
      const barPos = getCenterPos(searchBar);
      await moveCursorTo(barPos.x - 180, barPos.y - 10, 700);
      await moveCursorTo(barPos.x, barPos.y, 400);
      
      // Simulate click and type
      cursor.classList.add('clicking');
      searchBar.focus();
      setTimeout(() => cursor.classList.remove('clicking'), 120);
      await new Promise(r => setTimeout(r, 200));
      
      await typeText(searchBar, 'Who is Mitra Farzami?');
      await new Promise(r => setTimeout(r, 400));
      
      // Move to search button
      const btnPos = getCenterPos(searchBtn);
      await moveCursorTo(btnPos.x, btnPos.y, 400);
      
      // Simulate click
      cursor.classList.add('clicking');
      setTimeout(() => cursor.classList.remove('clicking'), 120);
      await new Promise(r => setTimeout(r, 200));
      
      // Hide cursor and wait a bit before navigation
      cursor.style.display = 'none';
      await new Promise(r => setTimeout(r, 1000));
      
      // Navigate to web.html
      console.log('Animation complete, navigating...');
      navigateToWeb();
      
    } catch (error) {
      console.error('Animation error:', error);
      // Fallback navigation
      setTimeout(() => {
        navigateToWeb();
      }, 2000);
    }
  }

  // Start animation after a short delay
  setTimeout(runAnimation, 700);

  // Ensure navigation happens even if animation fails
  setTimeout(() => {
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
      navigateToWeb();
    }
  }, 8000);
}); 