import express, {NextFunction, Request, Response} from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"
dotenv.config();

import notFoundRouteMiddleware from "./middleware/notFoundRoute.middleware";
import errorHandlerMiddleware from "./middleware/errorHandler.middleware";

import authRoute from "./routes/auth.route";
import cartItemRoute from "./routes/cartItem.route";
import orderRoute from "./routes/order.route";
import pizzaRoute from "./routes/pizza.route";
import userRoute from "./routes/user.route";
import stripeRoute from "./routes/stripe.route"

const app = express();

const Port = process.env.PORT || 3000;

app.use(cookieParser());

/* app.use((req: Request, res: Response, next: NextFunction) => {
  const originalUrl = req.headers.origin
  cors({
    credentials: true,
    origin: originalUrl,
    methods: "GET, POST, PATCH, PUT, DELETE",
  })
  next()
}) */

app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200', 'http://localhost:5173']
})) 


app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/cart-items", cartItemRoute);
app.use("/api/orders", orderRoute);
app.use("/api/pizzas", pizzaRoute);
app.use("/api/users", userRoute);
app.use("/api/stripe", stripeRoute);

app.all("*", notFoundRouteMiddleware);
app.use(errorHandlerMiddleware);

app.listen(Port, () => console.log(`App is listening on ${Port}...`));
