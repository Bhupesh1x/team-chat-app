"use client";

import Image from "next/image";
import { useState } from "react";

import { Member, MemberRole, Profile } from "@prisma/client";
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from "lucide-react";

import UserAvatar from "../shared/UserAvatar";
import { ActionTooltip } from "../shared/ActionTooltip";

type Props = {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  isUpdated: boolean;
  currentMember: Member;
  socketUrl: string;
  socketQuery: Record<string, string>;
};

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 text-indigo-500 cursor-pointer" />,
  ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500 cursor-pointer" />,
};

function ChatItem({
  id,
  content,
  currentMember,
  deleted,
  fileUrl,
  isUpdated,
  member,
  socketQuery,
  socketUrl,
  timestamp,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileType = fileUrl?.split(".").pop();
  const isAdmin = currentMember?.role === MemberRole.ADMIN;
  const isModerator = currentMember?.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessgae = !deleted && isOwner && !fileUrl;
  const isPdf = fileType === "pdf" && fileUrl;
  const isImage = fileUrl && !isPdf;

  return (
    <div className="relative group flex items-center w-full p-4 transition bg-black/5">
      <div className="group flex items-start w-full gap-x-2">
        <div className="cursor-pointer transition hover:drop-shadow-md">
          <UserAvatar src={member.profile.imageUrl} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-2">
              <div className="font-semibold text-sm hover:underline cursor-pointer">
                {member.profile.name}
              </div>
              <ActionTooltip label={member.role}>
                {roleIconMap[member.role]}
              </ActionTooltip>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timestamp}
            </span>
          </div>
          {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md mt-2 bg-secondary border flex items-center overflow-hidden h-48 w-48"
            >
              <Image
                src={fileUrl}
                alt={content}
                fill
                className="object-cover"
              />
            </a>
          )}
          {isPdf && (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
              <FileIcon className="fill-indigo-200 stroke-indigo-400 h-10 w-10" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                PDF File
              </a>
            </div>
          )}
          {!fileUrl && !isEditing && (
            <p
              className={`text-sm text-zinc-600 dark:text-zinc-300 ${
                deleted &&
                "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
              }`}
            >
              {content}
              {isUpdated && !deleted && (
                <span className="text-zinc-500 dark:text-zinc-400 mx-2 text-[10px]">
                  (edited)
                </span>
              )}
            </p>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 border rounded-sm dark:bg-zinc-800">
          {canEditMessgae && (
            <ActionTooltip label="Edit">
              <Edit
                onClick={() => setIsEditing(true)}
                className="cursor-pointer h-4 w-4 ml-auto text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
              />
            </ActionTooltip>
          )}
          <ActionTooltip label="Delete">
            <Trash className="cursor-pointer h-4 w-4 ml-auto text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
          </ActionTooltip>
        </div>
      )}
    </div>
  );
}

export default ChatItem;
