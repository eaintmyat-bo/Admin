const UserModel = require("../models/User");

exports.getAllUsers = async () => {
  return await UserModel.find();
};

exports.getUserById = async (id) => {
  return await UserModel.findById(id);
};

exports.updateUser = async (id, User) => {
  return await UserModel.findByIdAndUpdate(id, User);
};

exports.deleteUser = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};

//add following in bearerId user, add follower in the followId user
exports.followUser = (bearerId, followId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await UserModel.findById(bearerId);

      //sanity check
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 400;
        throw error;
      }

      //if this is the new user to follow, save in the following list
      if (
        user.following &&
        user.following.length > 0 &&
        !user.following.some((followingId) => followingId.equals(followId))
      ) {
        user.following.push(followId);
        await user.save();

        let followedUser = await UserModel.findById(followId);
        followedUser.followers.push(bearerId);
        await followedUser.save();
        resolve(user);
      } else {
        const error = new Error("User already in following list");
        error.statusCode = 400;
        throw error;
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

//add following in bearerId user, add follower in the followId user
exports.unfollowUser = (bearerId, followId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await UserModel.findById(bearerId);

      //sanity check
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 400;
        throw error;
      }
      //if this is the new user to follow, save in the following list
      if (
        user.following &&
        user.following.length > 0 &&
        user.following.some((followingId) => followingId.equals(followId))
      ) {
        user.following = user.following.filter(
          (following) => !following.equals(followId)
        );
        user = await user.save();

        let followedUser = await UserModel.findById(followId);
        followedUser.followers = followedUser.followers.filter(
          (follower) => !follower.equals(bearerId)
        );
        await followedUser.save();
        resolve(user);
      } else {
        const error = new Error("User not found in following list");
        error.statusCode = 400;
        throw error;
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

//add following in bearerId user, add follower in the followId user
exports.getNearbyFriends = (bearerId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await UserModel.findById(bearerId);
      //sanity check
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 400;
        throw error;
      }

      // Find users who are within a specified distance from the user's location
      let nearbyUsers = await UserModel.find({
        location: {
          $near: {
            $geometry: user.location,
            $maxDistance: 900000, //in meters, can be configured accordingly
            $minDistance: 10,
          },
        },
      });

      if (nearbyUsers) {
        nearbyUsers = nearbyUsers.filter((user) => !user.equals(bearerId));
      }
      resolve(nearbyUsers);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
