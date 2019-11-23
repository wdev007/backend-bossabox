/* eslint-disable no-underscore-dangle */
import jwt from "jsonwebtoken";
import User from "../models/User";

// eslint-disable-next-line consistent-return
async function auth(req, res, next) {
  const token = req.header("Authorization").replace("Bearer", "");
  const data = jwt.verify(token, process.env.JWT_KEY);

  try {
    const user = await User.findOne({ _id: data._id, "tokens.token": token });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Not authorized to access this resource" });
  }
}

export default auth;
