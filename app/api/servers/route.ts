import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("user unauthorized", { status: 401 });

    const { name, imageUrl } = await req.json();

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ profileId: profile.id, name: "general" }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("create-servers-error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
