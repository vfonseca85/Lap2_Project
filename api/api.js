const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');
const userRouter = require('./routers/user');
const itemRouter = require('./routers/item');

const api = express();

api.use(cors());
api.use(express.json());
api.use(logRoutes);

api.get("/", (req, res) => {
    res.send("Welcome to our API!!")
})

api.use("/users", userRouter);
api.use("/item", itemRouter);



module.exports = api;
