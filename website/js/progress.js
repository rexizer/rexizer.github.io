document.addEventListener('DOMContentLoaded', function() {
    const progress = document.getElementById('fluidProgress');
    let value = parseInt(progress.value, 10); // Получаем начальное значение из HTML

    function updateProgress() {
        if (value < 100) {
            value++;
            progress.value = value;
        } else {
            value = 0; // Сбрасываем прогресс после достижения 100%
        }
    }

    setInterval(updateProgress, 1000); // Обновляем прогресс каждую секунду
});
