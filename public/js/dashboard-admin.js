document.addEventListener('DOMContentLoaded', async function() {
    // Verificar autenticación y rol de admin
    if (!checkAuth(['admin'])) {
        return;
    }

    const loadingUsers = document.getElementById('loadingUsers');
    const usersTable = document.getElementById('usersTable');
    const usersTableBody = document.getElementById('usersTableBody');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    // Inicializar modal
    const modalElems = document.querySelectorAll('.modal');
    const modals = M.Modal.init(modalElems);

    // Cargar usuarios
    try {
        const response = await fetchWithAuth('/api/users');
        const users = await response.json();

        // Llenar tabla
        usersTableBody.innerHTML = users.map(user => `
            <tr>
                <td>${user.name || ''} ${user.lastName || ''}</td>
                <td>${user.email}</td>
                <td>${user.phoneNumber || 'N/A'}</td>
                <td>
                    ${user.roles.map(role => 
                        `<span class="chip ${role.name === 'admin' ? 'red lighten-2' : 'blue lighten-2'} white-text">
                            ${role.name}
                        </span>`
                    ).join(' ')}
                </td>
                <td>${new Date(user.createdAt).toLocaleDateString('es-ES')}</td>
                <td>
                    <button class="btn-small blue darken-2 waves-effect waves-light" 
                            onclick="viewUser('${user._id}')">
                        <i class="material-icons">visibility</i>
                    </button>
                </td>
            </tr>
        `).join('');

        loadingUsers.style.display = 'none';
        usersTable.style.display = 'block';

        // Guardar usuarios en variable global para acceso posterior
        window.usersData = users;

    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        errorText.textContent = 'Error al cargar la lista de usuarios';
        errorMessage.style.display = 'block';
        loadingUsers.style.display = 'none';
    }
});

// Función para ver detalles de usuario
function viewUser(userId) {
    const user = window.usersData.find(u => u._id === userId);
    
    if (!user) return;

    const modalContent = document.getElementById('modalUserContent');
    const birthdate = user.birthdate ? new Date(user.birthdate) : null;
    const age = birthdate ? Math.floor((new Date() - birthdate) / (365.25 * 24 * 60 * 60 * 1000)) : 'N/A';

    modalContent.innerHTML = `
        <div class="row">
            <div class="col s12">
                ${user.url_profile ? `
                    <div class="center-align">
                        <img src="${user.url_profile}" alt="Perfil" 
                             class="circle responsive-img" 
                             style="max-width: 150px; margin-bottom: 20px;"
                             onerror="this.src='https://via.placeholder.com/150'">
                    </div>
                ` : ''}
                
                <ul class="collection">
                    <li class="collection-item">
                        <strong><i class="material-icons tiny">person</i> Nombre:</strong> 
                        ${user.name} ${user.lastName || ''}
                    </li>
                    <li class="collection-item">
                        <strong><i class="material-icons tiny">email</i> Email:</strong> 
                        ${user.email}
                    </li>
                    <li class="collection-item">
                        <strong><i class="material-icons tiny">phone</i> Teléfono:</strong> 
                        ${user.phoneNumber || 'N/A'}
                    </li>
                    <li class="collection-item">
                        <strong><i class="material-icons tiny">cake</i> Fecha de Nacimiento:</strong> 
                        ${birthdate ? birthdate.toLocaleDateString('es-ES') : 'N/A'}
                    </li>
                    <li class="collection-item">
                        <strong><i class="material-icons tiny">event</i> Edad:</strong> 
                        ${age} años
                    </li>
                    ${user.address ? `
                        <li class="collection-item">
                            <strong><i class="material-icons tiny">home</i> Dirección:</strong> 
                            ${user.address}
                        </li>
                    ` : ''}
                    <li class="collection-item">
                        <strong><i class="material-icons tiny">verified_user</i> Roles:</strong> 
                        ${user.roles.map(role => 
                            `<span class="chip ${role.name === 'admin' ? 'red lighten-2' : 'blue lighten-2'} white-text">
                                ${role.name}
                            </span>`
                        ).join(' ')}
                    </li>
                    <li class="collection-item">
                        <strong><i class="material-icons tiny">access_time</i> Fecha de Registro:</strong> 
                        ${new Date(user.createdAt).toLocaleString('es-ES')}
                    </li>
                    <li class="collection-item">
                        <strong><i class="material-icons tiny">update</i> Última Actualización:</strong> 
                        ${new Date(user.updatedAt).toLocaleString('es-ES')}
                    </li>
                </ul>
            </div>
        </div>
    `;

    const modal = M.Modal.getInstance(document.getElementById('userModal'));
    modal.open();
}