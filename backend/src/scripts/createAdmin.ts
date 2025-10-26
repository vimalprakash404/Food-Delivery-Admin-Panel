import dotenv from "dotenv";
import { connectDB } from "../config/db";
import { User } from "../models/user";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const name = process.env.ADMIN_NAME || "Admin";
    const email = process.env.ADMIN_EMAIL || "admin@example.com";
    const mobile = process.env.ADMIN_MOBILE || "1234567890";
    const password = process.env.ADMIN_PASSWORD || "admin123";

    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      console.log(
        "❌ Admin user already exists with this email or mobile number."
      );
      process.exit(1);
    }

    const adminUser = new User({
      name,
      email,
      mobile,
      password,
      role: "admin",
    });

    await adminUser.save();

    console.log("✅ Admin user created successfully!");
    console.log("Email:", email);
    console.log("Password:", password);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  }
};

createAdmin();
