const { pipeline } = require("node:stream/promises");
const Fastify = require("fastify");
const path = require("path");
const fs = require('fs')
const fastify = Fastify({
  logger: true,
  disableRequestLogging: true,
});
const crypto = require("crypto");
const cors = require("@fastify/cors")
fastify.register(cors, { origin: '*' });


const jwtSecret = crypto.randomBytes(64).toString("hex");
const mongoose = require("mongoose");

//import route
const BookRoutes = require("./books/BookRoutes");
const UserRoutes = require("./users/UserRoutes");
const authRoutes = require("./auth/authRoutes");
const auth = require("./auth/auth");
const authority = require("./auth/authority");

// MongoDB URI
const dbURI = "mongodb://localhost:27017/BanTruyen";
// kết nối đến MongoDB
mongoose
  .connect(dbURI, {})
  .then(() => {
    fastify.log.info("MongoDB connected successfully");
  })
  .catch((err) => {
    fastify.log.error("MongoDB connection error:", err);
  });

// Đóng kết nối mongoose khi tiến trình của node.js dừng lại
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose connection closed through app termination");
    process.exit(0);
  });
});

//Server


fastify.register(require("@fastify/jwt"), {
  secret: jwtSecret,
  sign: { algorithm: "HS256" },
});

fastify.register(require("@fastify/cookie"), {
  secret: "dkieijeodopwwnvjdiehfnd",
  parseOptions: {},
});

fastify.decorate("authenticate", async function (req, rep) {
  try {
    await req.jwtVerify();
    console.log("Decoded JWT:", req.user);
  } catch (err) {
    rep.clearCookie("token").code(401).send({ error: "Unauthorized" });
  }
});

fastify.register(require("@fastify/formbody"));

fastify.register(authRoutes);

fastify.register(require("@fastify/multipart"), {
  attachFieldsToBody: true,
  limits: {
    fieldSize: 50 * 1024 * 1024,
  },
});

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, 'public'),  
  prefix: "/img/",  
});


BookRoutes.forEach((route) => {
  fastify.route(route);
}); 

UserRoutes.forEach((route) => {
  fastify.route(route);
}); 

fastify.get('/', async (req, rep) => {
  return { message: 'Hello from Fastify!' };
});



fastify.listen({ port: 5000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
