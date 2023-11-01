"use client";

import { MemberRole } from "@prisma/client";
import { ServerWithMembersAndProfiles } from "@/types";

import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useModal } from "@/hooks/useModalStore";

type Props = {
  server: ServerWithMembersAndProfiles;
  role?: MemberRole;
};

function ServerHeader({ server, role }: Props) {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:outline-none">
        <button className="w-full flex items-center justify-between transition text-md font-semibold px-3 h-12 border-neutral-200 border-b-2 dark:border-neutral-800 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
          {server.name}
          <ChevronDown className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { server })}
            className="w-full px-3 py-2 text-indigo-600 dark:text-indigo-400 text-sm cursor-pointer"
          >
            Invite People
            <UserPlus className="h-5 w-5 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <>
            <DropdownMenuItem
              onClick={() => onOpen("editServer", { server })}
              className="w-full px-3 py-2 text-sm cursor-pointer"
            >
              Server Settings
              <Settings className="h-5 w-5 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onOpen("members", { server })}
              className="w-full px-3 py-2 text-sm cursor-pointer"
            >
              Members Settings
              <Users className="h-5 w-5 ml-auto" />
            </DropdownMenuItem>
          </>
        )}
        {isModerator && (
          <>
            <DropdownMenuItem
              onClick={() => onOpen("createChannel")}
              className="w-full px-3 py-2 text-sm cursor-pointer"
            >
              Create Channels
              <PlusCircle className="h-5 w-5 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        {isAdmin ? (
          <DropdownMenuItem className="text-rose-500 w-full px-3 py-2 text-sm cursor-pointer">
            Delete Server
            <Trash className="h-5 w-5 ml-auto" />
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="text-rose-500 w-full px-3 py-2 text-sm cursor-pointer">
            Leave Server
            <LogOut className="h-5 w-5 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ServerHeader;
