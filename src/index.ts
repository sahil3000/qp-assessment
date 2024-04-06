import express from "express";
import { rootRouter } from "./routes";
import { connectDB } from "./utils/connection";
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
rootRouter(app);

app.listen(PORT, () =>  
  console.log(`Express Application Started on PORT ${PORT}`)
);
