import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true 
    },
    password: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                // Min 8 caracteres, min 1 mayúscula, min 1 dígito, min un caracter especial
                return /^(?=.*[A-Z])(?=.*\d)(?=.*[#$%&*@]).{8,}$/.test(v);
            },
            message: 'Password debe tener mínimo 8 caracteres, 1 mayúscula, 1 dígito y 1 caracter especial (#$%&*@)'
        }
    },
    phoneNumber: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    url_profile: {
        type: String
    },
    address: {
        type: String
    },
    roles: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Role' 
    }]
}, { timestamps: true });

// Método virtual para calcular edad
UserSchema.virtual('age').get(function() {
    if (!this.birthdate) return null;
    const today = new Date();
    const birthDate = new Date(this.birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});

// Asegurar que los virtuals se incluyan en JSON
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

export default mongoose.model('User', UserSchema);