import { redirect } from "next/navigation";

import { UserButton } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

import { ToggleMode } from "@/components/ToggleMode";

export default async function Home() {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) return redirect(`/servers/${server.id}`);

  return (
    <div>
      <h1>Create a server</h1>
    </div>
  );
}
