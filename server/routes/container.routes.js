module.exports = (app) => {
  const container = require("../controllers/container.controller");

  // Create a new container
  app.post("/container/create", container.create);

  // Retrieve all container
  app.get("/containers", container.findAll);

  // Retrieve a single container with container id
  app.get("/container/:id", container.findOne);

  // Retrieve a container with container name body
  app.post("/container", container.findOne);

  // Update a container with containerId
  app.put("/container/:containerId", container.update);

  // Delete a container with containerId
  app.delete("/container/:containerId", container.delete);
};

//5ed9c06233bed933ac2be47a

//5ee64e71d68b20658886f2ec
