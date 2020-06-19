module.exports = (app) => {
  const plant = require("../controllers/plant.controller");

  // Create a new plant
  app.post("/plant/create", plant.create);

  // Retrieve all plant
  app.get("/plants", plant.findAll);

  // Retrieve a single plant with plant name
  app.get("/plant/:name", plant.findOne);
  app.get("/plant/id/:id", plant.find);

  // Retrieve a plant with plant name body
  app.post("/plant", plant.findOne);

  // Update a plant with plantId
  app.put("/plant/:plantId", plant.update);

  // Delete a plant with plantId
  app.delete("/plant/:plantId", plant.delete);
};
