import userRoute from "./user";
import productRoute from "./product";
import orderRoute from "./order";
import { Express } from 'express';

export const rootRouter = (app: Express ) => {
  app.use("/user", userRoute);
  app.use("/product", productRoute);
  app.use("/order", orderRoute);
  
  app.get("/health", (_, res) =>
    res.json({ message: "Everything is healthy 👀" })
  );
};
