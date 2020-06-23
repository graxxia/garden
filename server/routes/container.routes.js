module.exports = (app) => {
  const container = require("../controllers/container.controller");

  // Create a container
  app.post("/containers/create", container.create);

  // Retrieve all container
  app.get("/containers", container.findAll);

  // Retrieve a single container with container name
  app.get("/containers/:name", container.findOne);

  app.get("/containers/userId/:userId", container.findOne);

  // Retrieve a single container with container id
  app.get("/containers/id/:id", container.findOne);

  // Update a container with containerService
  app.put("/containers/:containerId", container.update);

  // Delete a container with containerId
  app.delete("/containers/:containerId", container.delete);
};

//5ed9c06233bed933ac2be47a

//5ee64e71d68b20658886f2ec
