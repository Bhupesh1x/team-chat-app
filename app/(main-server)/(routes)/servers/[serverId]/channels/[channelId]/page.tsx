import { redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";

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
      <ChatMessages
        apiUrl="/api/messages"
        chatId={channel.id}
        member={member}
        name={channel.name}
        paramKey="channelId"
        paramValue={channel.id}
        socketQuery={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
        socketUrl="/api/socket/messages"
        type="channel"
      />
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
