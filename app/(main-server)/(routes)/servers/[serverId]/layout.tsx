import ServerSidebar from "@/components/shared/ServerSidebar";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

async function ServerIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) {
  const profile = await initialProfile();

  if (!profile) return redirect("/");

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) return redirect("/");
  return (
    <div className="h-full">
      <div className="hidden md:flex w-60 fixed h-full inset-y-0 flex-col z-20">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}

export default ServerIdLayout;
