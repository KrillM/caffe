const { Crew } = require("../model");

// 홈페이지
exports.homePage = (req, res) => {
    res.render("index");
}

exports.signUpPage = (req, res) => {
    res.render("signup")
}

exports.loginPage = (req, res) => {
    res.render("login")
}