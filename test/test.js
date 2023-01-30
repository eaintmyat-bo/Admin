const User = require("../models/User");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
chai.should();

chai.use(chaiHttp);

/*
  unit tests for CRUD
  tests could be further improved with  failed test cases
*/
describe("User", () => {
  describe("/GET user", () => {
    it("it should GET all the users", (done) => {
      chai
        .request(app)
        .get("/api/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          done();
        });
    });
  });

  describe("/POST user", () => {
    it("it should POST a new user", (done) => {
      let user = {
        id: "2",
        name: "jennie",
        dob: "1995-07-01",
        address: "central, singapore",
        description: "creating second user",
      };
      chai
        .request(app)
        .post("/api/users")
        .send(user)
        .end(async (err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("object");
          res.body.status.should.be.eql("success");
          await User.findByIdAndDelete(res.body.data._id);
          done();
        });
    });
  });

  describe("/GET/:id user", () => {
    it("it should GET a user by the id", (done) => {
      let user = new User({
        id: "2",
        name: "jennie",
        dob: "1995-07-01",
        address: "central, singapore",
        description: "second user",
      });
      user.save((err, user) => {
        chai
          .request(app)
          .get("/api/users/" + user.id)
          .send(user)
          .end(async (err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            await User.findByIdAndDelete(res.body.data._id);
            done();
          });
      });
    });
  });

  describe("/PUT/:id user", () => {
    it("it should UPDATE a user given the id", (done) => {
      let user = new User({
        id: "2",
        name: "jennie",
        dob: "1995-07-01",
        address: "central, singapore",
        description: "second user from put",
      });
      user.save((err, user) => {
        console.log(user.id);
        chai
          .request(app)
          .put("/api/users/" + user.id)
          .send({
            description: "second user updated",
          })
          .end(async (err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            await User.findByIdAndDelete(res.body.data._id);
            done();
          });
      });
    });
  });

  describe("/DELETE/:id user", () => {
    it("it should DELETE a user given the id", (done) => {
      let user = new User({
        id: "2",
        name: "jennie",
        dob: "1995-07-01",
        address: "central, singapore",
        description: "second user",
      });
      user.save((err, user) => {
        chai
          .request(app)
          .delete("/api/users/" + user.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
});
