document.addEventListener('DOMContentLoaded', function() {
    // Función para mostrar el nombre de usuario activo
    function displayActiveUser() {
        const activeUser = JSON.parse(localStorage.getItem('activeUser'));

        if (activeUser) {
            document.getElementById('username').value = activeUser.username;
        } else {
            alert('No hay un usuario activo. Por favor, inicie sesión.');
            window.location.href = 'login.html';
        }
    }

    // Función para cambiar la contraseña
    function changePassword() {
        const newPassword = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const activeUser = JSON.parse(localStorage.getItem('activeUser'));

        if (activeUser) {
            const userIndex = users.findIndex(user => user.username === activeUser.username);

            if (userIndex !== -1) {
                users[userIndex].password = newPassword;
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('activeUser', JSON.stringify(users[userIndex]));
                alert('Contraseña cambiada correctamente.');
                window.location.href = 'usuario.html';
            } else {
                alert('Usuario no encontrado.');
            }
        } else {
            alert('No hay un usuario activo. Por favor, inicie sesión.');
            window.location.href = 'login.html';
        }
    }

    // Mostrar el nombre de usuario activo al cargar la página
    displayActiveUser();

    // Evento para cambiar la contraseña al hacer clic en el botón
    const changePasswordButton = document.getElementById('changePasswordButton');
    if (changePasswordButton) {
        changePasswordButton.addEventListener('click', changePassword);
    }
});
