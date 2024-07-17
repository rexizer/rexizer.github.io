document.addEventListener('DOMContentLoaded', function () {
  const body = document.body.querySelector("main");
  console.log(body);

  // Создание контейнера
  const box = document.createElement('div');
  box.className = 'box';
  body.appendChild(box);

  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'cards is-active';
  box.appendChild(cardsContainer);

  fetch('../jsons/cardsData.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(cardsData => {
      function createCard(data, index) {
        const card = document.createElement('div');
        card.className = `card card--${index + 1}`;
        card.style.transform = `translateY(calc(${index * 13.2857}% - ${index * 0.214286}rem))`;
        if (index === 2) card.classList.add('is-active');

        const cardTitle = document.createElement('h2');
        const imgTitle = document.createElement('img');
        imgTitle.classList.add("img_card")
        imgTitle.src = "../images/maps.png";
        cardTitle.className = 'card__title';
		cardTitle.textContent = `MEGA Q${index + 1}`;
        cardTitle.appendChild(imgTitle);
        card.appendChild(cardTitle);

        const schedules = document.createElement('dl');
        schedules.className = 'schedules';
        data.times.forEach((time, i) => {
          const dt = document.createElement('dt');
          dt.className = 'schedules__time';
          dt.textContent = time;
          schedules.appendChild(dt);

          const dd = document.createElement('dd');
          dd.className = 'schedules__info';
          const p = document.createElement('p');
          const span = document.createElement('span');
          span.textContent = data.texts[i];
	  span.style = "font-size: 18px;"
          p.appendChild(span);
          dd.appendChild(p);

          schedules.appendChild(dd);
        });

        card.appendChild(schedules);
        return card;
      }

      // Генерация карт на основе данных
      cardsData.forEach((data, index) => {
        const card = createCard(data, index);
        cardsContainer.appendChild(card);
      });

      let card = {};

      card.wrap = document.querySelector('.cards');
      card.new = document.querySelector('.new-card');

      card.wrap.addEventListener('click', (e) => {
        if (e.target.classList.contains('card__title')) {
          let parentCard = e.target.parentElement;
          let isActive = parentCard.classList.contains('is-active');
          let activedItem = card.wrap.querySelector('.card.is-active');

          if (!isActive && !!activedItem) {
            activedItem.classList.toggle('is-active');
          }
          parentCard.classList.toggle('is-active');
          card.wrap.classList.toggle('is-active', !isActive);
        }
      });
    })
    .catch(error => console.error('Error loading data:', error));
});
