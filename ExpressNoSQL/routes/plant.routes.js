module.exports = (app) => {
  const plant = require("../controllers/plant.controller");

  // Create a new plant
  app.post("/plant", plant.create);

  // Retrieve all plant
  app.get("/plants", plant.findAll);

  // Retrieve a single plant with plantId
  app.get("/plant/:plantId", plant.findOne);

  // Update a plant with plantId
  app.put("/plant/:plantId", plant.update);

  // Delete a plant with plantId
  app.delete("/plant/:plantId", plant.delete);
};
