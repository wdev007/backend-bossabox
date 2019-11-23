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
}

export default new UserController();
