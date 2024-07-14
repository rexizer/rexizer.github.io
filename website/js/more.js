document.addEventListener('DOMContentLoaded', () => {
    const moreBtn = document.getElementById('more-btn');
    const navigation = document.querySelector('.navigation');
    const hiddenButtons = document.querySelector('.hidden-buttons-container');
    const navItems = document.querySelectorAll('.nav-item');
    // const leftArrow = document.getElementById('left-arrow');
    // const rightArrow = document.getElementById('right-arrow');
    // const hiddenButtonContainer = document.querySelector('.hidden-button-container');
    // const hiddenButtonElements = document.querySelectorAll('.hidden-button');
    // const maxVisibleItems = 4; // Максимальное количество видимых иконок
    let currentIndex = 0;
  
    // Функция для переключения видимости скрытых кнопок
    const toggleHiddenButtons = () => {
        const isVisible = hiddenButtons.classList.toggle('show');
        navigation.classList.toggle('show');
  
        if (isVisible) {
            moreBtn.classList.add('blinking');
        } else {
            moreBtn.classList.remove('blinking');
        }
    };
  
    moreBtn.addEventListener('click', toggleHiddenButtons);
  
    // Добавляем обработчики для всех кнопок навигации, чтобы скрыть нижнее меню
    navItems.forEach(item => {
        if (item !== moreBtn) {
            item.addEventListener('click', () => {
                hiddenButtons.classList.remove('show');
                navigation.classList.remove('show');
                moreBtn.classList.remove('blinking');
            });
        }
    });
  
    // const updateSlider = () => {
    //     const totalItems = hiddenButtonElements.length;
    //     const itemWidth = hiddenButtonElements[0].offsetWidth + 10; // Ширина иконки + отступ
    //     const containerWidth = hiddenButtonContainer.offsetWidth;
    //     const maxOffset = (itemWidth * totalItems - containerWidth) / itemWidth;
  
    //     hiddenButtonContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  
    //     // Показываем или скрываем стрелки в зависимости от текущего индекса
    //     leftArrow.style.display = currentIndex === 0 ? 'none' : 'block';
    //     rightArrow.style.display = currentIndex >= maxOffset ? 'none' : 'block';
    // };
  
    // leftArrow.addEventListener('click', () => {
    //     if (currentIndex > 0) {
    //         currentIndex--;
    //         updateSlider();
    //     }
    // });
  
    // rightArrow.addEventListener('click', () => {
    //     if (currentIndex < hiddenButtonElements.length - maxVisibleItems) {
    //         currentIndex++;
    //         updateSlider();
    //     }
    // });
  
    // updateSlider(); // Обновить кнопки в начале
});

// function adjustFontSize() {
//   const elements = document.querySelectorAll('h1, h2, h3, p, div, input, span, a, li, button, label');

//   if (window.innerWidth <= 375) {
//     elements.forEach(element => {
//       const currentFontSize = window.getComputedStyle(element).fontSize;
//       if (!element.hasAttribute('data-original-font-size')) {
//         element.setAttribute('data-original-font-size', currentFontSize);
//       }
//       const newFontSize = parseFloat(element.getAttribute('data-original-font-size')) * 0.99;
//       element.style.fontSize = `${newFontSize}px`;
//     });
//   } else {
//     elements.forEach(element => {
//       if (element.hasAttribute('data-original-font-size')) {
//         element.style.fontSize = element.getAttribute('data-original-font-size');
//         element.removeAttribute('data-original-font-size');
//       }
//     });
//   }
// }

window.addEventListener('resize', adjustFontSize);
window.addEventListener('DOMContentLoaded', adjustFontSize); // Вызов функции при загрузке страницы

$(document).ready(function(){
    $('.hidden-button-container').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      prevArrow: '#left-arrow',
      nextArrow: '#right-arrow',
      infinite: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 450,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }
      ]
    });

    const $slider = $('.hidden-button-container');
    const $prevArrow = $('#left-arrow');
    const $nextArrow = $('#right-arrow');
    
    $slider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
        const currentIndex = currentSlide || 0;
        const totalSlides = slick.slideCount;
        const slidesToShow = slick.options.slidesToShow;
    
        if (currentIndex === 0) {
          $prevArrow.css('color', 'transparent').css('pointer-events', 'none');
        } else {
          $prevArrow.css('color', '#fff').css('pointer-events', '');
        }
    
        if (currentIndex >= totalSlides - slidesToShow) {
          $nextArrow.css('color', 'transparent').css('pointer-events', 'none');
        } else {
          $nextArrow.css('color', '').css('pointer-events', '');
        }
    });
});


