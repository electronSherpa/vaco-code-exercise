import express from "express"
import { 
  createPost, 
  findPosts, 
  updatePost, 
  deletePost, 
  getCategories,
  deleteCategories,
  deletePosts
} from "./db.mjs";

const app = express()
app.use(express.urlencoded({extended: true}));
app.use(express.json())

const port = 3000

app.get('/posts', async (req, res) => {
  const posts = await findPosts()
  res.status = 200
  res.json(posts)
})

app.get('/posts/:id', async (req, res) => {
  const posts = await findPosts({_id: req.params.id})
  res.status = 200
  res.json(posts)
})

app.post('/posts', async (req, res) => {
  try {
    const date = new Date();

    const ent = {
      title: req.body.title,
      text: req.body.text,
      timeStamp: date.toISOString(),
      categoryId: req.body.categoryId
    }

    const posts = await createPost(ent)
    res.status = 201
    res.json(posts)
  } catch (err) {
    res.status = 400
    res.send("")
  }
})

app.put('/posts/:id', async (req, res) => {
  const ent = {
    title: req.body.title,
    text: req.body.text,
    categoryId: req.body.categoryId
  }

  const posts = await updatePost(req.params.id, ent)
  res.status = 200
  res.json(posts)
})

app.delete('/posts', async (req, res) => {
  const posts = await deletePosts()
  res.status = 200
  res.json(posts)
})


app.delete('/posts/:id', async (req, res) => {
  const posts = await deletePost(req.params.id)
  res.status = 200
  res.json(posts)
})

app.get('/categories', async (req, res) => {
  const cats = await getCategories()
  res.status = 200
  res.json(cats)
})

app.delete('/categories', async (req, res) => {
  const cats = await deleteCategories()
  res.status = 200
  res.json(cats)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})