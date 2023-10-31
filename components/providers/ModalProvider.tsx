"use client";

import { useEffect, useState } from "react";

import InviteModal from "../modals/InviteModal";
import CreateServerModal from "../modals/CreateServerModal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <InviteModal />
    </>
  );
}
