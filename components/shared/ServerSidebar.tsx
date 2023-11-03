import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

import { redirect } from "next/navigation";
import { ChannelType, MemberRole } from "@prisma/client";

import ServerHeader from "./ServerHeader";
import ServerSearch from "./ServerSearch";
import { ScrollArea } from "../ui/scroll-area";
import { Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

type Props = {
  serverId: string;
};

const channelIconMap = {
  [ChannelType.TEXT]: null,
  [ChannelType.AUDIO]: <Mic className="h-4 w-4 mr-2" />,
  [ChannelType.VIDEO]: <Video className="h-4 w-4 mr-2" />,
};

const memberIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 text-indigo-500 mr-2" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 text-rose-500 mr-2" />,
};

async function ServerSidebar({ serverId }: Props) {
  const profile = await initialProfile();

  if (!profile) return redirect("/");

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannels = server?.channels?.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels?.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels?.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const members = server?.members?.filter(
    (member) => member.profileId !== profile.id
  );

  if (!server) return redirect("/");

  const role = server?.members?.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />

      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelIconMap[channel.type],
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelIconMap[channel.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelIconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member?.profile?.name,
                  icon: memberIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
      </ScrollArea>
    </div>
  );
}

export default ServerSidebar;
