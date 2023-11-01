import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await initialProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    const { name, type } = await req.json();

    if (!profile) return new NextResponse("User Unauthorized", { status: 401 });
    if (!serverId)
      return new NextResponse("Missing Server Id", { status: 400 });
    if (name === "general")
      return new NextResponse("Name cannot be general", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("channels-post", error);
    return new NextResponse(`${error}`, { status: 500 });
  }
}
