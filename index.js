const session = require('express-session');
const express = require("express");
const path = require("path");
const app = express();
const port = 8000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/static"));
app.use("/files", express.static(__dirname + "/files"));

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true, // document.cookie로는 접속x
        maxAge: 1000 * 60 * 60,
    },
}))

// 예시: 미들웨어로 isLoggedIn 전역 변수 설정
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.user ? true : false;
    res.locals.user = req.session.user || null; // 로그인된 사용자 정보 설정
    next();
});

const crew = require("./routes/crew");
app.use("/", crew);

const myinfo = require("./routes/myinfo");
app.use("/myinfo", myinfo);

const write = require("./routes/crew");
app.use("/write", write);

app.get("*", (req, res) => {
    res.send("404 Error");
});

app.listen(port, () => {
    console.log(`주소는 localhost:${port} 입니다.`);
});