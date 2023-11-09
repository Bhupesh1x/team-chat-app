"use client";

import { Smile } from "lucide-react";
import { useTheme } from "next-themes";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  onChange: (value: string) => void;
};

function EmojiPicker({ onChange }: Props) {
  const { resolvedTheme } = useTheme();

  return (
    <div className="absolute top-7 left-16">
      <Popover>
        <PopoverTrigger>
          <Smile className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
        </PopoverTrigger>
        <PopoverContent
          side="left"
          className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
        >
          <Picker
            theme={resolvedTheme}
            data={data}
            onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default EmojiPicker;
