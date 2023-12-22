const { Comment } = require("../model");

exports.createComment = (req, res) => {
    const { comment, writtenBy, writtenAt } = req.body;

    Comment.create({
        comment: comment,
        writtenBy: writtenBy,
        writtenAt: writtenAt
    }).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).send("등록 오류 발생");
    });
}

exports.deleteComment = (req, res) => {
    Comment.destroy({
        where: {
            commentId: req.params.commentId
        }
    }).then(function(result){
        console.log("destroied? ", result);
        res.send({result: true})
        res.render("readReview");
    }).catch(function(err){
        console.log(err);
        res.status(500).send("삭제 오류 발생")
    })
}