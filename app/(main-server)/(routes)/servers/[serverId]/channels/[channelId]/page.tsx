import { redirectToSignIn } from "@clerk/nextjs";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ChatHeader from "@/components/chat/ChatHeader";

async function ChannelIdPage({
  params,
}: {
  params: { serverId: string; channelId: string };
}) {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const { serverId, channelId } = params;

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId,
      profileId: profile?.id,
    },
  });

  if (!channel || !member) return redirect("/");

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#313338]">
      <ChatHeader
        name={channel?.name}
        type="channel"
        serverId={channel?.serverId}
      />
    </div>
  );
}

export default ChannelIdPage;
