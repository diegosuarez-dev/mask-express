const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true //Ojo! No lo valida Mongoose, sino que crea el index en la DB
    },
    password: {
        type: String,
        required: [true, 'El email es obligatorio'],
        minlength: 8
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user', 'God']
    }
}, {
    toJSON: { //Evitas que ciertos campos vayan al front, pero sí salen en consola (toObject)
        transform: (doc, ret) => {
            delete ret.password;
            return ret;
        },
        virtuals: true
     }
});

// UserSchema.virtual('role-email').get(function () { //para representar cálculos o valores que no se almacenan 
//     const user = this;
//     return {
//         role: user.role,
//         email: user.email
//     }
// });
UserSchema.pre('save', async function (next) { //Para encriptar contraseñas antes de crear o actualizar usuarios
    const user = this;
    user.password = await bcrypt.hash(user.password, 9);
    next();
})
const User = mongoose.model('User',UserSchema);
module.exports = User;