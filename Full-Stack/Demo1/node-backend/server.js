const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const axios = require("axios");

const app = express();
// app.use(cors());
app.use(
  cors({
    origin: [
      "https://redesigned-potato-g9x6r7q66gj29gvr-5173.app.github.dev"
    ],
    credentials: true,
  })
);
app.use(express.json());

const PORT = 5000;

// Swagger Config
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node API",
      version: "1.0.0",
    },
  },
  apis: ["./server.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Returns Hello from Node
 *     responses:
 *       200:
 *         description: Success
 */
app.get("/hello", (req, res) => {
  res.json({ message: "Hello from Node 🚀" });
});

/**
 * @swagger
 * /python:
 *   get:
 *     summary: Calls Python API
 *     responses:
 *       200:
 *         description: Success
 */
app.get("/python", async (req, res) => {
  const response = await axios.get("http://localhost:8000/python");
  res.json(response.data);
});

app.listen(PORT, () => {
  console.log(`Node Server running on http://localhost:${PORT}`);
});