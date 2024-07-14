document.addEventListener('DOMContentLoaded', function() {
  const gamesContainer = document.getElementById('games');
  const paginationContainer = document.getElementById('pagination');
  const itemsPerPage = 15;
  let currentPage = 1;
  let games = [];

  function fetchApps() {
    fetch('../jsons/games.json')
      .then(response => response.json())
      .then(data => {
        games = data;
        renderPage(currentPage);
        if (games.length > itemsPerPage) {
          createPagination();
        }
      })
      .catch(error => console.error('Error loading data:', error));
  }

  function renderPage(page) {
    gamesContainer.innerHTML = '';
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const gamesToDisplay = games.slice(start, end);

    gamesToDisplay.forEach(app => {
      const appItem = document.createElement('div');
      appItem.className = 'app-item';
      appItem.innerHTML = `
        <div class="app-icon-wrapper">
          <img src="${app.icon}" alt="App Icon" class="app-icon">
        </div>
        <div class="app-info">
          <p class="app-name">${app.name}</p>
          <p class="app-status">${app.status}</p>
        </div>
        <button class="open-button">Open</button>
      `;
      gamesContainer.appendChild(appItem);
    });

    updatePagination();
  }

  function createPagination() {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(games.length / itemsPerPage);

    const prevButton = document.createElement('button');
    prevButton.className = 'button page-number';
    prevButton.innerHTML = '«';
    prevButton.onclick = prevPage;
    paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.className = 'button page-number';
      pageButton.innerHTML = i;
      pageButton.onclick = () => goToPage(i);
      paginationContainer.appendChild(pageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.className = 'button page-number';
    nextButton.innerHTML = '»';
    nextButton.onclick = nextPage;
    paginationContainer.appendChild(nextButton);

    updatePagination();
  }

  function updatePagination() {
    const totalPages = Math.ceil(games.length / itemsPerPage);
    const pageButtons = document.querySelectorAll('.page-number');
    
    pageButtons.forEach(button => {
      if (button.innerHTML === '«') {
        button.disabled = currentPage === 1;
      } else if (button.innerHTML === '»') {
        button.disabled = currentPage === totalPages;
      } else {
        button.classList.remove('active');
        if (parseInt(button.innerHTML) === currentPage) {
          button.classList.add('active');
        }
      }
    });
  }

  window.nextPage = function() {
    if (currentPage < Math.ceil(games.length / itemsPerPage)) {
      currentPage++;
      renderPage(currentPage);
    }
  };

  window.prevPage = function() {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
    }
  };

  window.goToPage = function(page) {
    currentPage = page;
    renderPage(currentPage);
  };

  fetchApps();
});
