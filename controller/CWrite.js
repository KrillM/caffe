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
    limits: {fileSize: 5 * 1024 * 1024}
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
            res.render("write", { user: result })
        }
        else{
            res.redirect("/signup");
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send("접근 오류 발생");
    })
}

exports.createReview = (req, res) => {
    try{

    }
    catch {
        
    }
}
