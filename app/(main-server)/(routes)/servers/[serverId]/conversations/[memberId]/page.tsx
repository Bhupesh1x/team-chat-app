import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getOrCreateConversations } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";

import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";

type Props = {
  params: {
    memberId: string;
    serverId: string;
  };
};

async function MemberIdPage({ params }: Props) {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversations(
    currentMember.id,
    params.memberId
  );

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverId={params.serverId}
        type="conversation"
      />

      <ChatMessages
        apiUrl="/api/direct-messages"
        member={currentMember}
        chatId={conversation.id}
        name={otherMember.profile.name}
        paramKey="conversationId"
        paramValue={conversation.id}
        socketQuery={{
          conversationId: conversation.id,
        }}
        socketUrl="/api/socket/direct-messages"
        type="conversation"
      />

      <ChatInput
        apiUrl="/api/socket/direct-messages"
        name={otherMember.profile.name}
        type="conversation"
        query={{
          conversationId: conversation.id,
        }}
      />
    </div>
  );
}

export default MemberIdPage;
