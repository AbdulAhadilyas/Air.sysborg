import express from "express";




const app = express();
let port = 4000;

app.get("/",async (req, res) => {
    var ip = req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    null;
   

   let ips = (
    req.headers['cf-connecting-ip'] ||
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress || ''
).split(',');
res.send(ips)
});

app.listen(port);
