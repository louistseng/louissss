const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const saltRounds = 10;

const myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "public", "uploads"));
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    // 組合出自己想要的檔案名稱
    cb(null, `${file.fieldname}-${file.originalname}`);
  },
});
// router.get("/text",(req,res)=>{
//   res.send(__dirname);
// });

const uploader = multer({
  storage: myStorage,
  fileFilter: function (req, file, cb) {
    // if(file.mimetype !== "image/jpeg"){
    //   return cb(new Error("不在規定範圍的 file type"),false);
    // }
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("是不合格的副檔名"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});
// console.log(uploader)

router.get("/register", (req, res) => {
  res.render("auth/register");
});

const registerRules = [
  body("email").isEmail().withMessage("請正確輸入 Email 格式"),
  body("password").isLength({ min: 4 }),
  body("confirmPassword").custom((value, { req }) => {
    return value === req.body.password;
  }),
];

router.post(
  "/register",
  uploader.single("photo"),
  registerRules,
  async (req, res, next) => {
    if(req.session.member) { 
      req.session.message = {
      title: "重複登入",
      text: "您已登入過了",
    };
      return res.redirect(303,"/");
    }
    // 加上中間函式(express.urlencoded)的設定
    // 就可以透過 req.body 來取得 post 資料
    console.log(req.body);

    const validateResult = validationResult(req);
    console.log(validateResult);

    if (!validateResult.isEmpty()) {
      return next(new Error("註冊資料錯誤"));
    }

    let checkResult = await connection.queryAsync(
      "SELECT * FROM members WHERE email = ?",
      req.body.email
    );

    if (checkResult.length > 0) {
      // return next(new Error("已註冊"));
      let error = validateResult.array();
      req.session.message = {
        title: "此 email 已經註冊",
        text: "歡迎重新登入",
      };
      return res.redirect(303, "/auth/login");
    }
    console.log(req.file);

    let result = await connection.queryAsync(
      "INSERT INTO members (email, password, name, photo) VALUES (?)",
      [
        [
          req.body.email,
          await bcrypt.hash(req.body.password, saltRounds),
          req.body.name,
          `/uploads/${req.file.filename}`,
        ],
      ]
    );
    console.log(result);
    res.send("註冊成功");
  }
);

router.get("/login", (req, res) => {
  if(req.session.member) { 
    req.session.message = {
    title: "重複登入",
    text: "您已登入過了",
  };
    return res.redirect(303,"/");
  }
  res.render("auth/login");
});

const loginRules = [
  body("email").isEmail(),
  body("password").isLength({ min: 4 }),
];

router.post("/login", loginRules, async (req, res) => {
  console.log(req.body);

  const validateResult = validationResult(req);
  console.log(validateResult);

  if (!validateResult.isEmpty()) {
    req.session.message = {
      title: "登入失敗",
      text: "請填寫正確資料",
    };
  }

  let member = await connection.queryAsync(
    "SELECT * FROM members WHERE email = ?",
    req.body.email
  );

  if (member.length === 0) {
    // return next(new Error("查無此帳號"));
    req.session.message = {
      title: "登入失敗",
      text: "查無此帳號",
    };
    return res.redirect(303, "/auth/register");
  }

  member = member[0];

  let loginResult = bcrypt.compare(req.body.password, member.password);

  if (loginResult) {
    req.session.member = {
      email: member.email,
      name: member.name,
      photo: member.photo,
    };
    req.session.message = {
      title: "登入成功",
      text: "歡迎回到本服務",
    };

    // res.send("登入成功");
    res.redirect(303, "/");
  } else {
    req.session.member = null;
    req.session.message = {
      title: "登入失敗",
      text: "請填寫正確資料",
    };
    res.redirect(303, "/auth/login");
    // res.send("登入失敗");
  }
console.log(result)

});

router.get("/logout", (req, res) => {
  req.session.member = null;
  req.session.message = {
    title: "登出成功",
    text: "歡迎再回來～",
  };
  res.redirect(303, "/");
});

module.exports = router;
