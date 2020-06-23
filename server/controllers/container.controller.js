const express = require("express");
const containerService = require("../services/container.service");
const router = express.Router();

// routes

// Create a container
router.post("/create", create);

// Retrieve all container
router.get("/", getAll);

// Retrieve a single container with container name
router.get("/:name", getByName);

router.get("/userId/:userId", getByUserId);

// Retrieve a single container with container id
router.get("/id/:id", getById);

// Update a container with containerService
router.put("/:containerId", updateContainer);

// Delete a container with containerId
router.delete("/:containerId", _delete);

module.exports = router;

function create(req, res, next) {
  containerService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  containerService
    .getAll()
    .then((containers) => res.json(containers))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  containerService
    .getById(req.params.id)
    .then((container) =>
      container ? res.json(container) : res.sendStatus(404)
    )
    .catch((err) => next(err));
}

function getByUserId(req, res, next) {
  containerService
    .getByUserId(req.params.userId)
    .then((container) =>
      container ? res.json(container) : res.sendStatus(404)
    )
    .catch((err) => next(err));
}

function getByName(req, res, next) {
  containerService
    .getByName(req.params.name)
    .then((container) =>
      container ? res.json(container) : res.sendStatus(404)
    )
    .catch((err) => next(err));
}

function updateContainer(req, res, next) {
  containerService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  containerService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
