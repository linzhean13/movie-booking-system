document.querySelectorAll('.rating').forEach((span) => {
  const level = span.dataset.level; // 取出 data-level，例如 "輔12"
  const img = document.createElement('img');
  img.src = `images/ratings/${level}.png`;
  img.alt = level;
  img.style.height = '35px'; // 可自行調整大小
  img.style.width = '35px';
  img.style.verticalAlign = 'middle';
  span.appendChild(img);
});

document.getElementById('adminLink').addEventListener('click', function (e) {
    e.preventDefault(); // 停止原本跳轉 login.html 的行為
    // 檢查登入狀態
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      // 已登入 → 進入後台
      window.location.href = 'admin.html';
    } else {
      // 未登入 → 回原本預設的 login.html
      window.location.href = 'login.html';
    }
  });