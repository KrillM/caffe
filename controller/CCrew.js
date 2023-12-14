const crypto = require("crypto");
const { Crew } = require("../model");

exports.signUpPage = (req, res) => {
    res.render("signup");
}

exports.signUpProcess = async (req, res) => {
    const { email, password, nickname, phoneNumber } = req.body;
  
    try {
        const emailExists = await Crew.findOne({ where: { email } });
        const nicknameExists = await Crew.findOne({ where: { nickname } });
        const phoneNumberExists = await Crew.findOne({ where: { phoneNumber } });
    
        if (emailExists) {
            return res.status(400).send("이미 가입된 이메일입니다.");
        }
    
        if (nicknameExists) {
            return res.status(400).send("이미 사용 중인 닉네임입니다.");
        }
    
        if (phoneNumberExists) {
            return res.status(400).send("이미 등록된 전화번호입니다.");
        }
    
        const hashPassword = this.hashPassword(password);
    
        Crew.create({
            email,
            password: hashPassword,
            nickname,
            phoneNumber,
        }).then(() => {
                res.send("ok");
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("등록 오류가 발생하였습니다.");
            });
        } catch (error) {
            console.error("Error during signupProcess:", error);
            res.status(500).send("등록 오류가 발생하였습니다.");
        }
};

exports.profilePage = (req, res) => {
    if(req.session.user){
        Crew.findOne({
            where:{
                email: req.session.user
            }
        }).then((result) => {
            console.log("조회", result);
            if(result){
                res.render("myInfo", { user: result });
            }
        }).catch((err) => {
            console.log(err)
            res.status(500).send("접근 오류 발생")
        })
    } else {
        res.render("index");
    }
}

exports.profileDelete = (req, res) => {
    Crew.destroy({
        where:{
            email: req.session.user,
        }
    }).then((result) => {
        console.log("삭제 ",result);
        res.send({ result:true })
    }).catch((err) => {
        console.log(err);
        res.status(400).send();
    })
}

exports.hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return `${salt}:${hash}`;
}
