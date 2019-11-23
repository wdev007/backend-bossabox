/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "invalid Email address" });
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.pre("save", async function(next) {
  const user = this; // save context of user

  if (user.isModified("password")) {
    // if password is modified i encrypt a new password
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

UserSchema.methods.generateAuthToken = async function() {
  const user = this; // save context of user

  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

UserSchema.statics.findByCredentials = async function(email, password) {
  // Search for a user by email and password
  // eslint-disable-next-line no-undef

  const user = await this.model("User").findOne({ email });

  if (!user) {
    return { error: "invalid email" };
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return { error: "invalid password" };
  }

  return user;
};

export default model("User", UserSchema);
