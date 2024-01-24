class HomeController {
    index(req, res) {
        res.status(200).json({
            key: true,
        })
    }
}

module.exports = new HomeController();
