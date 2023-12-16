const { Crew } = require("../model");

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

        console.log("조회", result);

        if (result) {
            // 현재 로그인한 사용자와 조회된 사용자가 동일한 경우, 현재 사용자의 프로필을 보여줍니다.
            if (currentUser && currentUser.id === result.id) {
                res.render("crewPage", { user: result });
            } else {
                // 다른 사용자의 프로필을 보여줍니다.
                res.render("crewPage", { user: result });
            }
        } else {
            res.status(404).send("존재하지 않는 사용자입니다.");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("접근 오류 발생");
    }
}
