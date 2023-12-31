"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useModal } from "@/hooks/useModalStore";
import { Plus, SendHorizonalIcon, Smile } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import EmojiPicker from "../shared/EmojiPicker";
import { useRouter } from "next/navigation";

type Props = {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
};

const formSchema = z.object({
  content: z.string().min(1),
});

function ChatInput({ apiUrl, name, query, type }: Props) {
  const { onOpen } = useModal();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });

      await axios.post(url, value);
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative pb-6 p-4">
                  <button
                    onClick={() => onOpen("messageFile", { apiUrl, query })}
                    type="button"
                    className="absolute p-1 top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 flex items-center justify-center rounded-full transition"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>

                  <EmojiPicker
                    onChange={(emoji: string) =>
                      field.onChange(`${field.value} ${emoji}`)
                    }
                  />

                  <Input
                    disabled={isSubmitting}
                    className="px-20 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder={`Message ${
                      type === "conversation" ? name : `#${name}`
                    }`}
                    {...field}
                  />
                  <button
                    disabled={isSubmitting || !isValid}
                    type="submit"
                    className="absolute top-7 right-8"
                  >
                    <SendHorizonalIcon
                      className={`text-white ${
                        (isSubmitting || !isValid) &&
                        "text-zinc-400 cursor-not-allowed"
                      }`}
                    />
                  </button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default ChatInput;
