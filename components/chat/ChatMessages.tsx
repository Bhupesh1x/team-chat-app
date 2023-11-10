"use client";

import { Member, Message, Profile } from "@prisma/client";
import { useChatQuery } from "@/hooks/useChatQuery";
import { Loader2, ServerCrash } from "lucide-react";

import ChatWelcome from "./ChatWelcome";
import { Fragment } from "react";

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

type Props = {
  apiUrl: string;
  type: "channel" | "conversation";
  name: string;
  member: Member;
  chatId: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
};

function ChatMessages({
  apiUrl,
  chatId,
  member,
  name,
  paramKey,
  socketQuery,
  socketUrl,
  type,
  paramValue,
}: Props) {
  const queryKey = `chat:${chatId}`;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      apiUrl,
      paramKey,
      paramValue,
      queryKey,
    });

  if (status === "loading") {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <Loader2 className="text-zinc-500 animate-spin h-7 w-7" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <ServerCrash className="text-zinc-500 h-7 w-7" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex-1" />
      <ChatWelcome type={type} name={name} />
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group?.items?.map((message: MessageWithMemberWithProfile) => (
              <div key={message.id}>{message.content}</div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ChatMessages;
