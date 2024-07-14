let tg = window.Telegram.WebApp;

if (tg.initDataUnsafe.user.id) {
  tg.expand();
  document.body.innerHTML = '<h1>тест</h1><p>тест.</p>';
 

} else {
  window.location.href = '/pages/404.html';
} 
