import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await initialProfile();

    if (!profile) return new NextResponse("User Unauthorized", { status: 401 });
    if (!params.serverId)
      return new NextResponse("Missing serverid", { status: 401 });

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("server-id-patch", error);
    return new NextResponse(`${error}`, { status: 500 });
  }
}
