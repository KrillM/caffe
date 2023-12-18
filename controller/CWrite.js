exports.writePage = (req, res) => {
    if(!req.session.user){
        res.send("index");
    }
    res.send("write");
}