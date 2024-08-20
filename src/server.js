import express from "express";
import __dirname from "./utils/dirname.js";
import morgan from "morgan";
import passport from "passport";
import mongoose from "mongoose";
import Handlebars from "handlebars";
import handlebars from "express-handlebars";
import productsRoutes from "./routes/products.routes.js";
import cartsRoutes from "./routes/carts.routes.js";
import { Server } from "socket.io";
import viewsRoutes from "./routes/views.routes.js";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import { initializePassport } from ".//config/passport.config.js";

const app = express();

//Puerto
const PORT = 8080;

//app configuración
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// Passport Configuración
initializePassport();
app.use(passport.initialize());

//Routes
app.use("/", viewsRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/api/auth", authRoutes);

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
  socket.emit("carts", cartManager);

//Mongo DB configuración

mongoose
  .connect("mongodb://localhost:27017/carrito")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Error");
  });
