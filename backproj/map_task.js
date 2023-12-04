import express from "express";
import { Sequelize } from "sequelize";
import regRoutes from './modules/user/router.js';
import comRoutes from './modules/comment/router.js';
import allModels from "./modules/models/index.js";
import { initModels } from "./core/models_initter.js";

const app = express();

const sequelize = new Sequelize(process.env.PG_DB_DATABASE, process.env.PG_DB_USER, process.env.PG_DB_PASSWORD, {
    host: process.env.PG_DB_HOST,
    port: process.env.PG_DB_PORT,
    sync: { alter: true },
    logging: false,
    dialect: "postgres"
});

await initModels(sequelize, allModels);

app.use(express.json())
app.use('', regRoutes)
app.use('', comRoutes)
app.listen(5000);
console.log("Server started on port 5000");
