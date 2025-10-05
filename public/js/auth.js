// Utilidades de autenticación

// Parsear JWT
function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

// Verificar si el token es válido
function isTokenValid(token) {
    if (!token) return false;
    
    const payload = parseJwt(token);
    if (!payload) return false;
    
    // Verificar si el token ha expirado
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
        return false;
    }
    
    return true;
}

// Obtener token del sessionStorage
function getToken() {
    return sessionStorage.getItem('token');
}

// Guardar token en sessionStorage
function saveToken(token) {
    sessionStorage.setItem('token', token);
}

// Eliminar token
function removeToken() {
    sessionStorage.removeItem('token');
}

// Cerrar sesión
function logout() {
    removeToken();
    M.toast({html: 'Sesión cerrada correctamente', classes: 'green'});
    setTimeout(() => {
        window.location.href = '/signin';
    }, 1000);
}

// Verificar autenticación en páginas protegidas
function checkAuth(requiredRoles = []) {
    const token = getToken();
    
    if (!isTokenValid(token)) {
        M.toast({html: 'Sesión expirada. Por favor, inicia sesión nuevamente.', classes: 'red'});
        setTimeout(() => {
            window.location.href = '/signin';
        }, 1500);
        return false;
    }
    
    // Verificar roles si se especifican
    if (requiredRoles.length > 0) {
        const payload = parseJwt(token);
        const userRoles = payload.roles || [];
        
        const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
        
        if (!hasRequiredRole) {
            M.toast({html: 'No tienes permisos para acceder a esta página.', classes: 'red'});
            setTimeout(() => {
                window.location.href = '/403';
            }, 1500);
            return false;
        }
    }
    
    return true;
}

// Hacer peticiones HTTP con token
async function fetchWithAuth(url, options = {}) {
    const token = getToken();
    
    if (!isTokenValid(token)) {
        M.toast({html: 'Sesión expirada', classes: 'red'});
        setTimeout(() => {
            window.location.href = '/signin';
        }, 1500);
        throw new Error('Token inválido o expirado');
    }
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
    };
    
    const response = await fetch(url, {
        ...options,
        headers
    });
    
    if (response.status === 401) {
        M.toast({html: 'Sesión expirada', classes: 'red'});
        removeToken();
        setTimeout(() => {
            window.location.href = '/signin';
        }, 1500);
        throw new Error('No autorizado');
    }
    
    if (response.status === 403) {
        M.toast({html: 'No tienes permisos suficientes', classes: 'red'});
        setTimeout(() => {
            window.location.href = '/403';
        }, 1500);
        throw new Error('Prohibido');
    }
    
    return response;
}