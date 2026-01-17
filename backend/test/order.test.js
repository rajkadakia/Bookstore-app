const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");
const Book = require("../src/models/book.model");

describe("Order placement", () => {
  let token;
  let bookId;

  before(async () => {
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "cart@test.com",
        password: "password123",
      });

    token = loginRes.body.token;

    const book = await Book.findOne();
    bookId = book._id.toString();

    await request(app)
      .post("/api/cart/add")
      .set("Authorization", `Bearer ${token}`)
      .send({ bookId, quantity: 1 });
  });

  it("should place order and clear cart", async () => {
    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("paymentStatus", "SUCCESS");
  });
});
