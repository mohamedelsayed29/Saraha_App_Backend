import express from'express'
import bootstrap from './Src/app.controller.js'
const app = express()
await bootstrap(app,express)
