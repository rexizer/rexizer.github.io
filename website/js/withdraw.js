// js/withdraw.js
document.addEventListener('DOMContentLoaded', () => {
    const withdrawBtn = document.querySelector('.withdraw-btn');
    const withdrawPopup = document.getElementById('withdraw-popup');
    const closePopupBtn = document.querySelector('.close-btr');

    withdrawBtn.addEventListener('click', () => {
        withdrawPopup.style.display = 'flex';
        requestAnimationFrame(() => {
            withdrawPopup.classList.add('show');
        });
    });

    const closePopup = () => {
        withdrawPopup.classList.remove('show');
        withdrawPopup.addEventListener('transitionend', () => {
            if (!withdrawPopup.classList.contains('show')) {
                setTimeout(() => withdrawPopup.style.display = 'none', 300);
            }
        });
    };

    closePopupBtn.addEventListener('click', closePopup);

    window.addEventListener('click', (event) => {
        if (event.target === withdrawPopup) {
            closePopup();
        }
    });
});
