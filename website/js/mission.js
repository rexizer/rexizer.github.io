document.addEventListener('DOMContentLoaded', function() {
  const tasksPerPage = 10;
  let currentPage = 1;
  const tasksContainer = document.getElementById('tasks');
  const paginationContainer = document.getElementById('pagination');

  const tasks = [
    {
      img: 'https://cdn-icons-png.flaticon.com/512/906/906377.png',
      name: 'Telegram Icon',
      title: 'Join Telegram channel',
      reward: 0.001,
      link: 'https://example.com/mission1'
    },
    {
      img: 'https://cdn-icons-png.flaticon.com/512/906/906377.png',
      name: 'Telegram Icon',
      title: 'Join Chat Group',
      reward: 0.001,
      link: 'https://example.com/mission2'
    },
	{
      img: '../images/jointwitter.png',
      name: 'Telegram Icon',
      title: 'Join Twitter',
      reward: 0.001,
      link: 'https://example.com/mission1'
    },
    {
      img: '../images/social.png',
      name: 'Telegram Icon',
      title: 'Join Instagram',
      reward: 0.001,
      link: 'https://example.com/mission2'
    }
  ];
  
  function renderTasks() {
    tasksContainer.innerHTML = '';
    const start = (currentPage - 1) * tasksPerPage;
    const end = start + tasksPerPage;
    const tasksToDisplay = tasks.slice(start, end);
    let i = 0;
  
    tasksToDisplay.forEach(task => {
      const taskElement = document.createElement('div');
      i++;
      taskElement.className = 'task';
      taskElement.innerHTML = `
        <div class='task_left'>
          <img src="${task.img}" alt="${task.name}">
          <div class="task-info">
            <p class="task-title"><strong>${task.title}</strong></p>
            <p class="task-reward"><b>+ ${task.reward} </b><img style="width: 25px !important; height: 25px !important;" src="../images/toncoin.png"/></p>
          </div>
        </div>
        <div class='task_right'>
          <div class='buttons'>
            <button class="mission-button">Go mission</button>
            <button class="check-button">Check</button>
          </div>
          
          <i class="fas fa-times-circle"></i>
          <div id="message${i}" class="message">Задание выполнено</div>
        </div>
        
      `;
      taskElement.querySelector('.mission-button').onclick = function() {
        window.open(task.link, '_blank');
      };
      taskElement.querySelector('.check-button').onclick = function() {
        taskElement.classList.add('completed')
        if (taskElement.classList.contains('completed')) {
          showMessage('Задание выполнено', i);
        }
      };
      tasksContainer.appendChild(taskElement);
    });
  }
  
  function showMessage(message, id) {
    const messageElement = document.getElementById(`message${id}`);
    messageElement.textContent = message;
    messageElement.classList.add('show');
    setTimeout(() => {
      messageElement.classList.remove('show');
    }, 2000);
  }

  function renderPagination() {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(tasks.length / tasksPerPage);

    const prevButton = document.createElement('button');
    prevButton.textContent = '«';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = function() {
      if (currentPage > 1) {
        currentPage--;
        renderTasks();
        renderPagination();
      }
    };
    paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.className = currentPage === i ? 'active' : '';
      pageButton.onclick = function() {
        currentPage = i;
        renderTasks();
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
        renderTasks();
        renderPagination();
      }
    };
    paginationContainer.appendChild(nextButton);
  }


  renderTasks();


  function toggleTask(element, id) {
    if (element.classList.contains('completed')) {
      // showMessage('Задание выполнено', id);
      let checkButton = element.querySelector('.check-button')
      let missionButton = element.querySelector('.mission-button')

      const icon = element.querySelector('i');
      icon.classList.remove('fa-times-circle');
      if (!icon.classList.contains("fa-check-circle")){
        icon.classList.add('loader');
      }
      
      setTimeout(() => {
        icon.classList.remove('loader');
        icon.classList.add('fa-check-circle');
        icon.style.color = "#218838";
        element.classList.add('completed');
        checkButton.classList.add('green');
        missionButton.style.display = "none";
      }, 3000);
    }
  }
  const tasks1 = document.querySelectorAll('.task');
  let i2 =0;
  tasks1.forEach(task => {
    i2++;
    task.addEventListener('click', function() {
      toggleTask(task, i2);
    });
  });
  renderPagination();
});
