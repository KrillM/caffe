const crypto = require("crypto");
const { Crew, Review } = require("../model");

exports.homePage = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            include: [{ model: Crew, attributes: ["nickname"] }],
        });

        if (req.session.user) {
            const result = await Crew.findOne({
                where: {
                    email: req.session.user
                }
            });

            console.log("조회", result);

            if (result) {
                res.render("index", { user: result, review: reviews });
            } else {
                req.session.destroy((err) => {
                    res.render("index", { user: null, review: reviews });
                });
            }
        } else {
            res.render("index", { user: null, review: reviews });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("접근 오류 발생");
    }
};

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