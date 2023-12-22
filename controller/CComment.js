const { Comment } = require("../model");

exports.createComment = (req, res) => {
    const reviewId = req.params.reviewId;

    Comment.create({
        comment: req.params.comment,
        crewId: req.params.crewId,
        reviewId: reviewId
    }).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).send("등록 오류 발생");
    })
}