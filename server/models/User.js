const { Schema, model } = require("mongoose");

//схема - описание модели
const schema = new Schema(
  {
    name: { type: String },
    surname: { type: String },
    birthday: { type: String },
    location: { type: String },
    description: {
      type: String,
    },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    avatar: String,
    //type - id объекта из  ref: Profession
    subscriptions: [{ type: Schema.Types.ObjectId, ref: "User" }],
    //type - id объекта из  ref: Quality
    //оборачиваем в [], т.к. массив
    subscribers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // rate: Number,
    sex: { type: String, enum: ["male", "female"] },
  },
  {
    //доб. 2 св-ва в модель: когда создана и когда обновлена
    timestamps: true,
  }
);

module.exports = model("User", schema);
