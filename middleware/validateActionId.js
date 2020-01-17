const db = require("../data/helpers/actionModel.js");

function validateActionId(req, res, next) {
    // do your magic

    const id = req.params.id;

    db.get(id)

    .then(user => {
        if (!user) {
            res.status(400).json({ message: "Invalid user id." });
        } else {
            req.user = user;

            next();
        }
    })

    .catch(err => {
        console.log(err);

        res.status(500).json({ message: "Error retrieving user id." });
    });
}

module.exports = validateActionId;