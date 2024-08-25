function goToStep2() {
    document.querySelector('.step1').style.display = 'none';
    document.querySelector('.step2').style.display = 'block';
}

document.querySelector('#register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('full-name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const birthDate = document.getElementById('birth-date').value;
    const lastCycleDate = document.getElementById('last-cycle-date').value;
    const sexualActivity = document.getElementById('sexual-activity').value;
    const recoveryEmail = document.getElementById('recovery-email').value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    // Guardar los datos en localStorage
    const userData = {
        fullName: fullName,
        username: username,
        password: password,
        birthDate: birthDate,
        lastCycleDate: lastCycleDate,
        sexualActivity: sexualActivity,
        recoveryEmail: recoveryEmail
    };

    localStorage.setItem('user_' + username, JSON.stringify(userData));
    alert('Registro completado exitosamente.');
    window.location.href = 'login.html';  // Redirigir a la página de inicio de sesión después del registro
});
