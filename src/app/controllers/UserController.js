/* eslint-disable consistent-return */
import User from "../models/User";

class UserController {
  async store(req, res) {
    // Create a new user
    try {
      const user = new User(req.body);

      await user.save();

      const token = await user.generateAuthToken();

      return res.status(201).send({ user, token });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not exists" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async index(req, res) {
    try {
      const users = await User.find({});

      if (!users) {
        return res.status(404).json({ message: "Not exists users" });
      }

      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const userUpdated = await user.updateOne(req.body);

      if (!userUpdated.ok) {
        return res.status(400).json({ message: "Error in update" });
      }

      return res.status(205).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not exists" });
      }

      await user.deleteOne();

      return res.status(205).json({ message: "User deleted" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new UserController();
