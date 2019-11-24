import User from "../models/User";

class SessionController {
  async show(req, res) {
    try {
      return res.status(200).send(req.user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findByCredentials(email, password);

      if (user.error) {
        throw new Error(user.error);
      }

      const token = await user.generateAuthToken();

      return res.status(201).json({ user, token });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  async delete(req, res) {
    // only discard request token
    try {
      req.user.tokens = req.user.tokens.filter(
        // eslint-disable-next-line eqeqeq
        token => token.token != req.token
      );
      await req.user.save();
      res.status(203).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async deleteAll(req, res) {
    // discard all tokens
    try {
      req.user.tokens.splice(0, req.user.tokens.length);
      await req.user.save();
      res.send();
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default new SessionController();
