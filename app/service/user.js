const employees = require("../models/user");

var getUser = function (id, callback) {
    employees.findById( {_id: id})
    .lean()
    .exec(async function (err, user) {
        if (err) {
            return callback(err);
        }
        return callback(null, user);
    });
}

module.exports = {getUser};