const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    content: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    //чей пост
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },

  {
    //доб. 2 св-ва в модель: когда создана и когда обновлена
    timestamps: { createdAt: "created_at" },
  }
);

module.exports = model("Post", schema);
