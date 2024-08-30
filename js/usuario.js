// Función para guardar datos en localStorage al registrarse
function saveUserData() {
    const username = document.getElementById('username').value;
    const birthYear = document.getElementById('birthYear').value;

    localStorage.setItem('username', username);
    localStorage.setItem('birthYear', birthYear);
}

// Llama a esta función cuando el usuario se registre
document.getElementById('registerButton').addEventListener('click', saveUserData);

// Función para mostrar datos en la página de usuario
function displayUserData() {
    const username = localStorage.getItem('username');
    const birthYear = localStorage.getItem('birthYear');

    if (username && birthYear) {
        document.getElementById('displayUsername').textContent = `Nombre de Usuario: ${username}`;
        document.getElementById('displayBirthYear').textContent = `Año de Nacimiento: ${birthYear}`;
    }
}

// Llama a esta función cuando la página de usuario se cargue
window.onload = displayUserData;

// Configura los botones para redirigir a otras páginas
document.getElementById('seguirCicloButton').addEventListener('click', function() {
    window.location.href = 'seguir-ciclo.html';
});

document.getElementById('cambiarContraseñaButton').addEventListener('click', function() {
    window.location.href = 'cambiar-contraseña.html';
});
