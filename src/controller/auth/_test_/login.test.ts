process.env.NODE_ENV = "test";
import { expect, should } from "chai";
import { testUser } from "./utils.test";
import chai from "chai";
import chatHttp from "chai-http";
import User from "../../../model/userModel";
import logger from "../../../utils/logger";
import bcrypt from "bcryptjs";
import { app } from "../../../server";

const assert = chai.assert;
should();
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
      .request(app)
      .post("/api/v1/auth/login")
      .send({ password })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        expect(res.body.status).to.equal("error");
        done();
      });
  });

  it("Should throw error when password is missing", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .send({ emailAddress })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        expect(res.body.status).to.equal("error");
        done();
      });
  });

  it("Should throw error when email doesnt exist", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .send({ email: "test34@gmail.com", password })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        expect(res.body.status).to.equal("error");
        done();
      });
  });

  it("Should throw error when wrong password is provided", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .send({ emailAddress, password: "wrong password" })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        expect(res.body.status).to.equal("error");
        done();
      });
  });

  it("It should be successful when the values are all valid", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .send({ password, emailAddress })
      .end((err, res) => {
        logger.info(emailAddress, password);
        res.should.have.status(200);
        res.body.should.be.a("object");
        expect(res.body.data).to.have.property("jwt");
        expect(res.body.data).to.have.property("user");
        done();
      });
  });
});
