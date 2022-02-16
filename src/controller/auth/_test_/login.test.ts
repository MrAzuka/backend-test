process.env.NODE_ENV = "test";
import { testUser } from "./utils.test";
import chai from "chai";
import chatHttp from "chai-http";
import User from "../../../model/userModel";
import logger from "../../../utils/logger";
import bcrypt from "bcryptjs";
import { startServer } from "../../../server";

const assert = chai.assert;

const { firstName, lastName, emailAddress, password } = testUser;
chai.use(chatHttp);

describe("Login tests", () => {
  before(async () => {
    try {
      await User.destroy({
        where: {}
      });

      const hashPassword = await bcrypt.hash(password, 10);
      //create a new user
      await User.create({
        emailAddress,
        firstName,
        lastName,
        password: hashPassword
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
      .post("/api/v1/auth/login")
      .send({ password })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.include(res.body.message.toLowerCase(), "email");
        done();
      });
  });

  it("Should throw error when password is missing", (done) => {
    chai
      .request(startServer)
      .post("/api/v1/auth/login")
      .send({ emailAddress })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.include(res.body.message.toLowerCase(), "password");
        done();
      });
  });

  it("Should throw error when email doesnt exist", (done) => {
    chai
      .request(startServer)
      .post("/api/v1/auth/login")
      .send({ email: "test34@gmail.com", password })
      .end((err, res) => {
        assert.equal(res.status, 404);
        assert.include(res.body.message.toLowerCase(), "not exist");
        done();
      });
  });

  it("Should throw error when wrong password is provided", (done) => {
    chai
      .request(startServer)
      .post("/api/v1/auth/login")
      .send({ emailAddress, password: "wrong password" })
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.include(res.body.message.toLowerCase(), "invalid");
        done();
      });
  });

  it("It should be successful when the values are all valid", (done) => {
    chai
      .request(startServer)
      .post("/api/v1/auth/login")
      .send({ password, emailAddress })
      .end((err, res) => {
        logger.info(emailAddress, password);
        assert.equal(res.status, 200);
        assert.include(res.body.message.toLowerCase(), "success");
        done();
      });
  });
});
