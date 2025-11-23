import express from'express'
import bootstrap from './Src/app.controller.js'
const app = express()
const port = 3000
await bootstrap(app,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 