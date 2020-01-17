function validateProjectId(req, res, next) {
    // do your magic!
    const id = req.params.id;

    db.getById(id)

    .then(post => {
        if (!post) {
            res.status(400).json({ message: "Invalid post id." });
        } else {
            req.post = post;

            next();
        }
    })

    .catch(err => {
        console.log(err);

        res.status(500).json({ message: "Error retrieving post id." });
    });
}
module.exports = validateProjectId;