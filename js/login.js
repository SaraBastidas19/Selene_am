document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            let users = JSON.parse(localStorage.getItem('users')) || [];
            let user = users.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem('activeUser', JSON.stringify(user));
                alert('Inicio de sesión exitoso.');
                window.location.href = 'inicio.html';
            } else {
                alert('Nombre de usuario o contraseña incorrectos.');
            }
        });
    }
});
