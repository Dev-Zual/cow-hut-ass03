import mongoose from "mongoose";
require("dotenv").config();
const port = process.env.PORT;
import app from "./app";

async function database() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("Database connection Successfully");

    app.listen(port, () => {
      console.log("application listening on port ", port);
    });
  } catch (error) {
    console.log("Database connection Failed", error);
  }
}

database();
