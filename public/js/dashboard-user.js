document.addEventListener('DOMContentLoaded', async function() {
    // Verificar autenticación
    if (!checkAuth()) {
        return;
    }

    const userInfoDiv = document.getElementById('userInfo');

    // Cargar información del usuario
    try {
        const response = await fetchWithAuth('/api/users/me');
        const user = await response.json();

        // Actualizar rol en la tarjeta
        document.getElementById('userRole').textContent = user.roles.join(', ');
        
        // Mostrar información del usuario
        userInfoDiv.innerHTML = `
            <ul class="collection">
                <li class="collection-item">
                    <strong>Nombre Completo:</strong> ${user.name} ${user.lastName}
                </li>
                <li class="collection-item">
                    <strong>Email:</strong> ${user.email}
                </li>
                <li class="collection-item">
                    <strong>Teléfono:</strong> ${user.phoneNumber}
                </li>
                <li class="collection-item">
                    <strong>Edad:</strong> ${user.age} años
                </li>
                ${user.address ? `<li class="collection-item"><strong>Dirección:</strong> ${user.address}</li>` : ''}
                <li class="collection-item">
                    <strong>Miembro desde:</strong> ${new Date(user.createdAt).toLocaleDateString('es-ES')}
                </li>
            </ul>
        `;

    } catch (error) {
        console.error('Error al cargar información:', error);
        userInfoDiv.innerHTML = `
            <div class="card-panel red lighten-4 red-text">
                <i class="material-icons left">error</i>
                Error al cargar la información
            </div>
        `;
    }
});