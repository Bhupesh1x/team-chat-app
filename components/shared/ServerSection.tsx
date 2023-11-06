"use client";

import { ServerWithMembersAndProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";
import { ActionTooltip } from "./ActionTooltip";
import { useModal } from "@/hooks/useModalStore";

type Props = {
  label: string;
  sectionType: "members" | "channels";
  role?: MemberRole;
  server?: ServerWithMembersAndProfiles;
  channelType?: ChannelType;
};

function ServerSection({
  label,
  sectionType,
  channelType,
  role,
  server,
}: Props) {
  const { onOpen } = useModal();
  return (
    <div className="flex items-center justify-between w-full">
      <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            onClick={() => onOpen("createChannel", { channelType })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Plus className="h-4 w-4 cursor-pointer" />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Members Settings" side="top">
          <button
            onClick={() => onOpen("members", { server })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Settings className="h-4 w-4 cursor-pointer" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
}

export default ServerSection;
