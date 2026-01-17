const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");
const { redisClient } = require("../src/config/redis");

describe("Redis cache: Books", () => {
  it("should cache books after first request", async () => {
    await redisClient.del("books:all");

    await request(app).get("/api/books");

    const cached = await redisClient.get("books:all");
    expect(cached).to.not.be.null;
  });
});
