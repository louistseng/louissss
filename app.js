// https://www.twse.com.tw/exchangeReport/STOCK_DAY
// ?response=json
// &date=20210523
// &stockNo=2610

// 引入 axios
const axios = require('axios');

// Make a request for a user with a given ID
axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210529&stockNo=2610')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });