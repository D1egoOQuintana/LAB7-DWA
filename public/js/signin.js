document.addEventListener('DOMContentLoaded', function() {
    // Redirigir si ya está autenticado
    if (isTokenValid(getToken())) {
        const payload = parseJwt(getToken());
        const isAdmin = payload.roles && payload.roles.includes('admin');
        window.location.href = isAdmin ? '/dashboard-admin' : '/dashboard-user';
        return;
    }

    const form = document.getElementById('signinForm');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/auth/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al iniciar sesión');
            }

            // Guardar token
            saveToken(data.token);

            // Mostrar mensaje de éxito
            M.toast({html: '¡Inicio de sesión exitoso!', classes: 'green'});

            // Redirigir según rol
            const payload = parseJwt(data.token);
            const isAdmin = payload.roles && payload.roles.includes('admin');

            setTimeout(() => {
                window.location.href = isAdmin ? '/dashboard-admin' : '/dashboard-user';
            }, 1000);

        } catch (error) {
            errorText.textContent = error.message;
            errorMessage.style.display = 'block';
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 5000);
        }
    });
});