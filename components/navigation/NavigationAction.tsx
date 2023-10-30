"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "../shared/ActionTooltip";

function NavigationAction() {
  return (
    <ActionTooltip side="right" align="start" label="Add a server">
      <button className="group flex items-center">
        <div className="h-[48px] w-[48px] rounded-[24px] bg-background group-hover:bg-emerald-500 group-hover:rounded-[16px] dark:bg-neutral-700 overflow-hidden flex items-center justify-center transition-all">
          <Plus
            className="group-hover:text-white transition text-emerald-500"
            size={25}
          />
        </div>
      </button>
    </ActionTooltip>
  );
}

export default NavigationAction;
