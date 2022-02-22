const path = require("path");
const express = require("express");
const colors = require("colors");
const cors = require("cors");
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
app.use(cors());

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

// serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("not in production"));
}

app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
