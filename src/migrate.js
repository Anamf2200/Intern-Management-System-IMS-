
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB= require('./config/db')

const oldIntern = mongoose.connection.collection("interns");
const newUser = mongoose.connection.collection("users");

async function migrate() {

  try {
    await connectDB()

    const interns = await oldIntern.find().toArray();

    console.log("Found interns:", interns.length);

    const users = interns.map((user) => ({
      name: user.name,
      email: user.email,
      password: user.password,
      role: "intern", // IMPORTANT
      certificateSent: user.certificateSent || false,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    if (users.length > 0) {
      await newUser.insertMany(users);
      console.log("Migration successful!");
    } else {
      console.log("No data to migrate");
    }

    process.exit();
  } catch (err) {
    console.log("Error:", err.message);
    process.exit(1);
  }
}

migrate();