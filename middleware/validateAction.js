function validateAction(req, res, next) {
    // do your magic!
    const body = req.body;

    if (Object.keys(body).length === 0) {
        res.status(400).json({ message: "Missing action data." });
    } else if (!body.description || !body.notes || !body.project_id) {
        res.status(400).json({ message: "Missing required action field." });
    } else {
        next();
    }
}

module.exports = validateAction;