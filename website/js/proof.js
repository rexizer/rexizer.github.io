document.addEventListener('DOMContentLoaded', function() {
  const transactionsPerPage = 10;
  let currentPage = 1;
  const transactionsContainer = document.getElementById('transactions');
  const paginationContainer = document.getElementById('pagination');

  function fetchTransactions() {
    fetch('../jsons/transactions.json')
      .then(response => response.json())
      .then(data => {
        transactions = data;
        renderTransactions();
        renderPagination();
      })
      .catch(error => console.error('Error loading data:', error));
  }

  function renderTransactions() {
    transactionsContainer.innerHTML = '';
    const start = (currentPage - 1) * transactionsPerPage;
    const end = start + transactionsPerPage;
    const transactionsToDisplay = transactions.slice(start, end);

    transactionsToDisplay.forEach(transaction => {
      const transactionElement = document.createElement('div');
      transactionElement.className = 'transaction';
      transactionElement.innerHTML = `
          <div class='transaction_left'>
              <img src="${transaction.img}" alt="${transaction.username}">
              <div class="transaction-info">
                  <p class="transaction-username"><strong>${transaction.username}</strong> (+${transaction.ton}<img src="../images/toncoin.png">)</p>
                  <button class="check-button" onclick="window.open('${transaction.user_trans}')">check transaction</button>
              </div>
          </div>
          <div class='transaction_right'>
              <div class="transaction-buttons">
                  <button class="mission-button check_user withdraw-btn" onclick="window.open('${transaction.user_account}')">check user</button>
              </div>
          </div>
      `;
      transactionsContainer.appendChild(transactionElement);
    });
  }

  function renderPagination() {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(transactions.length / transactionsPerPage);

    const prevButton = document.createElement('button');
    prevButton.textContent = '«';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = function() {
      if (currentPage > 1) {
        currentPage--;
        renderTransactions();
        renderPagination();
      }
    };
    paginationContainer.appendChild(prevButton);

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (currentPage === 1) {
      endPage = Math.min(totalPages, 3);
    } else if (currentPage === totalPages) {
      startPage = Math.max(1, totalPages - 2);
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.className = currentPage === i ? 'active' : '';
      pageButton.onclick = function() {
        currentPage = i;
        renderTransactions();
        renderPagination();
      };
      paginationContainer.appendChild(pageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = '»';
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = function() {
      if (currentPage < totalPages) {
        currentPage++;
        renderTransactions();
        renderPagination();
      }
    };
    paginationContainer.appendChild(nextButton);
  }

  fetchTransactions();
});

function navigateTo(page) {
  window.location.href = page;
}
