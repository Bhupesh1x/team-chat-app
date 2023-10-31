"use client";

import { useParams, useRouter } from "next/navigation";

import { ActionTooltip } from "../shared/ActionTooltip";
import Image from "next/image";

type Props = {
  name: string;
  imageUrl: string;
  id: string;
};

function NavigationItem({ name, imageUrl, id }: Props) {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button onClick={onClick} className="relative flex items-center group">
        <div
          className={`abosolute left-0 bg-primary rounded-r-full transition-all w-[4px] ${
            id !== params.serverId ? "group-hover:h-[20px] h-[8px]" : "h-[36px]"
          }`}
        />

        <div
          className={`relative group flex mx-3 h-[48px] w-[48px] group-hover:rounded-[16px] rounded-[24px] transition-all overflow-hidden ${
            params?.serverId === id &&
            "bg-primary/10 text-primary !rounded-[16px]"
          }`}
        >
          <Image fill src={imageUrl} alt="Channel" />
        </div>
      </button>
    </ActionTooltip>
  );
}

export default NavigationItem;
