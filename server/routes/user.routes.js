module.exports = (app) => {
  const user = require("../controllers/user.controller");

  // Create a new user
  app.post("/users/register", user.create);

  // Retrieve all user
  app.get("/users", user.findAll);

  // Retrieve a single user with userId
  app.get("/users/:userId", user.findOne);

  // Retrieve a single user with userId
  app.get("/users/name/:username", user.findOne);

  // Update a user with userId
  app.put("/users/:userId", user.update);

  // Delete a user with userId
  app.delete("/users/:userId", user.delete);
};
