import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import notFoundRouteMiddleware from "./middleware/notFoundRoute.middleware";
import errorHandlerMiddleware from "./middleware/errorHandler.middleware";

import authRoute from "./routes/auth.route";
import cartItemRoute from "./routes/cartItem.route";
import orderRoute from "./routes/order.route";
import pizzaRoute from "./routes/pizza.route";
import userRoute from "./routes/user.route";

const app = express();

const Port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/cart-items", cartItemRoute);
app.use("/api/orders", orderRoute);
app.use("/api/pizzas", pizzaRoute);
app.use("/api/users", userRoute);

app.all("*", notFoundRouteMiddleware);
app.use(errorHandlerMiddleware);

app.listen(Port, () => console.log(`App is listening on ${Port}...`));
