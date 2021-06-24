
const connection = require("./utils/db");
require("dotenv").config();
const prot = 3000;
const express = require("express");
let app = express();

app.use(express.urlencoded({extended: false}));
// app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const expressSession = require("express-session");
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    maxAge: 3600000,
  })
);

app.use(express.static("public"));

app.set("views", "views");
// 告訴 express 我們用的 view engine 是 pug
app.set("view engine", "pug");

app.use(function (req, res, next) {
  let current = new Date();
  console.log(`有人來訪問了喔 在 ${current}`);
  next();
});

app.use(function (req, res, next) {
  console.log("無用 Middleware");
  // 「幾乎」都要呼叫，讓他往下繼續
  next();
});

app.use(function (req, res, next) {
  res.locals.member = req.session.member;
  next();
});

app.use(function (req, res, next) {
  if(req.session.message){
    res.locals.message = req.session.message;
    delete req.session.message;
  }
  next();
});

let stockRouter = require("./routes/stock");
app.use("/stock", stockRouter);

let apiRouter = require("./routes/api");
app.use("/api", apiRouter);

let authRouter = require("./routes/auth");
app.use("/auth", authRouter);

let memberRouter = require("./routes/member");
app.use("/member",memberRouter);

// 路由 router
// (request, response) {} 去回應這個請求
app.get("/", function (req, res) {
  // res.send("Hello Express BBB");
  // views/index.pug
  res.cookie("lang","zh-TW");
  res.render("index");

});

app.get("/about", function (req, res, next) {
  // res.send("About Express AAAA");
  res.render("about");
});

// app.get("/about", function (req, res) {
//   console.log("我是 ABOUT - BBBBB");
//   res.send("<h1>About Express BBBB</h1>");
// });

app.get("/test", function (req, res) {
  res.send("Test Express");

});

app.use(function(req,res,next) {
  res.status(404)
  res.render("404");
});

app.use(function(err,req,res,next){
  console.log(err.message)
  res.message = err.message;
  res.status(err.status || 500);
  res.send("500: 內部錯誤 ");
});

app.listen(prot, async () => {
  // 在 web server 開始的時候，去連線資料庫
  await connection.connectAsync();
  console.log(`ready to start ${prot}!!!`);
});