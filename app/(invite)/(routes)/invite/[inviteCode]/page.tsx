import { redirect } from "next/navigation";
import { redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

async function InvitePage({ params }: { params: { inviteCode: string } }) {
  const profile = await initialProfile();

  if (!profile) return redirectToSignIn();
  if (!params.inviteCode) return redirect("/");

  const isExistInServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (isExistInServer) return redirect(`/servers/${isExistInServer?.id}`);

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [{ profileId: profile.id }],
      },
    },
  });

  if (server) return redirect(`/servers/${server?.id}`);

  return null;
}

export default InvitePage;
