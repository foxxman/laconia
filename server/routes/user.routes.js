const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const userData = await User.findById(userId);

    // console.log(userData);
    res.send(userData);
  } catch (error) {
    res.status(500).json({
      message: "USER_NOT_FOUND",
    });
  }
});

router.post("/", async (req, res) => {
  // console.log("get by ids: ", req.body);
  // console.log();
  try {
    if (req.body.ids) {
      const users = await User.find();

      const list = users.filter((u) => req.body.ids.includes(u._id.toString()));

      console.log("list: ", list);
      res.send(list);
    } else {
      res.status(404).json({
        message: "EMPTY_IDS",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "NOT_FOUND",
    });
  }
});

router.patch("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    res.send(updatedUser);
    // res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    res.status(500).json({
      message: "Updating error, try later",
    });
  }
});

router.patch("/subscribe/:userId", auth, async (req, res) => {
  try {
    const followerId = req.body.followerId;
    const { userId } = req.params;
    const userData = await User.findById(userId);
    const followerData = await User.findById(followerId);

    if (userId === followerId)
      res.status(500).json({
        message: "SAME_USERS",
      });

    if (
      !userData.subscribers.includes(followerId) &&
      !followerData.subscriptions.includes(userId)
    ) {
      // если еще не подписан
      if (followerId === req.user._id) {
        userData.subscribers = [...userData.subscribers, followerId];
        followerData.subscriptions = [...followerData.subscriptions, userId];

        const updatedUser = await User.findByIdAndUpdate(userId, userData, {
          new: true,
        });
        await User.findByIdAndUpdate(followerId, followerData, {
          new: true,
        });

        res.send(updatedUser);
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      // если уже подписан -> отписываем

      if (followerId === req.user._id) {
        userData.subscribers = userData.subscribers.filter(
          (s) => s.toString() !== followerId
        );

        followerData.subscriptions = followerData.subscriptions.filter(
          (s) => s.toString() !== userId
        );

        console.log(userData.subscribers);
        const updatedUser = await User.findByIdAndUpdate(userId, userData, {
          new: true,
        });
        await User.findByIdAndUpdate(followerId, followerData, {
          new: true,
        });

        res.send(updatedUser);
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Updating error, try later",
    });
  }
});

module.exports = router;
