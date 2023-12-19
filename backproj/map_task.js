import { Sequelize } from "sequelize";
import DatabaseAdapter from "./core/database/pg-adapter.js";
import Server from "./core/server.js";
import Routing from "./core/routes.js";
import regRoutes from './modules/user/router.js';
import comRoutes from './modules/comment/router.js';
import allModels from "./modules/models/index.js";
import SwaggerDoc from "./core/swagger.js";

const PORT = process.env.PORT || 3000;
const GLOBAL_PREFIX = process.env.PREFIX || ""

new Server(PORT, [
    new DatabaseAdapter(
        new Sequelize(process.env.PG_DB_DATABASE, process.env.PG_DB_USER, process.env.PG_DB_PASSWORD, {
            host: process.env.PG_DB_HOST,
            port: process.env.PG_DB_PORT,
            sync: { alter: true },
            logging: false,
            dialect: "postgres"
        })
    ).registerModels([...allModels]),
    new Routing(GLOBAL_PREFIX, [
        { router: regRoutes},
        { router: comRoutes, prefix: "/comments"}
    ]),
    new SwaggerDoc({
        definition: {
            openapi: "3.0.0",
            info: {
                title: "SERVER CORE",
                version: "1.0.0",
                description: "Server core",
                contact: {
                    name: "wound3d",
                    url: "http://localhost:5000"
                }
            },
            components: {
                securitySchemes: {
                    bearer: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
                }
            },
            security: [{ bearer: [] }]
        },
        apis: ["./documents/**/*.yml", "./documents/**/*.yaml"]
    })
])
    .initServices()
    .then((server) => server.run(() => console.log(`Server started on port: ${PORT}`)));
