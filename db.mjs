import mongoose from 'mongoose';

mongoose.connect(
    'mongodb://localhost:27017/vaco',
    { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

const entitySchema = mongoose.Schema({
    name: { type: String, required: true },
});

const Entity = mongoose.model("Entity", entitySchema);

const createEntity = async (data) => {
    try {
      const entity = new Entity(data);
      const ent = await entity.save();
      return ent
    } catch(err) {
      console.error(err)
    } 
}

const findEntities = async (filters = {}) => {
  try {
    const entities = await Entity.find(filters).exec();
    return entities
  } catch(err) {
    console.error(err)
  } 
}

const updateEntity = async (id, data) => {
  console.log(id)
  console.log(data)
  try {
    const ent = await Entity.findOneAndUpdate({_id: id}, data, {returnOriginal: false});
    return ent
  } catch(err) {
    console.error(err)
  } 
}

const deleteEntity = async (id) => {
  try {
    const ent = await Entity.deleteOne({_id: id});
    return ent
  } catch(err) {
    console.error(err)
  } 
}

export { 
  createEntity, 
  findEntities, 
  updateEntity, 
  deleteEntity 
};