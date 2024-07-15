document.addEventListener('DOMContentLoaded', () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    console.log(screenWidth,screenHeight);
    const upgradeBtn = document.querySelector('.upgrade-btn');
    const popup = document.getElementById('popup');
    const secondaryClosePopup = document.getElementById('secondary-close-popup');
    const boosterOptions = document.querySelectorAll('.booster-option');
    const connectWalletBtn = document.querySelector('.connect-wallet-btn');

    const mintingPower = document.getElementById('minting-power');
    const rentPeriod = document.getElementById('rent-period');
    const rentPrice = document.getElementById('rent-price');
    const maxInvestPrice = document.getElementById('max-invest-price');
    const profit30DaysPercentage = document.getElementById('profit-30days-percentage');
    const dailyProfitPercentage = document.getElementById('daily-profit-percentage');

    const optionsData = {
        option1: {
            power: '10 GH/s',
            period: '30 days',
            price: '1.5 TON',
            maxPrice: '347 TON',
            profit30Days: '125% TON',
            dailyProfit: '4,16% TON',
            pngImage: 'images/turbino-mini.png',
            gifImage: 'images/turbino-mini.gif'
        },
        option2: {
            power: '100 GH/s',
            period: '30 days',
            price: '5 TON',
            maxPrice: '693 TON',
            profit30Days: '130% TON',
            dailyProfit: '4,33% TON',
            pngImage: 'images/turbino-medium.png',
            gifImage: 'images/turbino-medium.gif'
        },
        option3: {
            power: '1,000 GH/s',
            period: '30 days',
            price: '15 TON',
            maxPrice: '1387 TON',
            profit30Days: '135% TON',
            dailyProfit: '4,50% TON',
            pngImage: 'images/turbino-large.png',
            gifImage: 'images/turbino-large.gif'
        }
    };

    let selectedOption = 'option1';

    upgradeBtn.addEventListener('click', () => {
        popup.style.display = 'flex';
        setTimeout(() => {
          popup.classList.add('show');
        }, 300);
      });

    const closePopupFunction = () => {
        popup.classList.remove('show');
        popup.addEventListener('transitionend', () => {
            if (!popup.classList.contains('show')) {
                // setTimeout(() => {
                // popup.style.transform =  "translateY(100%)";
                
                // popup.style.display = 'none'
                // }, 300);
            }
        });
    };

    secondaryClosePopup.addEventListener('click', closePopupFunction);

    window.addEventListener('click', (event) => {
        const popupContent = document.querySelector(".popup-content");
        if (!popupContent.contains(event.target) && event.target !== connectWalletBtn) {
            closePopupFunction();
        }
    });

    boosterOptions.forEach(option => {
        option.addEventListener('click', () => {
            boosterOptions.forEach(opt => {
                opt.classList.remove('active');
                const optId = opt.id;
                opt.querySelector('img').src = optionsData[optId].pngImage;
            });

            option.classList.add('active');

            selectedOption = option.id;
            const data = optionsData[selectedOption];

            mintingPower.textContent = data.power;
            rentPeriod.textContent = data.period;
            rentPrice.textContent = data.price;
            maxInvestPrice.textContent = data.maxPrice;
            profit30DaysPercentage.textContent = data.profit30Days;
            dailyProfitPercentage.textContent = data.dailyProfit;

            option.querySelector('img').src = data.gifImage;
        });
    });

    // Initialize with the first option
    boosterOptions[0].classList.add('active');
    const initialData = optionsData['option1'];
    mintingPower.textContent = initialData.power;
    rentPeriod.textContent = initialData.period;
    rentPrice.textContent = initialData.price;
    maxInvestPrice.textContent = initialData.maxPrice;
    profit30DaysPercentage.textContent = initialData.profit30Days;
    dailyProfitPercentage.textContent = initialData.dailyProfit;
    boosterOptions[0].querySelector('img').src = initialData.gifImage;

    connectWalletBtn.addEventListener('click', () => {
        console.log("hello world");
        setTimeout(() => {
          popup.classList.remove('show');
          const selectedData = optionsData[selectedOption];
          const walletPopup = document.createElement('div');
          walletPopup.className = 'popup2';
          walletPopup.innerHTML = `
            <div class="popup2-content">
              <div class="popup2-inner-content">
                <div class="popup2-header">
                  <img src="${selectedData.gifImage}" alt="Logo" class="header-logo">
                  <div class="header-text">
                    <span>${selectedData.power}</span>
                  </div>
                </div>
                <p><b>Minting Power ⚡</b><span>${selectedData.power}</span></p>
                <p><b>Rent Period ⚡</b><span>${selectedData.period}</span></p>
                <p><b>Minimum Invest price ⚡</b><span>${selectedData.price}</span></p>
                <p><b>Max Invest price ⚡</b><span>${selectedData.maxPrice}</span></p>
                <p><b>30 Days Profit 🔥</b> <span>${selectedData.profit30Days}</span></p>
                <p><b>Daily 🔥</b> <span>${selectedData.dailyProfit}</span></p>
                <div class='frame'>
                  <input type="number" placeholder="Write the number of TON">
                  <button class="connect-wallet-btn">CONNECT WALLET</button>
                  <button class="close-btn">Close</button>
                </div>
              </div>
            </div>
          `;


          const clickableBlock = document.getElementById('.popup2-content');
          const inputField = document.getElementById('.frame input');
        
          let initialViewportHeight = window.innerHeight;
        
          // Функция для проверки, открыта ли клавиатура
          function isKeyboardOpen() {
            return window.innerHeight < initialViewportHeight;
          }
        
          clickableBlock.addEventListener('click', () => {
            if (isKeyboardOpen()) {
              // Убираем фокус с элемента ввода, чтобы закрыть клавиатуру
              inputField.blur();
            }
          });
        
          // Обновляем начальную высоту окна при изменении размера окна
          window.addEventListener('resize', () => {
            if (window.innerHeight > initialViewportHeight) {
              initialViewportHeight = window.innerHeight;
            }
          });
      
          document.body.appendChild(walletPopup);
          setTimeout(() => {
            walletPopup.classList.add('show');
          }, 300);
      
          // закрытие - работает, не трогать 
          walletPopup.querySelector(".close-btn").addEventListener("click", () => {
            setTimeout(() => {
              walletPopup.style.transform = "translate(-50%, 150%) scale(1)";
            }, 300);
            setTimeout(() => {
              walletPopup.remove();
            }, 600);
          });
        }, 200);
      });
      
});
