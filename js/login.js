const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // 模擬帳密驗證：可自訂
    const validUsername = 'user001';
    const validPassword = 'password';

    if (username === validUsername && password === validPassword) {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'admin.html';
    } else {
    errorMsg.textContent = '帳號或密碼錯誤';
    }
});