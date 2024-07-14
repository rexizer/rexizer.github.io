document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    const navItems = document.querySelectorAll('.nav-item');

    function addTouchEventListeners(element) {
        element.addEventListener('touchstart', () => {
            element.style.transform = 'scale(0.95)';
        });

        element.addEventListener('touchend', () => {
            element.style.transform = 'scale(1)';
        });

        element.addEventListener('touchcancel', () => {
            element.style.transform = 'scale(1)';
        });
    }

    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
        });

        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });

        addTouchEventListeners(button);
    });

    navItems.forEach(item => {
        item.addEventListener('mousedown', () => {
            item.style.transform = 'translateY(2px)';
        });

        item.addEventListener('mouseup', () => {
            item.style.transform = 'translateY(0)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });

        item.addEventListener('touchstart', () => {
            item.style.transform = 'translateY(2px)';
        });

        item.addEventListener('touchend', () => {
            item.style.transform = 'translateY(0)';
        });

        item.addEventListener('touchcancel', () => {
            item.style.transform = 'translateY(0)';
        });
    });
});
