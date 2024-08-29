// registros.js

// Función para obtener los usuarios almacenados en localStorage
function obtenerUsuarios() {
    let usuarios = localStorage.getItem('usuarios');
    if (usuarios) {
        return JSON.parse(usuarios);
    } else {
        return [];
    }
}

// Función para guardar los usuarios en localStorage
function guardarUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Función para registrar un nuevo usuario
function registrarUsuario(usuario) {
    let usuarios = obtenerUsuarios();
    usuarios.push(usuario);
    guardarUsuarios(usuarios);
}

// Función para validar los datos del usuario
function validarUsuario(usuario) {
    // Aquí puedes agregar validaciones adicionales según tus necesidades
    if (!usuario.fullName || !usuario.username || !usuario.password || !usuario.confirmPassword) {
        return false;
    }
    if (usuario.password !== usuario.confirmPassword) {
        return false;
    }
    return true;
}

// Función para verificar si el usuario ya existe
function usuarioExiste(username) {
    let usuarios = obtenerUsuarios();
    return usuarios.some(usuario => usuario.username === username);
}

// Evento para manejar el envío del formulario de registro
document.addEventListener('DOMContentLoaded', () => {
    const formularioRegistro1 = document.querySelector('form[action="registro2.html"]');
    const formularioRegistro2 = document.querySelector('form:not([action])');

    if (formularioRegistro1) {
        formularioRegistro1.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = document.getElementById('full-name').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (usuarioExiste(username)) {
                alert('Usuario existente');
                window.location.href = 'login.html';
                return;
            }

            const usuario = { fullName, username, password, confirmPassword };

            if (validarUsuario(usuario)) {
                registrarUsuario(usuario);
                alert('Usuario registrado con éxito');
                window.location.href = 'registro2.html';
            } else {
                alert('Por favor, completa todos los campos correctamente');
            }
        });
    }

    if (formularioRegistro2) {
        formularioRegistro2.addEventListener('submit', (e) => {
            e.preventDefault();
            const birthdate = document.getElementById('birthdate').value;
            const lastCycle = document.getElementById('last-cycle').value;
            const sexualActivity = document.querySelector('input[name="sexual-activity"]:checked').value;
            const recoveryEmail = document.getElementById('recovery-email').value;

            let usuarios = obtenerUsuarios();
            let usuario = usuarios[usuarios.length - 1]; // Obtener el último usuario registrado
            usuario.birthdate = birthdate;
            usuario.lastCycle = lastCycle;
            usuario.sexualActivity = sexualActivity;
            usuario.recoveryEmail = recoveryEmail;

            guardarUsuarios(usuarios);
            alert('Usuario registrado con éxito');
            window.location.href = 'inicio.html';
        });
    }
});
