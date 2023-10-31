import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import NavigationAction from "./NavigationAction";
import NavigationItem from "./NavigationItem";
import { ToggleMode } from "../ToggleMode";
import { UserButton } from "@clerk/nextjs";

async function NavigationSidebar() {
  const profile = await currentProfile();

  if (!profile) redirect("/");

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="bg-[#E3E5E8] dark:bg-[#1E1F22] py-3 h-full flex flex-col space-y-4 items-center text-primary w-full">
      <NavigationAction />
      <Separator className="w-10 mx-auto bg-zinc-300 dark:bg-zinc-700 h-[2px] rounded-md" />
      <ScrollArea className="w-full flex-1">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              name={server.name}
              imageUrl={server.imageUrl}
              id={server.id}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="mt-auto pb-3 flex flex-col items-center gap-y-4">
        <ToggleMode />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
}

export default NavigationSidebar;
