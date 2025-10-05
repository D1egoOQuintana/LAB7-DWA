# Express MongoDB Authentication App

Aplicación web de autenticación con Express, MongoDB, JWT y sistema de roles.

## 🚀 Características

- ✅ Autenticación con JWT
- ✅ Sistema de roles (user/admin)
- ✅ Registro e inicio de sesión
- ✅ Gestión de perfiles de usuario
- ✅ Dashboard para usuarios
- ✅ Dashboard administrativo
- ✅ Validación de contraseñas seguras
- ✅ Protección de rutas por roles
- ✅ Interfaz moderna con Materialize CSS

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- MongoDB (corriendo localmente o MongoDB Atlas)
- npm o yarn

## 🔧 Instalación

1. Clonar el repositorio o descargar los archivos

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
El archivo `.env` ya está configurado con valores por defecto:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/auth_db
JWT_SECRET=f14e6a1c9843c52190c07232dfb9c0e467d5a910
JWT_EXPIRES_IN=1h
BCRYPT_SALT_ROUNDS=10
```

4. Asegurarse de que MongoDB esté corriendo:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

5. Iniciar el servidor:
```bash
# Modo desarrollo (con recarga automática)
npm run dev

# Modo producción
npm start
```

## 👤 Usuario Administrador por Defecto

Al iniciar el servidor por primera vez, se crea automáticamente un usuario administrador:

- **Email:** admin@example.com
- **Password:** Admin123@

## 📱 Páginas de la Aplicación

### Páginas Públicas
- `/signin` - Iniciar sesión
- `/signup` - Registrarse

### Páginas Protegidas (requieren autenticación)
- `/profile` - Mi perfil (editar información personal)
- `/dashboard-user` - Dashboard de usuario
- `/dashboard-admin` - Dashboard de administrador (solo rol admin)

### Páginas de Error
- `/403` - Acceso denegado
- `/404` - Página no encontrada

## 🔐 Validación de Contraseñas

Las contraseñas deben cumplir:
- Mínimo 8 caracteres
- Al menos 1 letra mayúscula
- Al menos 1 dígito
- Al menos 1 caracter especial (#, $, %, &, *, @)

Ejemplo válido: `MiPassword123@`

## 📡 API Endpoints

### Autenticación
- `POST /api/auth/signUp` - Registrar nuevo usuario
- `POST /api/auth/signIn` - Iniciar sesión

### Usuarios
- `GET /api/users/me` - Obtener perfil del usuario autenticado
- `PUT /api/users/me` - Actualizar perfil del usuario autenticado
- `GET /api/users` - Listar todos los usuarios (solo admin)

## 🗂️ Estructura del Proyecto

```
express-mongo-auth/
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── auth.js
│       ├── main.js
│       ├── signin.js
│       ├── signup.js
│       ├── profile.js
│       ├── dashboard-user.js
│       └── dashboard-admin.js
├── src/
│   ├── controllers/
│   │   ├── AuthController.js
│   │   ├── UserController.js
│   │   └── WebController.js
│   ├── middlewares/
│   │   ├── authenticate.js
│   │   └── authorize.js
│   ├── models/
│   │   ├── Role.js
│   │   └── User.js
│   ├── repositories/
│   │   ├── RoleRepository.js
│   │   └── UserRepository.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── users.routes.js
│   │   └── web.routes.js
│   ├── services/
│   │   ├── AuthService.js
│   │   └── UserService.js
│   ├── utils/
│   │   ├── seedRoles.js
│   │   └── seedUsers.js
│   ├── views/
│   │   ├── partials/
│   │   │   ├── navbar.ejs
│   │   │   └── footer.ejs
│   │   ├── signin.ejs
│   │   ├── signup.ejs
│   │   ├── profile.ejs
│   │   ├── dashboard-user.ejs
│   │   ├── dashboard-admin.ejs
│   │   ├── 403.ejs
│   │   └── 404.ejs
│   └── server.js
├── .env
├── .env.example
└── package.json
```

## 🔒 Seguridad

- Las contraseñas se encriptan con bcrypt antes de guardarse
- Los tokens JWT tienen tiempo de expiración configurable
- Las rutas están protegidas por middlewares de autenticación y autorización
- Validación de datos en el cliente y servidor

## 🎨 Tecnologías Utilizadas

### Backend
- Express.js - Framework web
- MongoDB - Base de datos
- Mongoose - ODM para MongoDB
- JWT - Autenticación basada en tokens
- Bcrypt - Encriptación de contraseñas

### Frontend
- EJS - Motor de plantillas
- Materialize CSS - Framework de diseño
- JavaScript vanilla - Lógica del cliente

## 📝 Notas

- El servidor se reinicia automáticamente en modo desarrollo cuando detecta cambios
- Los tokens JWT se almacenan en sessionStorage (se borran al cerrar el navegador)
- La sesión expira automáticamente según el tiempo configurado en JWT_EXPIRES_IN

## 🐛 Solución de Problemas

### MongoDB no se conecta
1. Verificar que MongoDB esté corriendo
2. Verificar la URI en el archivo .env
3. Verificar los logs del servidor para más detalles

### Error al iniciar sesión
1. Verificar que el usuario existe en la base de datos
2. Verificar que la contraseña cumple con los requisitos
3. Verificar los logs del navegador (F12)

## 📧 Contacto

Desarrollado por earevalo

## 📄 Licencia

ISC