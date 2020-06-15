const Container = require("../models/container.model");

// Create and Save a new Container
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Container content can not be empty",
    });
  }

  // Create a Container
  const container = new Container({
    name: req.body.name,
    depth: req.body.depth,
    height: req.body.height,
    length: req.body.length,
    id: req.body.id,
    plants: req.body.plants,
  });

  // Save Container in the database
  container
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Container.",
      });
    });
};

// Retrieve and return all containers from the database.
exports.findAll = (req, res) => {
  Container.find()
    .then((containers) => {
      res.send(containers);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving containers.",
      });
    });
};

// Find a single container with a containerId
exports.findOne = (req, res) => {
  let data = req.body.name;
  Container.find({ id: new RegExp(data, "i") })
    .then((container) => {
      if (!container) {
        return res.status(404).send({
          message: "Container not found with name " + req.body.name,
        });
      }
      res.send(container);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Container not found with name " + req.body.name,
        });
      }
      return res.status(500).send({
        message: "Error retrieving container with name " + req.body.name,
      });
    });
};

// Update a container identified by the containerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Container content can not be empty",
    });
  }

  // Find container and update it with the request body
  Container.findByIdAndUpdate(
    req.params.containerId,
    {
      name: req.body.name,
      depth: req.body.depth,
      height: req.body.height,
      length: req.body.length,
      id: req.body.id,
      plants: req.body.plants,
    },
    { new: true }
  )
    .then((container) => {
      if (!container) {
        return res.status(404).send({
          message: "Container not found with id " + req.params.containerId,
        });
      }
      res.send(container);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Container not found with id " + req.params.containerId,
        });
      }
      return res.status(500).send({
        message: "Error updating container with id " + req.params.containerId,
      });
    });
};

// Delete a container with the specified containerId in the request
exports.delete = (req, res) => {
  Container.findByIdAndRemove(req.params.containerId)
    .then((container) => {
      if (!container) {
        return res.status(404).send({
          message: "Container not found with id " + req.params.containerId,
        });
      }
      res.send({ message: "Container deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Container not found with id " + req.params.containerId,
        });
      }
      return res.status(500).send({
        message: "Could not delete container with id " + req.params.containerId,
      });
    });
};
