const { registerHelper } = require('hbs');
const User = require('../models/User');
const tokenHandler = require('../services/jwtTokenHandler');
const bcrypt = require('bcryptjs');
const UserController = {
  async getById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(204).send();
      }
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to get the specified user',
        error,
      });
    }
  },
  async update(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      //Gracias al new: true devuelve el usuario tras modificarlo, si no devuelve el anterior
      if (!user) {
        return res.send({ message: 'User nof found in DB' });
      }
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to update the specified user',
        error,
      });
    }
  },
  async delete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.send({ message: 'User nof found in DB' });
      }
      res.send({
        message: 'User succesfully deleted from DB',
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to delete the specified user',
        error,
      });
    }
  },
  async getByEmail(req, res) {
    try {
      const user = await User.findOne({ email: req.params.email });
      if (!user) {
        return res.status(204).send();
      }
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to get the specified user',
        error,
      });
    }
  },
  async getAll(req, res) {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to get all users',
        error,
      });
    }
  },
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).send({
        user,
        token: tokenHandler.createToken(user),
        message: 'User succesfully created',
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to register a new user',
        error,
      });
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(204).send();
      }
      bcrypt.compare(req.body.password, user.password, (err, suc) => {
        if (err) {
          return res
            .status(403)
            .send({ message: 'Access denied. You are not authorized.' });
        }
        if (suc) {
          return res.status(200).send({
            message: 'You have succesfully logged in.',
            token: tokenHandler.createToken(user),
          });
        } else {
          return response.json({
            success: false,
            message: 'passwords do not match',
          });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem when trying to log in',
        error,
      });
    }
  },
};

module.exports = UserController;
