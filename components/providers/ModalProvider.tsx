"use client";

import { useEffect, useState } from "react";

import InviteModal from "../modals/InviteModal";
import MembersModel from "../modals/MembersModal";
import EditServerModel from "../modals/EditServerModal";
import LeaveServerModal from "../modals/LeaveServerModal";
import EditChannelModal from "../modals/EditChannelModal";
import MessageFileModal from "../modals/MessageFileModal";
import DeleteServerModal from "../modals/DeleteServerModal";
import CreateServerModal from "../modals/CreateServerModal";
import CreateChannelModal from "../modals/CreateChannelModal";
import DeleteChannelModal from "../modals/DeleteChannelModal";

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
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
    </>
  );
}
