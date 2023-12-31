import { Hash } from "lucide-react";

import UserAvatar from "../shared/UserAvatar";
import MobileToogle from "../shared/MobileToogle";
import SocketIndicator from "../shared/SocketIndicator";

type Props = {
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
  serverId: string;
};

function ChatHeader({ name, serverId, type, imageUrl }: Props) {
  return (
    <div className="px-3 h-12 border-b border-neutral-200 dark:border-neutral-800 text-md font-semibold flex items-center">
      <MobileToogle serverId={serverId} />
      {type === "channel" && (
        <Hash className="h-5 w-5 text-zinc-500 dark:text-zinc-400 mx-2" />
      )}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="h-8 w-8 md:h-8 md:w-8 mr-2" />
      )}
      <p className="font-semibold text-black dark:text-white">{name}</p>
      <div className="ml-auto flex items-center">
        <SocketIndicator />
      </div>
    </div>
  );
}

export default ChatHeader;
