const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    name: String,
    country: String,
    phone: {
      type: Number,
      minlength: 9,
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true, //Ojo! No lo valida Mongoose, sino que crea el index en la DB
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: 8,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['admin', 'user', 'seller'],
    },
  },
  {
    toJSON: {
      //Evitas que ciertos campos vayan al front, pero sí salen en consola (toObject)
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
      //virtuals: true,
    },
  }
);

// UserSchema.virtual('role-email').get(function () { //para representar cálculos o valores que no se almacenan
//     const user = this;
//     return {
//         role: user.role,
//         email: user.email
//     }
// });
UserSchema.pre('save', async function (next) {
  //Para encriptar contraseñas antes de crear usuarios
  const user = this;
  user.password = await bcrypt.hash(user.password, 9);
  next();
});
UserSchema.pre('updateOne', async function (next) {
  const user = this;
  user._update.password = await bcrypt.hash(user._update.password, 9);
  next();
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
