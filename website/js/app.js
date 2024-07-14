
if (!window.Telegram || !window.Telegram.WebApp) { 
  window.location.href = '/pages/404.html';
} else { // Telegram Web App доступен 
  let tg = window.Telegram.WebApp;
  tg.expand();
}
