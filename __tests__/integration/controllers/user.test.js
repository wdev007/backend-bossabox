/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import request from "supertest";
import faker from "faker";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import app from "../../../src/app";

const correctUserData = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(8)
};

let token = "";
let id;

describe("User", () => {
  it("Shoud create new user", async () => {
    const user = await request(app)
      .post("/users")
      .send(correctUserData)
      .expect(201);
    token = user.body.token;
    id = user.body.user._id;
  });

  it("Should return error for invalide datas for user", async () => {
    const data = {
      username: faker.internet.userName(),
      email: faker.internet.userName(), // not is email
      password: faker.internet.password(8)
    };
    await request(app)
      .post("/users")
      .send(data)
      .expect(400);
  });

  it("Should creaated a new user and delete this user", async () => {
    const user = await request(app)
      .post("/users")
      .send({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(8)
      })
      .expect(201);
    const { _id } = user.body.user;

    await request(app)
      .delete(`/users/${_id}`)
      .expect(205);
  });

  it("Should return all users", async () => {
    await request(app)
      .get(`/users`)
      .expect(200);
  });

  it("Should return user by id", async () => {
    await request(app)
      .get(`/users/${id}`)
      .expect(200);
  });

  it("Should update user by id", async () => {
    await request(app)
      .put(`/users/${id}`)
      .send({ username: faker.internet.userName() })
      .expect(205);
  });

  it("Should return a error 404 in update, user not found", async () => {
    await request(app)
      .put(`/users/${Types.ObjectId()}`)
      .send({ username: faker.internet.userName() })
      .expect(404);
  });

  it("Should return a error 404 in get, user not found", async () => {
    await request(app)
      .get(`/users/${Types.ObjectId()}`)
      .expect(404);
  });
});

describe("Session", () => {
  it("Should logged in application", async () => {
    const { email, password } = correctUserData;
    const user = await request(app)
      .post("/users/login")
      .send({ email, password })
      .expect(201);

    // token = user.body.token;
  });
});

describe("Authentication and Authorization", () => {
  it("Should return error when can login with data wrong", async () => {
    const { email } = correctUserData;

    await request(app) // Case for email invalid
      .post("/users/login")
      .send({
        email: faker.internet.email(),
        password: faker.internet.password()
      })
      .expect(401);

    await request(app) // Case for password invalid
      .post("/users/login")
      .send({
        email,
        password: faker.internet.password()
      })
      .expect(401);
  });

  it("Should get information of user logged", async () => {
    await request(app)
      .get("/users/me")
      .set("Accept", "application/json")
      .set("Authorization", token)
      .expect(200);
  });

  it("Should return error not authorized to access this resource", async () => {
    const tokenFake = jwt.sign({ _id: Types.ObjectId() }, process.env.JWT_KEY);

    await request(app)
      .get("/users/me")
      .set("Accept", "application/json")
      .set("Authorization", tokenFake)
      .expect(401);
  });
});
