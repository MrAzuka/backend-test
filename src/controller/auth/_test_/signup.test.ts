process.env.NODE_ENV = "test";
import { testUser } from "./utils.test";
import chai from "chai";
import chatHttp from "chai-http";
import { startServer } from "../../../server";
import User from "../../../model/userModel";
import logger from "../../../utils/logger";

const assert = chai.assert;
const { firstName, lastName, emailAddress, password } = testUser;
chai.use(chatHttp);

describe("Sign up tests", () => {
  before(async () => {
    try {
      await User.destroy({
        where: {}
      });
    } catch (error) {
      logger.info("*");
    }
  });
  after(async () => {
    try {
      await User.destroy({
        where: {}
      });
    } catch (error) {
      logger.info("*");
    }
  });
  it("Should throw error when email is missing", (done) => {
    chai
      .request(startServer)
      .post("/api/v1/auth/signup")
      .send({ firstName, lastName, password })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.include(res.body.message.toLowerCase(), "emailAddress");
        done();
      });
  });

  it("Should throw error when firstName is missing", (done) => {
    chai
      .request(startServer)
      .post("/api/v1/auth/signup")
      .send({ emailAddress, lastName, password })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.include(res.body.message.toLowerCase(), "first name");
        done();
      });
  });

  it("Should throw error when lastName is missing", (done) => {
    chai
      .request(startServer)
      .post("/api/v1/auth/signup")
      .send({ firstName, emailAddress, password })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.include(res.body.message.toLowerCase(), "last name");
        done();
      });
  });

  it("Should throw error when password is missing", (done) => {
    chai
      .request(startServer)
      .post("/api/v1/auth/signup")
      .send({ firstName, lastName, emailAddress })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.include(res.body.message.toLowerCase(), "password");
        done();
      });
  });

  it("Should throw error when invalid email is provided", (done) => {
    chai
      .request(startServer)
      .post("/api/v1/auth/signup")
      .send({
        firstName,
        lastName,
        password,
        emailAddress: "myemail.com"
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.include(res.body.message.toLowerCase(), "email");
        done();
      });
  });

  it("It should be successful when the values are all valid", (done) => {
    chai
      .request(startServer)
      .post("/api/v1/auth/signup")
      .send(testUser)
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.include(res.body.message.toLowerCase(), "success");
        done();
      });
  });

  it("Should throw error when a duplicate email is provided", (done) => {
    chai
      .request(startServer)
      .post("/api/v1/auth/signup")
      .send(testUser)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.include(res.body.message.toLowerCase(), "email");
        done();
      });
  });
});
