"use client";

import { useParams, useRouter } from "next/navigation";

import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";

import { ActionTooltip } from "./ActionTooltip";

type Props = {
  channel: Channel;
  server: Server;
  role?: MemberRole;
};

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

function ServerChannel({ channel, server, role }: Props) {
  const Icon = iconMap[channel.type];

  const params = useParams();
  const router = useRouter();

  return (
    <button
      className={`group px-2 py-2 rounded flex items-center gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition my-2 w-full ${
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      }`}
    >
      <Icon className="flex-shrink-0 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
      <p
        className={`text-sm line-clamp-1 text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition font-semibold ${
          params?.channelId === channel.id &&
          "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        }`}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit className="h-4 w-4 hidden group-hover:block text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash className="h-4 w-4 hidden group-hover:block text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition" />
          </ActionTooltip>
        </div>
      )}
      {channel.name === "general" && (
        <Lock className="ml-auto h-4 w-4 text-zinc-500 dark:text-zinc-400" />
      )}
    </button>
  );
}

export default ServerChannel;
