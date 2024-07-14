let tg = window.Telegram.WebApp;

if (tg) {
  tg.expand(); 
 

} else {
  window.location.href = 'pages/404.html';
} 
