import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const email = user.emailAddresses[0]?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 },
      );
    }

    const { description, date, category, amount, currency } =
      await request.json();

    if (
      !description ||
      !date ||
      !category ||
      amount === undefined ||
      !currency
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await prisma.user.upsert({
      where: {
        clerckUserId: user.id,
      },
      update: {
        email,
        name: user.fullName || user.firstName || "User",
        imageUrl: user.imageUrl || null,
        currency,
      },
      create: {
        clerckUserId: user.id,
        email,
        name: user.fullName || user.firstName || "User",
        imageUrl: user.imageUrl || null,
        currency,
      },
    });

    const record = await prisma.record.create({
      data: {
        text: description,
        date: new Date(date),
        category,
        amount: parseFloat(amount),
        userId: user.id,
      },
    });

    return NextResponse.json(
      { message: "Expense added successfully", record },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding expense:", error);

    return NextResponse.json(
      {
        error: "Failed to add expense",
      },
      { status: 500 },
    );
  }
}
/*import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { description, date, category, amount, currency } = await request.json();

    // create new record

    const record = await prisma.record.create({
      data: {
        text: description,
        date: new Date(date),
        category,
        amount: parseFloat(amount),
        userId: user.id,
      },
    });

    return NextResponse.json(
      { message: "Expense added successfully", record },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding expense:", error);
    return NextResponse.json(
      {
        error: "Failed to add expense",
      },
      { status: 500 },
    );
  }
}
*/
