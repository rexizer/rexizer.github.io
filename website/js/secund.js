document.addEventListener('DOMContentLoaded', function() {
    const valueElement = document.getElementById('tonValue'); // Получаем элемент, содержащий числовое значение
    let currentBalance = parseFloat(valueElement.textContent); // Изначальное значение

    function updateBalance(timestamp) {
        const incrementPerSecond = 0.000000099; // Насколько увеличивать баланс за одну секунду
        const now = Date.now();
        const increment = incrementPerSecond * ((now - (window.lastTimestamp || now)) / 1000); // Вычисляем приращение в зависимости от прошедшего времени
        currentBalance += increment;
        window.lastTimestamp = now; // Обновляем временную метку

        valueElement.textContent = currentBalance.toFixed(9); // Обновляем только числовое значение
        requestAnimationFrame(updateBalance); // Запрашиваем следующий кадр для плавной анимации
    }

    requestAnimationFrame(updateBalance); // Запускаем анимацию
});
