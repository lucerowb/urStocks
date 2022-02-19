const express = require("express");
const colors = require("colors");
// const swaggerJsDoc = require("swagger-jsdoc");
// const swaggerUI = require("swagger-ui-express");
const dotenv = require("dotenv").config();
const { errorHandler } = require(`./middleware/errorMiddleware`);
const connectDB = require(`./config/db`);
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: "Stock API",
//       version: "1.0.0",
//       description: "Stock API Information",
//       contact: {
//         name: "Srijan Bajracharya",
//       },
//     },
//   },
//   apis: ["server.js"],
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use(`/api-docs`, swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// /**
//  * @swagger
//  * /api/stocks:
//  *  get:
//  *    description: Get all stocks
//  *    responses:
//  *        200:
//  *            description: A successful response
//  */
app.use(`/api/`, require("./routes/index"));

app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
