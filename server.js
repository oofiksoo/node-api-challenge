const express = require("express");
const cors = require("cors");
const ProjectRouter = require("./projects/Router.js");
const server = express();
const logger = require("./middleware/logger");
server.use(express.json());
server.use(cors());

server.get("/", logger, (req, res) => {
    res.send(`NO DATA AT ROOT - Get /api/projects`);
});

server.use("/api/projects", logger, ProjectRouter);

module.exports = server;