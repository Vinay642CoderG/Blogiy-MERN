import mongoose from "mongoose";
import bcrypt from "bcrypt";
import env from "../src/config/env.js";
import User from "../src/models/User.js";

async function createAdmin() {
  try {
    await mongoose.connect(env.MONGO_URI);

    const email = "admin@example.com";
    const password = "admin123";

    const exists = await User.findOne({ email });

    if (exists) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: "Administrator",
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin user created");
    console.log("Email:", email);
    console.log("Password:", password);

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();
