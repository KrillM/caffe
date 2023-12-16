const crypto = require("crypto");
const { Crew } = require("../model");
const multer = require("multer");
const path = require("path");

const uploadFiles = multer({
    storage: multer.diskStorage({
        destination: function(req, file, done){
            done(null, "files/");
        },
        filename: function(req, file, done){
            console.log(file)
            const ext = path.extname(file.originalname); 
            const basename = path.basename(file.originalname, ext); 
            const fileName = basename + "_" + Date.now() + ext;
            console.log(req.body);
            done(null, fileName);
        }
    }),
    limits: {fileSize: 5 * 1024 * 1024}
})

const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return `${salt}:${hash}`;
}

exports.signUpPage = (req, res) => {
    res.render("signup");
}

exports.signUpProcess = async (req, res, next) => {
    try {
        await uploadFiles.single("profileImage")(req, res, async function (err) {
            if (err) {
                console.error("이미지 업로드 중 오류 발생:", err);
                return res.status(500).send("이미지 업로드 중 오류가 발생했습니다.");
            }

            const { email, password, nickname, phoneNumber } = req.body;
            const profileImage = req.file ? req.file.filename : null;

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
        
            const hashedPassword = hashPassword(password);
        
            await Crew.create({
                email,
                password: hashedPassword,
                nickname,
                phoneNumber,
                profileImage: profileImage || null,
            });
            res.send("ok");
        });
    } catch (error) {
        console.error("가입 프로세스 중 오류 발생:", error);
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

exports.updateProfile = async (req, res) => {
    const { email, nickname, phoneNumber } = req.body;

    try {
        const emailExists = await Crew.findOne({ where: { email } });
        const nicknameExists = await Crew.findOne({ where: { nickname } });
        const phoneNumberExists = await Crew.findOne({ where: { phoneNumber } });

        if (emailExists && emailExists.email !== req.session.user) {
            return res.status(400).send("이미 가입된 이메일입니다.");
        }

        if (nicknameExists && nicknameExists.email !== req.session.user) {
            return res.status(400).send("이미 사용 중인 닉네임입니다.");
        }

        if (phoneNumberExists && phoneNumberExists.email !== req.session.user) {
            return res.status(400).send("이미 등록된 전화번호입니다.");
        }

        // 수정된 Crew.update 호출, 'where' 절을 포함
        await Crew.update({
                email,  // 업데이트하려는 필드를 포함합니다
                nickname,
                phoneNumber,
            },{
                where: {
                    email: req.session.user,
                },
            }
        );
        res.send("ok");
    } catch (error) {
        console.error("updateProfile 중 오류 발생:", error);
        res.status(500).send("수정 오류가 발생하였습니다.");
    }
};

exports.updatePassword = async (req, res) => {
    const { password } = req.body;
    const hashedPassword = hashPassword(password);

    try {
        await Crew.update({
                password: hashedPassword
            },{
                where: {
                    email: req.session.user,
                },
            }
        );
        res.send("ok");
    } catch (error) {
        console.error("updatePassword 중 오류 발생:", error);
        res.status(500).send("수정 오류가 발생하였습니다.");
    }
};

exports.updateImage = async (req, res, next) => {
    try {
        await uploadFiles.single("profileImage")(req, res, async function (err) {
            if (err) {
                console.error("이미지 업로드 중 오류 발생:", err);
                return res.status(500).send("이미지 업로드 중 오류가 발생했습니다.");
            }

            const updateProfileImage = req.file ? req.file.filename : null;

            await Crew.update({
                profileImage: updateProfileImage
            },{
                where: {
                    email: req.session.user,
                },
            }
        );
            res.send("ok");
        });
    } catch (error) {
        console.error("프로필 이미지 수정 중 오류 발생:", error);
        res.status(500).send("프로필 이미지 수정 중 오류가 발생하였습니다.");
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