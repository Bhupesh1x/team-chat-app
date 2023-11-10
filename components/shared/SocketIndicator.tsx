"use client";

import { useSocket } from "../providers/SocketProvider";
import { Badge } from "../ui/badge";

function SocketIndicator() {
  const { isConnected } = useSocket();

  if (!isConnected) {
    <Badge variant="outline" className="bg-yellow-600 text-white border-none">
      Fallback: Polling every 5s
    </Badge>;
  }

  return (
    <Badge variant="outline" className="bg-emerald-600 text-white border-none">
      Live: Real-time updates
    </Badge>
  );
}

export default SocketIndicator;
