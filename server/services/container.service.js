const db = require("../config/db");
const Container = db.Container;

module.exports = {
  create,
  getAll,
  getById,
  getByUserId,
  getByName,
  update,
  _delete,
};

async function getById(id) {
  return await Container.findById(id);
}

async function getByUserId(userId) {
  return await Container.find({ userId: { $regex: userId } }).sort("userId");
}

async function getByName(name) {
  return await Container.find({ name: { $regex: name } })
    .sort("name")
    .limit(5);
}

async function create(containerParam) {
  const container = new Container(containerParam);

  // save container
  await container.save();
}

// Retrieve and return all plants from the database.
async function getAll() {
  return await Container.find().sort("name");
}

// Update a container identified by the plantId in the request
async function update(id, containerParam) {
  const container = await Container.findById(id);

  // validate
  if (!container) throw "container not found";

  // copy containerParam properties to container
  Object.assign(container, containerParam);

  await container.save();
}

// Delete a container with the specified plantId in the request
async function _delete(id) {
  await container.findByIdAndRemove(id);
}
