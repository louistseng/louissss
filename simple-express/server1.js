// http://expressjs.com/en/starter/hello-world.html
// 導入 express 這個 package
const express = require("express");
const port = 3000;
// 利用 expresss 建立一個 express application app
let app = express();

// let current = new Date();
// console.log(`hello hello ${current}`);

// module < package < framework
// express is a package，但完整到足以被稱為是框架

// middleware 中間件 中介函式
// 在 express 裡
// req -> router
// req -> middlewares..... -> router
app.all(["/","/about","/test"],
  function (req, res, next) {
  let current = new Date();
  console.log(`有人來訪囉！ 在${current}`);
  // 幾乎都要呼叫，讓他往下繼續
  next();
});

// app.use(function (req, res, next) {
//   let current = new Date();
//   console.log(`有人來訪囉！ 在${current}`);
//   // 幾乎都要呼叫，讓他往下繼續
//   next();
// });

// 路由 router
app.get("/", function (req, res) {
  res.send("Hello Express");
});

app.get("/about", function (req, res) {
  res.send("About Express QQ");
});
//express 由上而下找，找到就停住
//傳參數也可以執行

// app.get("/about", function (req, res) {
//   res.send("About Express BBBBB");
// });

app.get("/test", function (req, res) {
  res.send("Test Express");
});

app.listen(port, () => {
  console.log(`run run run!!! port:${port}`);
});