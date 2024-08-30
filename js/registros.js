document.addEventListener('DOMContentLoaded', () => {
    // Función para guardar datos del primer formulario
    const saveRegistro1 = () => {
        const fullName = document.getElementById('full-name').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Guardar datos en localStorage
        const user = {
            fullName,
            username,
            password,
            confirmPassword
        };

        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    };

    // Función para cargar datos del primer formulario en el segundo formulario
    const loadRegistro1Data = () => {
        const fullName = localStorage.getItem('fullName');
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        const confirmPassword = localStorage.getItem('confirmPassword');

        if (fullName && username && password && confirmPassword) {
            document.getElementById('full-name').value = fullName;
            document.getElementById('username').value = username;
            document.getElementById('password').value = password;
            document.getElementById('confirm-password').value = confirmPassword;
        }
    };

    // Función para guardar datos del segundo formulario
    const saveRegistro2 = () => {
        const birthdate = document.getElementById('birthdate').value;
        const lastCycle = document.getElementById('last-cycle').value;
        const sexualActivity = document.querySelector('input[name="sexual-activity"]:checked').value;
        const recoveryEmail = document.getElementById('recovery-email').value;

        // Actualizar datos del usuario en localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let user = users[users.length - 1];
        user.birthdate = birthdate;
        user.lastCycle = lastCycle;
        user.sexualActivity = sexualActivity;
        user.recoveryEmail = recoveryEmail;

        users[users.length - 1] = user;
        localStorage.setItem('users', JSON.stringify(users));
    };

    // Evento para guardar datos del primer formulario al hacer clic en "Siguiente"
    const registro1Form = document.getElementById('registro1Form');
    if (registro1Form) {
        registro1Form.addEventListener('submit', (event) => {
            event.preventDefault();
            saveRegistro1();
            window.location.href = 'registro2.html';
        });
    }

    // Evento para guardar datos del segundo formulario al hacer clic en "Regístrate"
    const registro2Form = document.getElementById('registro2Form');
    if (registro2Form) {
        registro2Form.addEventListener('submit', (event) => {
            event.preventDefault();
            saveRegistro2();
            alert('Usuario registrado correctamente.');
            window.location.href = 'login.html';
        });
    }

    // Cargar datos del primer formulario en el segundo formulario
    if (document.title === 'Registro 2 - Selene') {
        loadRegistro1Data();
    }
});
