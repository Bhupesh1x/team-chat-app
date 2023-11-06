import { Hash } from "lucide-react";

import MobileToogle from "../shared/MobileToogle";

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
      <p className="font-semibold text-black dark:text-white">{name}</p>
    </div>
  );
}

export default ChatHeader;
