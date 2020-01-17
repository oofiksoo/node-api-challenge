const db = require("./dbconfig.js.js");
const express = require("express");
const validateProjectId = require("../middleware/validateProjectId.js");
const router = express.Router();

//get all projects
router.get("/", (req, res) => {
    db.get()

    .then(project => {
        res.status(200).json(project);
    })

    .catch(error => {
        console.log("error on GET /api/projects/", error);

        res.status(500).json({
            errorMessage: "The Projects information could not be retrieved."
        });
    });
});
//get a project by id
router.get("/:id", validateProjectId, (req, res) => {
    const id = req.params.id;

    db.getById(id)

    .then(project => {
        if (project.length !== 0) {
            res.status(200).json(project);
        } else {
            res.status(404).json({
                errorMessage: "The project with the specified ID does not exist."
            });
        }
    })

    .catch(error => {
        console.log("error on GET /api/projects/:id", error);

        res.status(500).json({
            errorMessage: "The project information could not be retrieved."
        });
    });
});
//post a project
router.post("/", (req, res) => {
    db.insert(req.body)

    .then(user => {
        res.status(201).json(user);
    })

    .catch(err => {
        console.log(err);

        res.status(500).json({ message: "Error adding post" });
    });
});
//delete a project by id
router.delete("/:id", validateProjectId, (req, res) => {
    const id = req.params.id;

    db.remove(id)

    .then(project => {
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({
                errorMessage: "The project with the specified ID does not exist."
            });
        }
    })

    .catch(error => {
        console.log("error on DELETE /api/projects/:id", error);

        res.status(500).json({
            errorMessage: "The project could not be removed"
        });
    });
});
//update a project
router.put("/:id", validateProjectId, (req, res) => {
    const id = req.params.id;

    const data = req.body;

    if (!data.name || !data.description) {
        res.status(400).json({
            errorMessage: "Please provide name and description for the project."
        });
    } else {
        db.update(id, data)

        .then(post => {
            if (project) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    errorMessage: "The project with the specified ID does not exist."
                });
            }
        })

        .catch(error => {
            console.log("error on PUT /api/projects/:id", error);

            res.status(500).json({
                errorMessage: "The project information could not be modified."
            });
        });
    }
});

module.exports = router;