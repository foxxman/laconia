const express = require("express");
const auth = require("../middleware/auth.middleware");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

const router = express.Router({ mergeParams: true });

router.post("/", auth, async (req, res) => {
  try {
    if (req.user._id === req.body.userId) {
      const newComment = await Comment.create({ ...req.body });

      const post = await Post.findById(newComment.postId);
      post.comments = [...post.comments, newComment._id];
      await Post.findByIdAndUpdate(newComment.postId, post, { new: true });

      res.status(201).send(newComment);
    } else {
      res.status(401).json({
        message: "Unauthorize",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Post error, try again.",
    });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const { orderBy, equalTo } = req.query;

    //список всех комментов поста
    const list = await Comment.find({ [orderBy]: equalTo });
    res.send(list);
  } catch (error) {
    res.status(500).json({
      message: "Unknown error",
    });
  }
});

module.exports = router;
