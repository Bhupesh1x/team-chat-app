import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await initialProfile();
    const { name, imageUrl } = await req.json();

    if (!profile) return new NextResponse("User unauthorized", { status: 401 });

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server);
  } catch (error: any) {
    console.log("server-id-patch", error);
    return new NextResponse(error, { status: 500 });
  }
}
