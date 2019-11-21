/* eslint-disable no-undef */
import request from "supertest";
import app from "../../../src/app";

describe("Tools", () => {
  it("Should create a tool", async () => {
    await request(app)
      .post("/tools")
      .send({
        title: "Test",
        description: "fazendo testes",
        tags: ["test 1", "test 2"],
        link: "www.google.com"
      })
      .expect(201);
  });

  it("Should return all tools of database", async () => {
    const response = await request(app)
      .get("/tools")
      .expect(200);

    expect(response.body.length).not.toBe(0);
  });
});
