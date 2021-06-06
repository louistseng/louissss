


// http 是 NodeJS 內建的 web server，所以不用安裝
// https://nodejs.org/docs/latest-v14.x/api/http.html
const http = require("http")

// createServer(Listener)
// Listener(request, response) 負責處理進來的連線
// request 是請求物件
// response 是回覆物件

const server = http.createServer((req,res) => {
    console.log("是不是有連線");
    console.log(req.url);
    
    res.statusCode = 200;
    res.setHeader("Content-Type","text/plain;charset=utf-8")

    switch (req.url){
        case "/":
            res.end("home");
            break;
        case "/test":
            res.end("test");
            break;
        case "/about":
            res.end("about");
            break;
            default:
                res.writeHead(404);
                res.end("Not Found");    
    }

    // res.write("HI,有事嗎？")
    // res.end();
});
server.listen(3000, () => {
    console.log("run run run")
});

// PHP --> 搭配 web server （apache or nginx)
// NodeJS 直接開發一個 web server