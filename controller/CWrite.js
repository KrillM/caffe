const { Crew } = require("../model");

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
    
}
