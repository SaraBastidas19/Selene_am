// login.js

// Función para obtener los usuarios almacenados en localStorage
function obtenerUsuarios() {
    let usuarios = localStorage.getItem('usuarios');
    if (usuarios) {
        return JSON.parse(usuarios);
    } else {
        return [];
    }
}

// Función para validar el inicio de sesión
function validarLogin(username, password) {
    let usuarios = obtenerUsuarios();
    return usuarios.some(usuario => usuario.username === username && usuario.password === password);
}

// Evento para manejar el envío del formulario de login
document.addEventListener('DOMContentLoaded', () => {
    const formularioLogin = document.querySelector('form');

    if (formularioLogin) {
        formularioLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (validarLogin(username, password)) {
                alert('Inicio de sesión exitoso');
                window.location.href = 'inicio.html';
            } else {
                alert('Nombre de usuario o contraseña incorrectos');
            }
        });
    }
});
