const { Crew, Review } = require("../model");
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
    limits: {
        fileSize: 5 * 1024 * 1024,
        fieldSize: 100 * 1024 * 1024,
    }
})

exports.writePage = (req, res) => {
    if(!req.session.user){
        res.redirect("/");
        return false;
    }

    Crew.findOne({
        where: {
            email: req.session.user,
        }
    }).then((result) => {
        console.log("조회 ", result);
        if(result){
            res.render("write", { crew: result })
        }
        else{
            res.redirect("/signup");
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send("접근 오류 발생");
    })
}

exports.createReview = async (req, res, next) => {
    try{
        await uploadFiles.single("representImage")(req, res, async function(err) {
            if (err) {
                console.error("이미지 업로드 중 오류 발생:", err);
                return res.status(500).send("이미지 업로드 중 오류가 발생했습니다.");
            }

            const { title, content, writtenBy } =req.body;
            const representImage = req.file ? req.file.filename : null;

            await Review.create({
                title,
                content,
                writtenBy,
                representImage: representImage || null
            });
            res.send("ok");
        });
    }
    catch (error) {
        console.error("글 등록 프로세스 중 오류 발생:", error);
        res.status(500).send("글 등록 중 오류가 발생하였습니다.");
    }
}

exports.updateReviewPage = async (req, res) => {
    try{
        if(!req.session.user){
            res.redirect("/");
            return false;
        }
    
        const result = await Crew.findOne({
            where:{ email: req.session.user }
        })
    
        if(result) {
            const id = req.params.reviewId;
            const results = await Review.findOne({
                where: { reviewId: id }
            })
            res.render("updateReview", {crew: result, review: results});
        } else {
            res.status(404).send("존재하지 않는 사용자입니다.");
        }
    }
    catch {
        console.log(err);
        res.status(500).send("접근 오류 발생");
    }
}

exports.deleteReview = (req, res) => {
    Review.destroy({
        where:{
            reviewId: req.params.reviewId,
        }
    }).then((result) => {
        console.log("삭제 ",result);
        res.send({ result: true })
    }).catch((err) => {
        console.log(err);
        res.status(400).send();
    })
}