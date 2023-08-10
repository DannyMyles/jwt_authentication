const express = require("express");
const connectDb = require("./db/connect");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

/* Swagger configuration */
const options = {
  definition: {
    openapi: "3.0.0", // Enable/Disable OpenAPI. By default is null
    info: {
      version: "2.0.0", // by default: '1.0.0'
      title: "Authentication Api", // by default: 'REST API'
      description: "API for Managing authentication",
    },
    servers: [{ url: "http://localhost:8080" }],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);


// MIDDLEWARES START
// Middleware for getting json response
app.use(express.json());

// swagger documentation
app.use("/app-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Middle to serve static files
app.use(express.static("./public"));

// for session storage
app.use(cookieParser());
// Logs HTTP request details to the console or a log file(middleware)
app.use(morgan("dev"));

// Adding CORS middleware
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:4200"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// MIDDLEWARES START END

// use the tasks route
app.use("/api/v1/users", authRoutes);

// START ERROR HANDLING MIDLEWRES
// view engine
app.set("view engine", "ejs");

const port = process.env.PORT || 3000;
// database connection
const server = async () => {
  try {
    await connectDb();
    app.listen(port, console.log(`Server is listening to ${port}`));
  } catch (error) {}
};
server();
