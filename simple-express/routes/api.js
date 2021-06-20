const express = require("express");
const router = express.Router();
const connection = require("../utils/db");


router.get("/stock", async (req,res) =>{
    let queryResults = await connection.queryAsync("SELECT * FROM stock;");
    res.json(queryResults);
});
// app.post('/api/stock', function(req, res) {
//     console.log(req.body.objectData);
//     res.contentType('json');
//     res.send({ some: 'json' });
//   });
module.exports = router;