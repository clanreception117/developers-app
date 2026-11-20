"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardStage } from "../../components/DashboardStage";
import { OrganizationBusinessHub } from "../../components/organization/OrganizationBusinessHub";
import { AuthUser } from "../../types";
import { DEFAULT_DEVELOPER } from "../../lib/appState";

export default function FeedPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AuthUser>(DEFAULT_DEVELOPER);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("developers_app_user");
      if (saved) {
        setCurrentUser(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("developers_app_user");
      localStorage.removeItem("developers_app_stage");
    } catch {}
    router.push("/");
  };

  if (currentUser.role === "organization") {
    return (
      <OrganizationBusinessHub
        currentUser={currentUser}
        onSwitchUser={(u) => {
          setCurrentUser(u);
          try {
            localStorage.setItem("developers_app_user", JSON.stringify(u));
          } catch {}
        }}
        onLogout={handleLogout}
        onNavigateToLanding={() => router.push("/")}
      />
    );
  }

  return (
    <DashboardStage
      currentUser={currentUser}
      onSwitchUser={(u) => {
        setCurrentUser(u);
        try {
          localStorage.setItem("developers_app_user", JSON.stringify(u));
        } catch {}
      }}
      onLogout={handleLogout}
      onNavigateToLanding={() => router.push("/")}
    />
  );
}
