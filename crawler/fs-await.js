const axios = require("axios");
// 引入 promise 版本
const fs = require("fs/promises");
const moment = require("moment");

// console.log(moment().format()); // 2021-05-30T13:45:06+08:00
// console.log(moment().format("YYYYMMDD")); // 20210530

// 因為有 fs 的 promise 版本，所以不用自己包了
// function readFilePromise() {
//   return new Promise((resolve, reject) => {
//     fs.readFile("stock.txt", "utf8", (error, data) => {
//       if (error) {
//         reject(error);
//       }
//       resolve(data);
//     });
//   });
// }

async function main() {
  try {
    // await 回來就是 resolve
    let stockCode = await fs.readFile("stock.txt", "utf-8");
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
    console.error("錯誤:",err);
    // TODO
    // 通知管理員來處理
    // 過幾分鐘後重試
  }
}
main();

// (async function () {
//   try {
//     // await 回來就是 resolve
//     let stockCode = await fs.readFile("stock.txt", "utf-8");
//     let response = await axios.get(
//       "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
//       {
//         params: {
//           response: "json",
//           date: moment().format("YYYYMMDD"),
//           stockNo: stockCode,
//         },
//       }
//     );
//     if (response.data.stat === "OK") {
//       console.log("顯示:"+response.data.date);
//       console.log("資訊:"+response.data.title);
//     } else {
//       // TODO 應該要處理查不回來
//     }
//   } catch (err) {
//     console.error(err);
//     // TODO
//     // 通知管理員來處理
//     // 過幾分鐘後重試
//   };
// })();

