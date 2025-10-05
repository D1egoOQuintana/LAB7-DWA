document.addEventListener('DOMContentLoaded', async function() {
    // Verificar autenticación
    if (!checkAuth()) {
        return;
    }

    const loadingProfile = document.getElementById('loadingProfile');
    const profileForm = document.getElementById('profileForm');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const successMessage = document.getElementById('successMessage');
    const successText = document.getElementById('successText');

    // Cargar datos del usuario
    try {
        const response = await fetchWithAuth('/api/users/me');
        const user = await response.json();

        // Llenar formulario
        document.getElementById('name').value = user.name || '';
        document.getElementById('lastName').value = user.lastName || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('phoneNumber').value = user.phoneNumber || '';
        document.getElementById('birthdate').value = user.birthdate ? user.birthdate.split('T')[0] : '';
        document.getElementById('age').value = user.age || '';
        document.getElementById('url_profile').value = user.url_profile || '';
        document.getElementById('address').value = user.address || '';
        document.getElementById('roles').textContent = user.roles.join(', ');
        document.getElementById('createdAt').textContent = new Date(user.createdAt).toLocaleDateString('es-ES');

        // Actualizar labels de Materialize
        M.updateTextFields();

        // Mostrar formulario y ocultar loading
        loadingProfile.style.display = 'none';
        profileForm.style.display = 'block';

    } catch (error) {
        console.error('Error al cargar perfil:', error);
        errorText.textContent = 'Error al cargar los datos del perfil';
        errorMessage.style.display = 'block';
        loadingProfile.style.display = 'none';
    }

    // Manejar actualización de perfil
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updateData = {
            name: document.getElementById('name').value,
            lastName: document.getElementById('lastName').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            birthdate: document.getElementById('birthdate').value,
            url_profile: document.getElementById('url_profile').value,
            address: document.getElementById('address').value
        };

        try {
            const response = await fetchWithAuth('/api/users/me', {
                method: 'PUT',
                body: JSON.stringify(updateData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Error al actualizar perfil');
            }

            const updatedUser = await response.json();

            // Actualizar edad
            document.getElementById('age').value = updatedUser.age || '';
            M.updateTextFields();

            // Mostrar mensaje de éxito
            successText.textContent = '¡Perfil actualizado correctamente!';
            successMessage.style.display = 'block';
            errorMessage.style.display = 'none';
            
            M.toast({html: '¡Perfil actualizado!', classes: 'green'});

            // Ocultar mensaje después de 3 segundos
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);

        } catch (error) {
            errorText.textContent = error.message;
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
            
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 5000);
        }
    });
});