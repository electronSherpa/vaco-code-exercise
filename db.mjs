import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

console.log(autoIncrement)

mongoose.connect(
    'mongodb://localhost:27017/vaco',
    { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

autoIncrement.initialize(db)

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
})

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    timeStamp: {type: Date, required: true},
    categoryId: {type: Number, required: true},
});

categorySchema.plugin(autoIncrement.plugin, 'Category');
postSchema.plugin(autoIncrement.plugin, 'Post');

const Category = mongoose.model("Category", categorySchema);
const Post = mongoose.model("Post", postSchema);


const createPost = async (data) => {
    try {
      const post = new Post(data);
      const ent = await post.save();
      return ent
    } catch(err) {
      throw new Error(err._message)
    } 
}

const findPosts = async (filters = {}) => {
  try {
    const posts = await Post.find(filters).sort({timeStamp: -1}).exec();
    return posts
  } catch(err) {
    console.error(err)
  } 
}

const updatePost = async (id, data) => {
  try {
    const ent = await Post.findOneAndUpdate({_id: id}, data, {returnOriginal: false});
    return ent
  } catch(err) {
    console.error(err)
  } 
}

const deletePost = async (id) => {
  try {
    const ent = await Post.deleteOne({_id: id});
    return ent
  } catch(err) {
    console.error(err)
  } 
}

const deletePosts = async (id) => {
  try {
    const ent = await Post.deleteMany();
    return ent
  } catch(err) {
    console.error(err)
  } 
}

const getCategories = async () => {
  try {
    const posts = await Category.find({}).exec();
    return posts
  } catch(err) {
    console.error(err)
  } 
}

const deleteCategories = async (id) => {
  try {
    const ent = await Category.deleteMany({});
    return ent
  } catch(err) {
    console.error(err)
  } 
}

const createCategories = async (data) => {
  data.map(async (d) => {
    try {
      const new_cat = new Category(d);
      const cat = await new_cat.save();
      return cat
    } catch(err) {
      console.error(err)
    } 
  })
}

export { 
  createPost, 
  findPosts, 
  updatePost, 
  deletePost,
  deletePosts,
  getCategories,
  createCategories,
  deleteCategories
};