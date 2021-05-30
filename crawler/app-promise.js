// https://www.twse.com.tw/exchangeReport/STOCK_DAY
// ?response=json
// &date=20210523
// &stockNo=2610

// console.log(moment().format()); // 2021-05-30T13:45:06+08:00
// console.log(moment().format("YYYYMMDD")); // 20210530

const fs = require("fs");
const axios = require("axios");
const moment = require("moment");

function filePromise() {
  return new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
filePromise()
  .then((stock) => {
    console.log("stockNo:", stock);
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: stock,
      },
    });
  })
  .then(function (response) {
    if (response.data.stat === "OK") {
      console.log(response.data.date);
      console.log(response.data.title);
    }
  })
  .catch((err) => {
    console.log(`錯誤:${err}`);
  });
