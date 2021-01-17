import 'express-async-errors'

import express from "express";
const app = express();
import http from "http";
import db from "./src/config/db.js";
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
import init from './src/middleWare/initialize.js'
import errorHandler from './src/middleWare/errorHandler.js'
init(app)
errorHandler(app)
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
    db()
});
