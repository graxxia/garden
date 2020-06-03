const Plant = require("../models/plant.model");

// Create and Save a new Plant
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Plant content can not be empty",
    });
  }

  // Create a Plant
  const plant = new Plant({
    name: req.body.name,
    family: req.body.family,
    genus: req.body.genus,
    species: req.body.species,
    category: req.body.category,
    sun: req.body.sun,
    water: req.body.water,
    hardiness: req.body.hardiness,
    foliage: req.body.foliage,
    height: req.body.height,
    spacing: req.body.spacing,
    color: req.body.color,
    soil: req.body.soil,
    propogation: req.body.propogation,
    collectionMethod: req.body.collectionMethod,
    region: req.body.region,
  });

  // Save Plant in the database
  plant
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Plant.",
      });
    });
};

// Retrieve and return all plants from the database.
exports.findAll = (req, res) => {
  Plant.find()
    .then((plants) => {
      res.send(plants);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving plants.",
      });
    });
};

// Find a single plant with a plantId
exports.findOne = (req, res) => {
  Plant.findById(req.params.plantId)
    .then((plant) => {
      if (!plant) {
        return res.status(404).send({
          message: "Plant not found with id " + req.params.plantId,
        });
      }
      res.send(plant);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Plant not found with id " + req.params.plantId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving plant with id " + req.params.plantId,
      });
    });
};

// Update a plant identified by the plantId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Plant content can not be empty",
    });
  }

  // Find plant and update it with the request body
  Plant.findByIdAndUpdate(
    req.params.plantId,
    {
      name: req.body.name,
      family: req.body.family,
      genus: req.body.genus,
      species: req.body.species,
      category: req.body.category,
      sun: req.body.sun,
      water: req.body.water,
      hardiness: req.body.hardiness,
      foliage: req.body.foliage,
      height: req.body.height,
      spacing: req.body.spacing,
      color: req.body.color,
      soil: req.body.soil,
      propogation: req.body.propogation,
      collectionMethod: req.body.collectionMethod,
      region: req.body.region,
    },
    { new: true }
  )
    .then((plant) => {
      if (!plant) {
        return res.status(404).send({
          message: "Plant not found with id " + req.params.plantId,
        });
      }
      res.send(plant);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Plant not found with id " + req.params.plantId,
        });
      }
      return res.status(500).send({
        message: "Error updating plant with id " + req.params.plantId,
      });
    });
};

// Delete a plant with the specified plantId in the request
exports.delete = (req, res) => {
  Plant.findByIdAndRemove(req.params.plantId)
    .then((plant) => {
      if (!plant) {
        return res.status(404).send({
          message: "Plant not found with id " + req.params.plantId,
        });
      }
      res.send({ message: "Plant deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Plant not found with id " + req.params.plantId,
        });
      }
      return res.status(500).send({
        message: "Could not delete plant with id " + req.params.plantId,
      });
    });
};
