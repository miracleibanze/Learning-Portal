import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@lib/db";
import { User } from "@lib/models/User";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role, updates } = body;
    console.log("received: ", body);
    console.log("received role of: ", typeof role);
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with your email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      updates,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Registration error:", error);
    return NextResponse.json(
      { message: "Internal Server Error, Contact +250794881466 for help." },
      { status: 500 }
    );
  }
}
