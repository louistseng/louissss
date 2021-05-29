// HTTP client  

// https://www.twse.com.tw/exchangeReport/STOCK_DAY
// ?response=json
// &date=20210524
// &stockNo=2610

const axios = require("axios");
axios
.get(
 "https://www.twse.com.tw/exchangeReport/STOCK_DAY ?response=json &date=20210529 &stockNo=2610"
)
.then(function(response){
    console.log(response);
})
.catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

