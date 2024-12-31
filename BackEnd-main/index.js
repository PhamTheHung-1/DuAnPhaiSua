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
const Book = require("./books/Book");
const { title } = require("node:process");
const Cart = require("./cart/moduleCart");

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
  prefix: "/public/",  
});


BookRoutes.forEach((route) => {
  fastify.route(route);
}); 

UserRoutes.forEach((route) => {
  fastify.route(route);
}); 


//Kien
fastify.get('/cart', async (req, rep) => {
  const { userId } = req.query;
  if (!mongoose.Types.ObjectId.isValid(userId)) { 
    return rep.status(400).send({ error: "Invalid userId" }); 
  }
  try {
    const cart = await Cart.findOne({ userId: new mongoose.Types.ObjectId(userId) });
    if (!cart) {
      return rep.send({ items: [], totalPrice: 0 });
    }
    rep.send(cart);
  } catch (error) {
    console.error(error);
    rep.status(500).send({ error: "Internal Server Error" });
  }
});

fastify.post('/cart', async (req, rep) => {
  const { userId, productId, quantity } = req.body;
  console.log("productId:", productId);
  console.log("userId:", userId);
  if (!mongoose.Types.ObjectId.isValid(userId)) { 
    return rep.status(400).send({ error: "Invalid userId" }); 
  }
  try {
    const book = await Book.findById(productId);
    if (!book) {
      return rep.status(404).send({ error: "Book not found" });
    }
    let cart = await Cart.findOne({ userId: new mongoose.Types.ObjectId(userId) });
    if (!cart) {
      cart = new Cart({
        userId: new mongoose.Types.ObjectId(userId),
        items: [],
        totalPrice: 0,
      });
    }
    const cartItem = cart.items.find((item) => item.productId.toString() === productId);  
    if (cartItem) {
      cartItem.quantity = quantity;
      cartItem.price = book.price * cartItem.quantity;
    } else {
      cart.items.push({
        productId,
        title: book.title, 
        image: book.image,
        quantity,
        price: book.price * quantity,
      });
    }
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);
    await cart.save();
    console.log("Cart:", cart.items);
    rep.send(cart);
  } catch (error) {
    console.error(error);
    rep.status(500).send({ error: "Internal Server Error" });
  }
});
fastify.delete('/cart', async (req, rep) => {
  const { userId, productId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(userId)) { 
    return rep.status(400).send({ error: "Invalid userId" }); 
  }
  try {
    const cart = await Cart.findOne({ userId: new mongoose.Types.ObjectId(userId) });
    if (!cart) {
      return rep.send({ items: [], totalPrice: 0 });
    }
    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);
    await cart.save();
    rep.send(cart);
  } catch (error) {
    console.error(error);
    rep.status(500).send({ error: "Internal Server Error" });
  }
})
fastify.get('/search', async (req, rep) => {
  const query = req.query.query.toLowerCase();
  fastify.log.info(`Received search query: ${query}`);
  console.log(query);
  try{
    const resultSearch = await Book.find({title: { $regex: query, $options: 'i' }});
    return resultSearch;
  }catch(error){
    console.log(error);
    rep.status(500).send({ error: 'Internal Server Error' });
  }
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
