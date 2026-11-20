"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { WelcomeStage } from "../../../components/WelcomeStage";
import { TransitionScreen } from "../../../components/TransitionScreen";
import { AuthUser } from "../../../types";

export default function OrganizationSignupPage() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAuthenticated = (user: AuthUser) => {
    try {
      localStorage.setItem("developers_app_user", JSON.stringify(user));
      localStorage.setItem("developers_app_stage", "dashboard");
    } catch {}
    setIsTransitioning(true);
  };

  if (isTransitioning) {
    return <TransitionScreen onComplete={() => router.push("/feed")} />;
  }

  return (
    <WelcomeStage
      initialRole="organization"
      initialView="signup"
      onAuthenticated={handleAuthenticated}
      onBackToLanding={() => router.push("/account-selection")}
      onExploreAsGuest={() => router.push("/")}
    />
  );
}
