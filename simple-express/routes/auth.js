const express = require("express");
const router = express.Router();
const { body, validationResult} = require("express-validator");
const connection = require("../utils/db");

router.get("/register",(req,res) => {
    res.render("auth/register");
});

const registerRules = [
    body("email").isEmail().withMessage("請正確輸入 Email 格式"),
    body("password").isLength({ min: 6 }),
    body("confirmPassword").custom((value, { req }) => {
      return value === req.body.password;
    }),
  ];

router.post("/register", registerRules, async (req,res,next) => {
// 加上中間函式(express.urlencoded)的設定
// 就可以透過 req.body 來取得 post 資料
    console.log(req.body);
    res.send("註冊頁面");

    try {
        validationResult(req).throw();
      } catch (err) {
        console.log(err.mapped()); 
      }
    const result = validationResult(req);
  if (!result.isEmpty()) {
      return next(new Error("註冊資料錯誤"));
  };


});


router.get("/login",(req,res) => {
    res.render("auth/login");
});

module.exports = router;