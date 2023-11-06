"use client";

import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import UserAvatar from "./UserAvatar";

type Props = {
  member: Member & { profile: Profile };
  server: Server;
};

const memberRoleMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 ml-2" />,
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-2" />,
};

function ServerMember({ member, server }: Props) {
  const params = useParams();
  const router = useRouter();

  const icon = memberRoleMap[member.role];

  const onClick = () => {
    router.push(`/servers/${server?.id}/conversations/${member?.id}`);
  };

  return (
    <button
      onClick={onClick}
      className={`group px-2 py-2 rounded flex items-center gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition my-2 w-full ${
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
      }`}
    >
      <UserAvatar src={member?.profile?.imageUrl} className="h-8 w-8" />
      {icon}
      <p
        className={`text-sm line-clamp-1 text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition font-semibold ${
          params?.memberId === member.id &&
          "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        }`}
      >
        {member?.profile?.name}
      </p>
    </button>
  );
}

export default ServerMember;
