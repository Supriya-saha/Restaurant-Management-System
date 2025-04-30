export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { outletName, email, password, address, phone } = await req.json();

    const client = await clientPromise;
    const db = client.db("restro");

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create outlet
    const outlet = await db.collection("outlets").insertOne({
      name: outletName,
      address,
      phone,
      createdAt: new Date(),
    });

    // Create admin user
    const user = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      role: "admin",
      outletId: outlet.insertedId,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Registration successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}