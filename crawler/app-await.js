// https://www.twse.com.tw/exchangeReport/STOCK_DAY
// ?response=json
// &date=20210523
// &stockNo=2610

const axios = require("axios");
const fs = require("fs");
const moment = require("moment");

// console.log(moment().format()); // 2021-05-30T13:45:06+08:00
// console.log(moment().format("YYYYMMDD")); // 20210530

function readFilePromise() {
  return new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

(async function () {
  try {
    // await 回來就是 resolve
    let stockCode = await readFilePromise();
    let response = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params: {
          response: "json",
          date: moment().format("YYYYMMDD"),
          stockNo: stockCode,
        },
      }
    );
    if (response.data.stat === "OK") {
      console.log("顯示:"+response.data.date);
      console.log("資訊:"+response.data.title);
    } else {
      // TODO 應該要處理查不回來
    }
  } catch (err) {
    console.error(err);
    // TODO
    // 通知管理員來處理
    // 過幾分鐘後重試
  }
})();
