if (!window.Telegram || !window.Telegram.WebApp) { 
     window.location.href = '/pages/404.html';
} 

let tg = window.Telegram.WebApp;

tg.expand();
