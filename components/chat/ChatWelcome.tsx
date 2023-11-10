import { Hash } from "lucide-react";

type Props = {
  type: "channel" | "conversation";
  name: string;
};

function ChatWelcome({ type, name }: Props) {
  return (
    <div className="space-y-2 px-4">
      {type === "channel" && (
        <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          <Hash className="text-white h-12 w-12" />
        </div>
      )}
      <p className="text-xl md:text-3xl font-semibold">
        {type === "channel" ? `Welcome to the #${name}` : name}
      </p>
      <p>
        {type === "channel"
          ? `This is the start of the #${name} channel.`
          : `This is the start of your conversation with ${name}.`}
      </p>
    </div>
  );
}

export default ChatWelcome;
