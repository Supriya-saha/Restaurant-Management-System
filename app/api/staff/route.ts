import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const { name, email, password, phone, outletId } = await req.json();

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

    // Create waiter user
    const user = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "waiter",
      outletId: new ObjectId(outletId),
      status: "active",
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Staff member added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Staff creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const outletId = searchParams.get("outletId");

    const client = await clientPromise;
    const db = client.db("restro");

    const staff = await db
      .collection("users")
      .find({
        outletId: new ObjectId(outletId),
        role: "waiter",
      })
      .project({ password: 0 })
      .toArray();

    return NextResponse.json(staff);
  } catch (error) {
    console.error("Staff fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}