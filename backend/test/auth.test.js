const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");
const User = require("../src/models/user.model");
const bcrypt = require("bcryptjs");

describe("Auth: Login", () => {
  const testUser = {
    name: "Test User",
    email: "testuser@test.com",
    password: "password123",
  };

  before(async () => {
    await User.deleteOne({ email: testUser.email });

    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    await User.create({
      name: testUser.name,
      email: testUser.email,
      password: hashedPassword,
    });
  });

  it("should login successfully and return JWT", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
  });
});
