import { redirect } from "next/navigation";
import { redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { getOrCreateConversations } from "@/lib/conversation";

import ChatHeader from "@/components/chat/ChatHeader";

type Props = {
  params: {
    memberId: string;
    serverId: string;
  };
};

async function MemberIdPage({ params }: Props) {
  const user = await currentProfile();

  if (!user) return redirectToSignIn();

  const profile = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: user.id,
    },
  });

  if (!profile) return redirect("/");

  const conversation = await getOrCreateConversations(
    profile.id,
    params.memberId
  );

  if (!conversation) return redirect(`/servers/${params.serverId}`);

  const { memberOne, memberTwo } = conversation;

  const otherProfile =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] h-full flex flex-col">
      <ChatHeader
        name={otherProfile.profile.name}
        imageUrl={otherProfile.profile.imageUrl}
        serverId={params.serverId}
        type="conversation"
      />
    </div>
  );
}

export default MemberIdPage;
