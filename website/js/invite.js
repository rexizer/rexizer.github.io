document.addEventListener('DOMContentLoaded', function() {
  const inviteeList = document.getElementById('invitee-list');
  const pagination = document.getElementById('pagination');
  const itemsPerPage = 15;
  let currentPage = 1;
  let users = [];

  fetch('../jsons/invite.json')
    .then(response => response.json())
    .then(data => {
      users = data;
      displayPage(currentPage);
      if (users.length > itemsPerPage) {
        createPagination();
      }
    })
    .catch(error => console.error('Error loading data:', error));

  function displayPage(page) {
    inviteeList.innerHTML = '';
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = users.slice(start, end);

    paginatedItems.forEach(user => {
      const inviteeItem = document.createElement('div');
      inviteeItem.className = 'invitee-item';

      const inviteeDetails = document.createElement('div');
      inviteeDetails.className = 'invitee-details';
      
      const avatar = document.createElement('img');
      avatar.src = user.avatar;
      avatar.alt = user.name;

      const nameAndBonus = document.createElement('div');
      nameAndBonus.className = 'name-and-bonus';

      const name = document.createElement('p');
      name.textContent = user.name;

      const bonus = document.createElement('p');
      bonus.className = 'invitee-bonus';
      bonus.textContent = user.bonus;

      nameAndBonus.appendChild(name);
      nameAndBonus.appendChild(bonus);

      inviteeDetails.appendChild(avatar);
      inviteeDetails.appendChild(nameAndBonus);

      const inviteeActions = document.createElement('div');
      inviteeActions.className = 'invitee-actions';

      const reward = document.createElement('span');
      reward.className = 'invitee-reward';
      reward.innerHTML = `(+${user.reward}) <img src="../images/toncoin.png" class="small-avatar" alt="avatar">`;

      inviteeActions.appendChild(reward);

      inviteeItem.appendChild(inviteeDetails);
      inviteeItem.appendChild(inviteeActions);

      inviteeList.appendChild(inviteeItem);
    });

    updatePagination();
  }

  function createPagination() {
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const prevButton = document.createElement('button');
    prevButton.className = 'button page-number';
    prevButton.innerHTML = '«';
    prevButton.onclick = prevPage;
    pagination.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.className = 'button page-number';
      pageButton.innerHTML = i;
      pageButton.onclick = () => goToPage(i);
      pagination.appendChild(pageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.className = 'button page-number';
    nextButton.innerHTML = '»';
    nextButton.onclick = nextPage;
    pagination.appendChild(nextButton);

    updatePagination();
  }

  function updatePagination() {
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const pageButtons = document.querySelectorAll('.page-number');
    
    pageButtons.forEach((button, index) => {
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
    if (currentPage < Math.ceil(users.length / itemsPerPage)) {
      currentPage++;
      displayPage(currentPage);
    }
  };

  window.prevPage = function() {
    if (currentPage > 1) {
      currentPage--;
      displayPage(currentPage);
    }
  };

  window.goToPage = function(page) {
    currentPage = page;
    displayPage(currentPage);
  };
});
