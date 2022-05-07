const express = require("express");
const auth = require("../middleware/auth.middleware");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const router = express.Router({ mergeParams: true });

router.post("/", auth, async (req, res) => {
  try {
    if (!req.body.userId || !req.body.content) {
      res.status(500).json({
        message: "Post creating issue",
      });
    }

    console.log(req.body);

    const newPost = await Post.create({
      ...req.body,
    });

    // console.log("new post created: ", newPost);

    res.status(201).send(newPost);
  } catch (error) {
    res.status(500).json({
      message: "Post creating issue",
    });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const { orderBy, equalTo } = req.query;

    //список всех постов юзера
    const list = await Post.find({ [orderBy]: equalTo });
    res.send(list);
  } catch (error) {
    res.status(500).json({
      message: "Unknown error",
    });
  }
});

router.patch("/:postId", auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const updateData = req.body;

    const updatedPost = await Post.findByIdAndUpdate(postId, updateData, {
      new: true,
    });

    res.send(updatedPost);
  } catch (error) {
    res.status(500).json({
      message: "Updating error, try later",
    });
  }
});

router.delete("/:postId", auth, async (req, res) => {
  try {
    const { postId } = req.params;

    const removedPost = await Post.findById(postId);
    if (removedPost.userId.toString() === req.user._id) {
      removedPost.comments.forEach(
        async (commentId) => await Comment.findByIdAndDelete(commentId)
      );
      await removedPost.remove();
      res.send(null);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error, try later",
    });
  }
});

module.exports = router;
