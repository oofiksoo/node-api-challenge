const db = require("../data/helpers/projectModel.js");

function validateProjectId(req, res, next) {
    // do your magic!
    const id = req.params.id;

    db.get(id)

    .then(project => {
        if (!project) {
            res.status(400).json({ message: "Invalid project id." });
        } else {
            req.project = project;

            next();
        }
    })

    .catch(err => {
        console.log(err);

        res.status(500).json({ message: "Error retrieving project id." });
    });
}
module.exports = validateProjectId;