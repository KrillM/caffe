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