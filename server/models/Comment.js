const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    content: { type: String, required: true },
    //чей коммент и к какому посту
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },

  {
    //доб. 2 св-ва в модель: когда создана и когда обновлена
    timestamps: { createdAt: "created_at" },
  }
);

module.exports = model("Comment", schema);
