const { Crew } = require("../model");

// 홈페이지
exports.homePage = (req, res) => {
    res.render("index");
}