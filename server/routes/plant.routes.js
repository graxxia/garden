module.exports = (app) => {
  const plant = require("../controllers/plant.controller");

  // Create a new plant
  app.post("/plants/create", plant.create);

  // Retrieve all plant
  app.get("/plants", plant.findAll);

  // Retrieve a single plant with plant id
  app.get("/plants/id/:id", plant.findOne);

  // Retrieve a single plant with plant name
  app.get("/plants/:name", plant.findOne);

  // Update a plant with plantId
  app.put("/plants/:plantId", plant.update);

  // Delete a plant with plantId
  app.delete("/plants/:plantId", plant.delete);
};
