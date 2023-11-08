import { redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";

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
      <div className="flex-1">
        <p>Future Messages</p>
      </div>
      <ChatInput
        apiUrl="/api/socket/messages"
        name={channel.name}
        query={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
        type="channel"
      />
    </div>
  );
}

export default ChannelIdPage;
