const UserModel = require("../models/User");
const userService = require("../services/userService");
const mongoose = require("mongoose");
const credentials = require("../credentials/config.json");

jest.setTimeout(60000);

describe("User service tests", () => {
  // create a mock user for testing
  const mockUser = {
    username: "usertest1",
    email: "user_test_1@gmail.com",
    password: "ABCD1234",
    name: "normal user",
    dob: "1995-09-01",
    address: "somewhere",
    description: "description of user test 1",
    location: {
      type: "Point",
      coordinates: [103.930216, 1.3239765],
    },
  };

  const mockUser2 = {
    username: "usertest2",
    email: "user_test_2@gmail.com",
    password: "ABCD1234",
    name: "normal user",
    dob: "1995-09-01",
    address: "somewhere",
    description: "description of user test 2",
    location: {
      type: "Point",
      coordinates: [104.930216, 1.3249765],
    },
  };
  2;

  let createdUserId;
  let createdUserId2;

  beforeEach(async () => {
    //Configure db connection
    mongoose.connect(
      //e.g: mongodb+srv://<username>:<password>@usercluster.teqxcgz.mongodb.net/?retryWrites=true&w=majority
      credentials.dburl,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Connected to MongoDB");
        }
      }
    );
    // insert the mock user into the database before each test
    const createdUser = await UserModel.create(mockUser);
    createdUserId = createdUser._id;
    const createdUser2 = await UserModel.create(mockUser2);
    createdUserId2 = createdUser2._id;
  });

  afterEach(async () => {
    // delete the mock user from the database after each test
    await UserModel.deleteOne({ _id: createdUserId });
    await UserModel.deleteOne({ _id: createdUserId2 });
  });

  it("getAllUsers", async () => {
    const allUsers = await userService.getAllUsers();
    expect(allUsers).toBeTruthy();
    expect(allUsers.length).toBeGreaterThan(0);
  });

  it("should return the user by id", async () => {
    const user = await userService.getUserById(createdUserId);
    expect(user).toBeDefined();
    expect(user.username).toEqual(mockUser.username);
  });

  describe("updateUser", () => {
    it("should update the user by id", async () => {
      const updatedUser = await userService.updateUser(createdUserId, {
        name: "User1 Updated",
      });
      expect(updatedUser).toBeDefined();
      const userupdated = await userService.getUserById(createdUserId);
      expect(userupdated.name).toEqual("User1 Updated");
    });
  });

  describe("deleteUser", () => {
    it("should delete the user by id", async () => {
      await userService.deleteUser(createdUserId);
      const user = await UserModel.findById(createdUserId);
      expect(user).toBeNull();
    });
  });

  describe("followUser", () => {
    it("should add the followId user to the bearerId user's following list", async () => {
      const user = await userService.followUser(createdUserId, createdUserId2);
      expect(user.following[0]._id).toEqual(createdUserId2);
    });
  });

  describe("unfollowUser", () => {
    it("should remove the followId user from the bearerId user's following list", async () => {
      await userService.followUser(createdUserId, createdUserId2);
      const unfollowedUser = await userService.unfollowUser(
        createdUserId,
        createdUserId2
      );
      expect(
        unfollowedUser.following.some((followingId) =>
          followingId.equals(followId)
        )
      ).not.toContain(createdUserId2);
    });
  });
});
