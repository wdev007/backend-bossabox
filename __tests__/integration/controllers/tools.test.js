/* eslint-disable no-undef */
import request from "supertest";
import mongoose from "mongoose";
import faker from "faker";
import app from "../../../src/app";
import Tool from "../../../src/app/models/Tool";

describe("Tools", () => {
  it("Should create a tool", async () => {
    const data = {
      title: faker.name.title(),
      description: faker.name.jobDescriptor(),
      tags: faker.random
        .words(Math.floor(Math.random() * (6 - 1) + 1))
        .split(" "),
      link: faker.internet.url()
    };
    const tool = await request(app)
      .post("/tools")
      .send(data)
      .expect(201);

    expect(tool.body.message).toBe("Created");
  });

  it("Should return all tools of database", async () => {
    const response = await request(app)
      .get("/tools")
      .expect(200);

    expect(response.body.length).not.toBe(0);
  });

  it("Should delete that tool created", async () => {
    const data = {
      title: faker.name.title(),
      description: faker.name.jobDescriptor(),
      tags: faker.random
        .words(Math.floor(Math.random() * (6 - 1) + 1))
        .split(" "),
      link: faker.internet.url()
    };
    const { _id } = await Tool.create(data);

    await request(app)
      .delete(`/tools/${_id}`)
      .expect(204);
  });

  it("Should return status 404 when id tool not exist", async () => {
    const id = mongoose.Types.ObjectId();
    await request(app)
      .delete(`/tools/${id}`)
      .expect(404);
  });
});
