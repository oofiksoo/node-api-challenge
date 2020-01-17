const db = require("../data/helpers/actionModel.js");
const express = require("express");
const router = express.Router();
const validateProjectId = require("../middleware/validateProjectId.js");
const validateActionId = require("../middleware/validateActionID.js");
const validateAction = require("../middleware/validateAction.js");

router.post("/:id/actions", validateProjectId, validateAction, (req, res) => {
    const newaction = {
        ...req.body,

        project_id: req.body.project_id,
        description: req.body.description,
        notes: req.body.notes
    };

    db.insert(newaction)

    .then(action => {
        res.status(201).json(action);
    })

    .catch(err => {
        console.log(err);

        res.status(500).json({ message: "Error adding action" });
    });
});

router.get("/", (req, res) => {
    db.get()
        .then(action => {
            if (action) {
                res.status(201).json(action);
            } else {
                res.status(500).json({
                    errorMessage: "The action information could not be retrieved."
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({});
        });
});

router.get("/:id", validateActionId, (req, res) => {
    const id = req.params.id;

    db.get(id)

    .then(action => {
        if (action) {
            res.send(action);
        } else {
            res.status(404).json({
                message: "The action with the specified ID does not exist."
            });
        }
    })

    .catch(err => {
        res
            .status(500)
            .json({ error: "The action information could not be retrieved." });
    });
});

router.delete("/:id", validateActionId, (req, res) => {
    const id = req.params.id;

    db.remove(id)

    .then(action => {
        if (action) {
            res.json(action);
        } else {
            res.status(404).json({
                message: "The action with the specified ID does not exist."
            });
        }
    })

    .catch(err => {
        res.status(500).json({ error: "The action could not be removed" });
    });
});

router.put("/:id", validateActionId, (req, res) => {
    // do your magic!
    const id = req.params.id;

    const changes = req.body;

    db.update(id, changes)

    .then(action => {
        if (!action) {
            res.status(404).json({
                message: "The action with the specified ID does not exist."
            });
        } else if (changes.description && changes.notes) {
            res.json(changes);
        } else {
            res.status(400).json({
                errorMessage: "Please provide description and notes for the action."
            });
        }
    })

    .catch(err => {
        res.status(500).json({
            error: "The action information could not be modified."
        });
    });
});

module.exports = router;