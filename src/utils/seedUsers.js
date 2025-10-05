import bcrypt from 'bcrypt';
import userRepository from '../repositories/UserRepository.js';
import roleRepository from '../repositories/RoleRepository.js';

export default async function seedUsers() {
    try {
        // Verificar si ya existe un usuario admin
        const adminExists = await userRepository.findByEmail('admin@example.com');
        
        if (!adminExists) {
            // Obtener el rol admin
            const adminRole = await roleRepository.findByName('admin');
            
            if (adminRole) {
                const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);
                const hashedPassword = await bcrypt.hash('Admin123@', saltRounds);
                
                await userRepository.create({
                    name: 'Administrador',
                    lastName: 'Sistema',
                    email: 'admin@example.com',
                    password: hashedPassword,
                    phoneNumber: '+1234567890',
                    birthdate: new Date('1990-01-01'),
                    url_profile: '',
                    address: 'Sistema',
                    roles: [adminRole._id]
                });
                
                console.log('✅ Usuario admin creado: admin@example.com / Admin123@');
            }
        }
    } catch (error) {
        console.error('Error al crear usuario admin:', error);
    }
}