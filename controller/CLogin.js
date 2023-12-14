const crypto = require("crypto");
const { Crew } = require("../model");

exports.homePage = (req, res) => {
    if(req.session.user){
        Crew.findOne({
            where:{
                email: req.session.user
            }
        }).then((result) => {
            console.log("조회", result);
            if(result){
                res.render("index", { user: result });
            }
            else{
                req.session.destroy((err) => {
                    res.render("index", { user: null });
                })
            }
        }).catch((err) => {
            console.log(err)
            res.status(500).send("접근 오류 발생")
        })
    } else {
        res.render("index", { user: null });
    }
}

exports.loginPage = (req, res) => {
    res.render("login")
}

exports.loginProcess = (req, res) => {
    const { email, password } = req.body;

    Crew.findOne({ where: { email: email } }).then((result) => {
        console.log(result);
        if (result) {
            const compare = comparePassword(password, result.dataValues.password);
            if (compare) {
                console.log("로그인 성공");
                req.session.user = email;
                res.send(email);
            } else {
                res.status(400).send("비밀번호가 틀렸습니다.");
            }
        } else {
            res.status(400).send("등록된 이메일이 없습니다.");
        }
    });
}

exports.logoutProcess = (req, res) => {
    if(req.session.user){
        req.session.destroy((err) => {
            res.send({ result: true })
        })
    }
    else{
        res.send({ result: false })
    }
}

function comparePassword (enteredPassword, storedPassword) {
    const [salt, originalHash] = storedPassword.split(":");
    const hash = crypto.pbkdf2Sync(enteredPassword, salt, 1000, 64, "sha512").toString("hex");
    return hash == originalHash;
}