const axios = require("axios");
//引入promise版的 fs
const fs = require("fs/promises");
const moment = require("moment");
const mysql = require("mysql");
const Promise = require("bluebird");

require("dotenv").config();

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
connection = Promise.promisifyAll(connection);

(async function() {
  try{
      await connection.connectAsync();
  let stockCode = await fs.readFile("stock.txt", "utf-8");
  console.log(`讀到的 stock code: ${stockCode}`);

  let stock = await connection.queryAsync(`SELECT stock_id FROM stock WHERE stock_id = ${stockCode}`
  );
  if (stock.length <= 0) {
      console.log("Start to query name")
      let response = await axios.get(
          `https://www.twse.com.tw/zh/api/codeQuery?query=${stockCode}`
      );
      let answer = response.data.suggestions.shift();
      let answers = answer.split("\t");
      // console.log(stockInfos);
      if (answers.length > 1) {
        //TODO: answers[0], answers[1]
        connection.queryAsync(
          `INSERT INTO stock (stock_id, stock_name) VALUES ('${answers[0]}', '${answers[1]}')` 
        );
      }
     
  }
  } catch(err) {
      console.error(err);
  } finally {
      connection.end();
  }
  
  })();
