document.addEventListener('DOMContentLoaded', function() {
    // Función para mostrar datos en la página de usuario
    function displayUserData() {
        const activeUser = JSON.parse(localStorage.getItem('activeUser'));

        if (activeUser) {
            document.getElementById('displayUsername').textContent = `Nombre de Usuario: ${activeUser.username}`;
            document.getElementById('displayBirthYear').textContent = `Año de Nacimiento: ${activeUser.birthdate}`;
            document.getElementById('userNameHeader').textContent = activeUser.username; // Actualiza el encabezado con el nombre de usuario
        } else {
            document.getElementById('displayUsername').textContent = "Nombre de Usuario: No disponible";
            document.getElementById('displayBirthYear').textContent = "Año de Nacimiento: No disponible";
            document.getElementById('userNameHeader').textContent = "User"; // Valor por defecto si no hay datos
        }
    }

    // Llama a esta función cuando la página de usuario se cargue
    displayUserData();

    // Configura los botones para redirigir a otras páginas
    const seguirCicloButton = document.getElementById('seguirCicloButton');
    const cambiarContraseñaButton = document.getElementById('cambiarContraseñaButton');

    if (seguirCicloButton) {
        seguirCicloButton.addEventListener('click', function() {
            window.location.href = 'calendario.html';
        });
    }

    if (cambiarContraseñaButton) {
        cambiarContraseñaButton.addEventListener('click', function() {
            window.location.href = 'recuperar_contraseña.html';
        });
    }
});
