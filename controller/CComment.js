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

exports.updateComment = async (req, res) => {
    const { comment } = req.body;

    try{
        await Comment.update({
            comment
        }, {
            where: {commentId: req.params.commentId}
        })
        res.send("ok");
    } catch (error) {
        console.error("updateComment 중 오류 발생:", error);
        res.status(500).send("수정 오류가 발생하였습니다.");
    }
}

exports.deleteComment = (req, res) => {
    Comment.destroy({
        where: {
            commentId: req.params.commentId
        }
    }).then(function(result){
        res.send({result: true})
        res.render("readReview");
    }).catch(function(err){
        console.log(err);
        res.status(500).send("삭제 오류 발생")
    })
}