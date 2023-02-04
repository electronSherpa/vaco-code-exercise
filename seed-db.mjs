import { createCategories } from "./db.mjs"

const categories = [{"name": "General" }, {"name": "Technology"}, {"name": "Random"}]

createCategories(categories).then(() => {
  db.close()
})



