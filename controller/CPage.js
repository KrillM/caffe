const { Crew, Review, Comment, LikeTable } = require("../model");

exports.crewPage = async (req, res) => {
    try {
        const requestedNickname = req.params.nickname;
        const currentUser = req.session.user; // 현재 로그인한 사용자 정보를 세션에서 가져옴

        // Crew.findOne()를 사용하여 요청된 닉네임을 가진 사용자를 검색합니다.
        const result = await Crew.findOne({
            where: {
                nickname: requestedNickname
            }
        });

        if (result) {
            const results = await Review.findAll({
                where: {writtenBy: result.crewId},
                include: [{ model: Crew, attributes: ["nickname"] }],
            })

            // 현재 로그인한 사용자와 조회된 사용자가 동일한 경우, 현재 사용자의 프로필을 보여줍니다.
            if (currentUser && currentUser.id === result.id) {
                res.render("crewPage", { crew: result, review: results });
            } else {
                // 다른 사용자의 프로필을 보여줍니다.
                res.render("crewPage", { crew: result, review: results });
            }
        } else {
            res.status(404).send("존재하지 않는 사용자입니다.");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("접근 오류 발생");
    }
}

exports.readReviewPage = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;

        const reviews = await Review.findOne({
            where: { reviewId: reviewId },
            include: [{ model: Crew, attributes: ["nickname"] }]
        });

        const reacts = await Comment.findAll({
            where: { writtenAt: reviewId },
            include: [{ model: Crew, attributes: ["nickname", "profileImage"] }]
        });

        if (req.session.user) {
            const result = await Crew.findOne({
                where: {
                    email: req.session.user
                }
            });

            if (result) {
                res.render("readReview", { crew: result, review: reviews, comment: reacts });
            } else {
                req.session.destroy((err) => {
                    res.render("readReview", { crew: null, review: reviews, comment: reacts });
                });
            }
        } else {
            res.render("readReview", { crew: null, review: reviews, comment: reacts });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("접근 오류 발생");
    }
}

exports.toggleLike = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const crewId = req.params.crewId;
    
        // 해당 리뷰에 대한 좋아요 정보 확인
        const like = await LikeTable.findOne({
            where: {
                reviewId: reviewId,
                crewId: crewId
            }
        });
  
        if (like) {
            // 좋아요 정보가 있으면 좋아요 취소
            await like.destroy();
        } else {
            // 좋아요 정보가 없으면 좋아요 추가
            await LikeTable.create({
                crewId: crewId,
                reviewId: reviewId
            });
        }
    
        // 리뷰의 좋아요 수 업데이트
        const likeCount = await LikeTable.count({ where: { reviewId: reviewId } });
        await Review.update({ likeNum: likeCount }, { where: { reviewId: reviewId } });
    
        res.json({
            success: true,
            likeNum: likeCount
        });
    } catch (error) {
        console.error('좋아요 토글 에러:', error);
        res.status(500).send('Internal Server Error');
    }
};