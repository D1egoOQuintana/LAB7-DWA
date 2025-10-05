import userRepository from '../repositories/UserRepository.js';

class UserService {

    async getAll() {
        return userRepository.getAll();
    }

    async getById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            const err = new Error('Usuario no encontrado');
            err.status = 404;
            throw err;
        }
        return {
            id: user._id,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            birthdate: user.birthdate,
            age: user.age,
            url_profile: user.url_profile,
            address: user.address,
            roles: user.roles.map(r => r.name),
            createdAt: user.createdAt
        };
    }

    async updateUser(id, updateData) {
        const user = await userRepository.findById(id);
        if (!user) {
            const err = new Error('Usuario no encontrado');
            err.status = 404;
            throw err;
        }

        // Actualizar campos permitidos
        if (updateData.name) user.name = updateData.name;
        if (updateData.lastName) user.lastName = updateData.lastName;
        if (updateData.phoneNumber) user.phoneNumber = updateData.phoneNumber;
        if (updateData.birthdate) user.birthdate = updateData.birthdate;
        if (updateData.url_profile !== undefined) user.url_profile = updateData.url_profile;
        if (updateData.address !== undefined) user.address = updateData.address;

        await user.save();

        return {
            id: user._id,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            birthdate: user.birthdate,
            age: user.age,
            url_profile: user.url_profile,
            address: user.address,
            roles: user.roles.map(r => r.name)
        };
    }
}

export default new UserService();