const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");
const User = require("../src/models/user.model");
const Book = require("../src/models/book.model");
const Cart = require("../src/models/cart.model");
const bcrypt = require("bcryptjs");

describe("Cart lifecycle", () => {
  let token;
  let bookId;

  before(async () => {
    await User.deleteOne({ email: "cart@test.com" });
    await Cart.deleteMany();

    const hashedPassword = await bcrypt.hash("password123", 10);
    await User.create({
      name: "Cart User",
      email: "cart@test.com",
      password: hashedPassword,
    });

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "cart@test.com",
        password: "password123",
      });

    token = loginRes.body.token;

    const book = await Book.findOne();
    bookId = book._id.toString();
  });

  it("should add book to cart", async () => {
    const res = await request(app)
      .post("/api/cart/add")
      .set("Authorization", `Bearer ${token}`)
      .send({ bookId, quantity: 1 });

    expect(res.status).to.equal(200);
    expect(res.body.items.length).to.equal(1);
  });

  it("should clear the cart", async () => {
    const res = await request(app)
      .delete("/api/cart/clear")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.items.length).to.equal(0);
  });
});
