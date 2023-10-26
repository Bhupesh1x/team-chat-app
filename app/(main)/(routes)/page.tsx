import { UserButton } from "@clerk/nextjs";

import { ToggleMode } from "@/components/ToggleMode";

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <ToggleMode />
    </div>
  );
}
