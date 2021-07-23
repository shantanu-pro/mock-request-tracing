const userService = require('../service/user');

module.exports = function () {
    return {
        getUser: function (req, res) {
            userService.getUser("60f6ab9fdc367574299f33ac", 
            function (err, user) {
                if (err) {
                    req.log.warn(err);
                    return res
                        .status(500)
                        .json(utils.createRes(false, ["Could not find user"]));
                    }
                    return res.status(200).json(user);
                }
            );
        }
    }
};