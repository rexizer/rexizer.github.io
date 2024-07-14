document.querySelector('main').addEventListener('mousemove', function(event) {
  const digits = document.querySelectorAll('.digit');
  const centerX = this.offsetWidth / 2;
  const centerY = this.offsetHeight / 2;
  const mouseX = event.clientX - this.getBoundingClientRect().left - centerX;
  const mouseY = event.clientY - this.getBoundingClientRect().top - centerY;
  const rotateX = (mouseY / centerY) * -10;
  const rotateY = (mouseX / centerX) * 10;

  digits.forEach(digit => {
    digit.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
});
