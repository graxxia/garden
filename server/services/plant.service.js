const db = require("../config/db");
const Plant = db.Plant;

module.exports = {
  create,
  getAll,
  getById,
  getByName,
  update,
  _delete,
};

async function getById(id) {
  return await Plant.findById(id);
}

async function getByName(name) {
  return await Plant.find({ name: { $regex: name } })
    .sort()
    .limit(5);
}

async function create(plantParam) {
  // validate
  if (await Plant.findOne({ name: plantParam.name })) {
    throw 'Name "' + plantParam.name + '" already exists';
  }

  const plant = new Plant(plantParam);

  // save plant
  await plant.save();
}

// Retrieve and return all plants from the database.
async function getAll() {
  return await Plant.find().sort("name");
}

// Update a plant identified by the plantId in the request
async function update(id, plantParam) {
  const plant = await Plant.findById(id);

  // validate
  if (!plant) throw "plant not found";
  if (
    plant.name !== plantParam.name &&
    (await plant.findOne({ name: plantParam.name }))
  ) {
    throw 'Plant "' + plantParam.name + '" is already taken';
  }

  // copy plantParam properties to plant
  Object.assign(plant, plantParam);

  await plant.save();
}

// Delete a plant with the specified plantId in the request
async function _delete(id) {
  await plant.findByIdAndRemove(id);
}
