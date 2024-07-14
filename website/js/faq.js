document.addEventListener('DOMContentLoaded', function() {
  const accordion = document.getElementById('accordion');

  // Загрузка данных из JSON
  fetch('../jsons/faq.json')
    .then(response => response.json())
    .then(faqs => {
      // Функция для создания FAQ элементов
      function createFaqElement(faq) {
        const card = document.createElement('div');
        card.className = 'card';

        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';
        cardHeader.id = `faqHeading-${faq.id}`;

        const mb0 = document.createElement('div');
        mb0.className = 'mb-0';

        const h5 = document.createElement('h2');
        h5.className = 'faq-title';
        h5.setAttribute('data-toggle', 'collapse');
        h5.setAttribute('data-target', `#faqCollapse-${faq.id}`);
        h5.setAttribute('aria-expanded', 'false');
        h5.setAttribute('aria-controls', `faqCollapse-${faq.id}`);
        h5.innerHTML = `<img src="${faq.image}" class="faq-image" alt="FAQ Image ${faq.id}"/> ${faq.question}`;

        mb0.appendChild(h5);
        cardHeader.appendChild(mb0);
        card.appendChild(cardHeader);

        const faqCollapse = document.createElement('div');
        faqCollapse.id = `faqCollapse-${faq.id}`;
        faqCollapse.className = 'collapse';
        faqCollapse.setAttribute('aria-labelledby', `faqHeading-${faq.id}`);
        faqCollapse.setAttribute('data-parent', '#accordion');

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        cardBody.innerHTML = `<p>${faq.answer}</p>`;

        faqCollapse.appendChild(cardBody);
        card.appendChild(faqCollapse);

        return card;
      }

      // Вставка FAQ элементов в accordion
      faqs.forEach(faq => {
        const faqElement = createFaqElement(faq);
        accordion.appendChild(faqElement);
      });
    })
    .catch(error => console.error('Error loading data:', error));
});
