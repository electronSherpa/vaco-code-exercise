import express from "express"
import { 
  createEntity, 
  findEntities, 
  updateEntity, 
  deleteEntity 
} from "./db.mjs";

const app = express()
app.use(express.urlencoded({extended: true}));
app.use(express.json())

const port = 3000

app.get('/entity', async (req, res) => {
  const entities = await findEntities()
  res.status = 200
  res.json(entities)
})

app.post('/entity', async (req, res) => {
  const ent = {
    name: req.body.name
  }
  const entity = await createEntity(ent)
  res.status = 201
  res.json(entity)
})

app.put('/entity/:id', async (req, res) => {
  const ent = {
    name: req.body.name
  }
  const entity = await updateEntity(req.params.id, ent)
  res.status = 200
  res.json(entity)
})

app.delete('/entity/:id', async (req, res) => {
  const entity = await deleteEntity(req.params.id)
  res.status = 200
  res.json(entity)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})