"use client";

import React from "react";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const SettingsPage = () => {
  const user = useCurrentUser();

  const onClick = async () => {
    await logout();
  };

  return (
    <div>
      <button className={"rounded bg-white p-10"} onClick={onClick}>
        Sign Out
      </button>
    </div>
  );
};

export default SettingsPage;
