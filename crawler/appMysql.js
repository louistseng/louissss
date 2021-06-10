const axios = require("axios");
//引入promise版的 fs
const fs = require("fs/promises");
const moment = require("moment");
const mysql = require("mysql");
const Promise = require("bluebird");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "stock",
});
connection = Promise.promisifyAll(connection);

(async function () {
await connection.connectAsync();
try{
    let stock = await fs.readFile("stock.txt", "utf8");
    console.log("stockNo:", `${stock}`);
    
    let stockCode = await connection.queryAsync (`SELECT stock_id FROM stock WHERE stock_id = ${stock}`);
    
    if (stockCode.length <= 0){
        let response = await axios.get(
            `https://www.twse.com.tw/zh/api/codeQuery?query=${stock}`
          );
          let answer = response.data.suggestions.shift();
        let answers = answer.split("\t");
      // console.log(stockInfos);
        console.log(answers);
        if (answers.length > 1) {
        //TODO: answers[0], answers[1]
          connection.queryAsync(
            `INSERT INTO stock (stock_id,stock_name)VALUE ('${answers[0]}','${answers[1]}')`
          );
        }
    }  
}catch(err){
    console.error(err);
}finally{
    connection.end();
}
})();

//https://www.twse.com.tw/zh/api/codeQuery?query=2610
// fs.readFile("stock.txt", "utf8")
//   .then((stock) => {
//     console.log("stockNo:", stock);

//     connection.query(
//       `SELECT stock_id FROM stock WHERE stock_id = ${stock}`,
//       function (err, result) {
//         if (err) {
//           throw err;
//         } else {
//           console.log(result.length);
//         }
//         if (result.length === 0) {
//           return axios.get(
//             `https://www.twse.com.tw/zh/api/codeQuery?query=${stock}`
//           );
//         }
//       }
//     );
//   })
//   .then(function (response) {
//     let answer = response.data.suggestions.shift();
//     let answers = answer.split("\t");
//     console.log(answers);
//     if (answers.length > 1) {
//       connection.query(
//         `INSERT INTO stock (stock_id,stock_name)VALUE ('${answers[0]}','${answers[1]}')`,
//         function (err, result) {
//           if (err) {
//             throw err;
//           } else {
//             console.log(result);
//           }
//         }
//       );
//     } else {
//       throw "查不到名稱";
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     connection.end();
//   });
// .then((data) => {
//     console.log("data:",data);
//     return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
//       params: {
//         response: "json",
//         date: moment().format("YYYYMMDD"),
//         stockNo: data,
//       },
//     });
// })
// .then((res) => {
//     if(res.data.stat === 'OK' ){
//     console.log("資訊:" , res.data);
//       console.log(response.data.title);
//     }else{
//         console.log("錯誤:" , err);
//     }
// })
// .catch((err) => {
//     console.error(err);
// })


