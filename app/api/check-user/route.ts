import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { clerckUserId: user.id },
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          clerckUserId: user.id,
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          email: user.emailAddresses[0]?.emailAddress ?? "",
          imageUrl: user.imageUrl,
        },
      });

      return NextResponse.json({
        message: "User created successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          imageUrl: newUser.imageUrl,
          createdAt: newUser.createdAt,
        },
      });
    }

    return NextResponse.json({
      message: "User already exists",
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        imageUrl: existingUser.imageUrl,
        createdAt: existingUser.createdAt,
      },
    });
  } catch (error) {
    console.error("check-user route error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
