// https://www.twse.com.tw/exchangeReport/STOCK_DAY
// ?response=json
// &date=20210523
// &stockNo=2610

const axios = require("axios");
const fs = require("fs");
const moment = require("moment");

// console.log(moment().format()); // 2021-05-30T13:45:06+08:00
// console.log(moment().format("YYYYMMDD")); // 20210530

function readFilePromise () {
    return new Promise ((resolve,reject) => {
       fs.readFile("stock.txt","utf-8",(err,data) => {
           if(err) {
               reject(err);
           }else {
               resolve(data);
           }
       });
    });
}
readFilePromise()
.then((data) => {
    console.log("data:",data);
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: data,
      },
    });
})
.then((res) => {
    if(res.data.stat === 'OK' ){
    console.log("資訊:" , res.data);
      // console.log(response.data.title);
    }else{
        console.log("錯誤:" , err);
    }
})
.catch((err) => {
    console.error(err);
})

