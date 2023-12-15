const session = require('express-session');
const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 8000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/static"));
app.use("/files", express.static(__dirname + "/files"))

const uploadFiles = multer({
    storage: multer.diskStorage({
        destination: function(req, file, done){
            done(null, "files/");
        },
        filename: function(req, file, done){
            console.log(file)
            const ext = path.extname(file.originalname); 
            const basename = path.basename(file.originalname, ext); 
            const fileName = req.body.profileImage + "_" + basename + "_" + Date.now()+ext;
            done(null, fileName);
        }
    }),
    limits: {fileSize: 5*1024*1024}
})

module.exports = uploadFiles;

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

const router = require("./routes/crew");
app.use("/", router);

app.get("*", (req, res) => {
    res.send("404 Error");
});

app.listen(port, () => {
    console.log(`주소는 localhost:${port} 입니다.`);
});