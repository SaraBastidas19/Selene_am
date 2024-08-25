document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Recuperar los datos del usuario de localStorage
    const userData = JSON.parse(localStorage.getItem('user_' + username));
    
    if (!userData) {
        alert('Usuario no encontrado.');
        return;
    }
    
    if (userData.password === password) {
        alert('Inicio de sesión exitoso.');
        window.location.href = 'home.html';  // Redirigir al home después de iniciar sesión
    } else {
        alert('Contraseña incorrecta.');
    }
});
