// invest.js

document.addEventListener('DOMContentLoaded', () => {
    const selectMinerBtn = document.querySelector('.connect-wallet-btn');
    const investPopup = document.getElementById('invest-popup'); // The new popup
    const closeBtns = document.querySelectorAll('.close-btn, .close-btr'); // Ensure to cover both buttons

    const showPopup = (popup) => {
        popup.style.display = 'flex';
        requestAnimationFrame(() => {
            popup.classList.add('show');
        });
    };

    const hidePopup = (popup) => {
        popup.classList.remove('show');
        popup.addEventListener('transitionend', () => {
            if (!popup.classList.contains('show')) {
                popup.style.display = 'none';
            }
        }, { once: true });
    };

    // Handle the 'Select Miner' button click
    selectMinerBtn.addEventListener('click', () => {
        const oldPopup = document.querySelector('.popup.show'); // Find the currently shown popup
        if (oldPopup) {
            hidePopup(oldPopup); // Hide the old popup
        }
        showPopup(investPopup); // Show the new popup
    });

    // Handle closing the new popup
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            hidePopup(investPopup);
        });
    });

    // Optional: Close the new popup when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === investPopup) {
            hidePopup(investPopup);
        }
    });
});
