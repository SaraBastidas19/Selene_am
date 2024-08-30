document.addEventListener('DOMContentLoaded', () => {
    // Manejar el formulario de Registro 1
    const registerForm1 = document.querySelector('form[action="registro2.html"]');

    if (registerForm1) {
        registerForm1.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevenir envío tradicional del formulario

            // Obtener los valores de los campos del formulario
            const fullName = document.getElementById('full-name').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Verificar que las contraseñas coincidan
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            // Crear un objeto temporal para guardar los datos
            const temporaryUser = {
                fullName: fullName,
                username: username,
                password: password,
                confirmPassword: confirmPassword
            };

            // Guardar en localStorage
            localStorage.setItem('temporaryUser', JSON.stringify(temporaryUser));

            // Redirigir a registro2.html
            window.location.href = 'registro2.html';
        });
    }

    // Manejar el formulario de Registro 2
    const registerForm2 = document.querySelector('form:not([action="registro2.html"])');

    if (registerForm2) {
        registerForm2.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitar el envío tradicional del formulario

            // Obtener los valores de los campos del formulario
            const birthdate = document.getElementById('birthdate').value;
            const lastCycle = document.getElementById('last-cycle').value;
            const sexualActivity = document.querySelector('input[name="sexual-activity"]:checked').value;
            const recoveryEmail = document.getElementById('recovery-email').value;

            // Obtener los datos del primer formulario de registro del localStorage
            const savedUser = JSON.parse(localStorage.getItem('temporaryUser'));

            // Verifica si existe el usuario temporal guardado
            if (!savedUser) {
                alert('Hubo un error en el registro. Por favor, vuelve a intentarlo.');
                return;
            }

            // Crear un nuevo objeto de usuario con los datos de ambos formularios
            const newUser = {
                fullName: savedUser.fullName,
                username: savedUser.username,
                password: savedUser.password,
                birthdate: birthdate,
                lastCycle: lastCycle,
                sexualActivity: sexualActivity,
                recoveryEmail: recoveryEmail
            };

            // Obtén la lista de usuarios existentes en el localStorage
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

            // Agrega el nuevo usuario a la lista
            usuarios.push(newUser);

            // Guarda la lista actualizada en el localStorage
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            // Limpia el usuario temporal del localStorage
            localStorage.removeItem('temporaryUser');

            // Muestra un mensaje de éxito
            alert('¡Usuario registrado exitosamente!');

            // Redirige a inicio.html
            window.location.href = 'inicio.html';
        });
    }
});
