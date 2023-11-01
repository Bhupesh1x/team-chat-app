"use client";

import { useEffect, useState } from "react";

import InviteModal from "../modals/InviteModal";
import MembersModel from "../modals/MembersModal";
import EditServerModel from "../modals/EditServerModal";
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
      <EditServerModel />
      <MembersModel />
    </>
  );
}
