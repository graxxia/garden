const express = require("express");
const plantService = require("../services/plant.service");
const router = express.Router();

// routes

// Create a plant
router.post("/create", create);

// Retrieve all plant
router.get("/", getAll);

// Retrieve a single plant with plant name
router.get("/:name", getByName);

// Retrieve a single plant with plant id
router.get("/id/:id", getById);

// Update a plant with plantId
router.put("/:plantId", updatePlant);

// Delete a plant with plantId
router.delete("/:plantId", _delete);

module.exports = router;

function create(req, res, next) {
  plantService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  plantService
    .getAll()
    .then((plants) => res.json(plants))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  plantService
    .getById(req.params.id)
    .then((plant) => (plant ? res.json(plant) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getByName(req, res, next) {
  plantService
    .getByName(req.params.name)
    .then((plant) => (plant ? res.json(plant) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function updatePlant(req, res, next) {
  plantService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  plantService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
