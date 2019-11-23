import User from "../models/User";

class UserController {
  // async index(req, res) {}

  // eslint-disable-next-line consistent-return
  async store(req, res) {
    // Create a new user
    try {
      const user = new User(req.body);
      // console.log(user);
      await user.save();

      const token = await user.generateAuthToken();
      // console.log(token);
      return res.status(201).send({ user, token });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new UserController();
