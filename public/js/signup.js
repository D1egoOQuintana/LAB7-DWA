document.addEventListener('DOMContentLoaded', function() {
    // Redirigir si ya está autenticado
    if (isTokenValid(getToken())) {
        M.toast({html: 'Ya tienes una sesión activa', classes: 'orange'});
        setTimeout(() => {
            window.location.href = '/dashboard-user';
        }, 1500);
        return;
    }

    // Inicializar datepicker
    const datepickers = document.querySelectorAll('.datepicker');
    M.Datepicker.init(datepickers, {
        format: 'yyyy-mm-dd',
        yearRange: [1920, new Date().getFullYear()],
        maxDate: new Date(),
        defaultDate: new Date(2000, 0, 1),
        setDefaultDate: true,
        i18n: {
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
            weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            cancel: 'Cancelar',
            done: 'Aceptar'
        }
    });

    const form = document.getElementById('signupForm');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const successMessage = document.getElementById('successMessage');
    const successText = document.getElementById('successText');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            birthdate: document.getElementById('birthdate').value,
            password: document.getElementById('password').value,
            url_profile: document.getElementById('url_profile').value,
            address: document.getElementById('address').value,
            roles: ['user'] // Rol por defecto
        };

        // Validar password
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[#$%&*@]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            errorText.textContent = 'La contraseña debe tener mínimo 8 caracteres, 1 mayúscula, 1 dígito y 1 caracter especial (#$%&*@)';
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
            return;
        }

        try {
            const response = await fetch('/api/auth/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al registrar usuario');
            }

            // Mostrar mensaje de éxito
            successText.textContent = '¡Registro exitoso! Redirigiendo al inicio de sesión...';
            successMessage.style.display = 'block';
            errorMessage.style.display = 'none';
            
            M.toast({html: '¡Registro exitoso!', classes: 'green'});

            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                window.location.href = '/signin';
            }, 2000);

        } catch (error) {
            errorText.textContent = error.message;
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 5000);
        }
    });
});