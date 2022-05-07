const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); //для шифрования пароля
const tokenService = require("../services/token.service");
const User = require("../models/User");

const router = express.Router({ mergeParams: true });

router.post("/signUp", [
  //валидация
  check("email", "Uncorrect email").isEmail(),
  check("password", "Minimum password's length is 8").isLength({ min: 8 }),

  async (req, res) => {
    //проверка ошибок валидации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: "INVALID_DATA",
          code: 400,
          errors: errors.array(),
        },
      });
    }

    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          error: {
            message: "EMAIL_EXISTS",
            code: 400,
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
      });

      const tokens = tokenService.generate({ _id: newUser._id });

      await tokenService.save(newUser._id, tokens.refreshToken);

      //201 - все ОК, нечто было создано
      res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (error) {
      res.status(500).json({
        message: "Register Error: " + error.message,
      });
    }
  },
]);

router.post("/signInWithPassword", [
  check("email", "Incorrect email").normalizeEmail().isEmail(),
  check("password", "Empty password").exists(),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
          },
        });
      }

      console.log(req.body);

      const { email, password } = req.body;

      //находим юзера по Email
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).send({
          error: {
            message: "EMAIL_NOT_FOUND",
            code: 400,
          },
        });
      }

      //сравниваем зашифрованные пароли
      const isPasswordEqual = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordEqual) {
        return res.status(400).send({
          error: {
            message: "INVALID_PASSWORD",
            code: 400,
          },
        });
      }

      const tokens = tokenService.generate({ _id: existingUser._id });
      await tokenService.save(existingUser._id, tokens.refreshToken);

      res.status(200).send({ ...tokens, userId: existingUser._id });
    } catch (error) {
      res.status(500).json({
        message: "Authorization error: " + error.message,
      });
    }
  },
]);

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

//обновление токена
router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = await tokenService.validateRefresh(refreshToken);

    const dbToken = await tokenService.findToken(refreshToken);

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({ message: "Unatorized" });
    }

    const tokens = tokenService.generate({
      _id: data._id,
    });
    await tokenService.save(data._id, tokens.refreshToken);

    res.status(200).send({ ...tokens, userId: data._id });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла неизвестная ошибка.",
    });
  }
});

module.exports = router;
