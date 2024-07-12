import express from "express";
import __dirname from "./dirname.js";
import mongoose from "mongoose";
import Handlebars from "handlebars";
import handlebars from "express-handlebars";
import productsRoutes from "./routes/products.routes.js";
import cartsRoutes from "./routes/carts.routes.js";
import { Server } from "socket.io";
import viewsRoutes from "./routes/views.routes.js";
import { productManager } from "./managers/productManager.js";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

const app = express();

//Puerto
const PORT = 8080;

//app configuración
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/", viewsRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);

//handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);

app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "./views"));

const server = app.listen(PORT, () => {
  console.log(`Server running on Port http://localhost:${PORT}`);
});

//socket.io
export const io = new Server(server);
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado", socket.id);
  socket.emit("products", productManager);
});

//Mongo DB configuración

mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Error");
  });
