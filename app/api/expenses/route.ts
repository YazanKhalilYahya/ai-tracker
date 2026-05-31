import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const records = await prisma.record.findMany({
      where: { userId: user.id },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(
      { message: "Records fetched successfully", records },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding records:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch records",
      },
      { status: 500 },
    );
  }
}
