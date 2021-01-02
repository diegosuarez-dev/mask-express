const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Address = require('./Address');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    address: {
      type: Address,
      required: true,
    },
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
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  }
);
UserSchema.pre('save', async function (next) {
  //Para encriptar contraseñas antes de crear usuarios
  const user = this;
  user.password = await bcrypt.hash(user.password, 9);
  next();
});
UserSchema.pre('updateOne', async function (next) {
  const user = this;
  if (user._update.password) {
    user._update.password = await bcrypt.hash(user._update.password, 9);
  }
  next();
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
