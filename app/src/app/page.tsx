"use client";

import React, { useState, useEffect } from "react";
import { AuthUser, UserRole } from "../types";
import { DEFAULT_DEVELOPER } from "../lib/appState";
import { LandingStage } from "../components/LandingStage";
import { WelcomeStage } from "../components/WelcomeStage";
import { DashboardStage } from "../components/DashboardStage";
import { OrganizationBusinessHub } from "../components/organization/OrganizationBusinessHub";
import { TransitionScreen } from "../components/TransitionScreen";

export type AppStage = "landing" | "account-selection" | "dashboard";

export default function Home() {
  // Visitor starts on the animated landing page (Section 2 & 3)
  const [stage, setStage] = useState<AppStage>("landing");
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [targetStage, setTargetStage] = useState<AppStage>("dashboard");
  const [initialized, setInitialized] = useState(false);

  // URL query parameter check & LocalStorage restore
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlStage = params.get("stage") as AppStage | null;

      const savedUser = localStorage.getItem("developers_app_user");
      const savedStage = localStorage.getItem("developers_app_stage") as AppStage | null;

      if (urlStage && (urlStage === "landing" || urlStage === "account-selection" || urlStage === "dashboard")) {
        setStage(urlStage);
      } else if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setCurrentUser(parsed);
        if (savedStage === "dashboard") {
          // Returning authenticated user can go to feed
          setStage("dashboard");
        } else {
          setStage("landing");
        }
      } else {
        // First-time visitor: strictly starts on the animated landing page
        setStage("landing");
      }
    } catch {
      setStage("landing");
    } finally {
      setInitialized(true);
    }
  }, []);

  // Save state on authentication
  const handleAuthenticated = (user: AuthUser, destination: "landing" | "dashboard" = "dashboard") => {
    setCurrentUser(user);
    try {
      localStorage.setItem("developers_app_user", JSON.stringify(user));
    } catch {}

    if (destination === "dashboard") {
      setTargetStage("dashboard");
      setIsTransitioning(true);
    } else {
      setStage("landing");
      try {
        localStorage.setItem("developers_app_stage", "landing");
      } catch {}
    }
  };

  const handleNavigateToDashboard = () => {
    setTargetStage("dashboard");
    setIsTransitioning(true);
  };

  const handleNavigateToAccountSelection = () => {
    setStage("account-selection");
    try {
      localStorage.setItem("developers_app_stage", "account-selection");
    } catch {}
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToLanding = () => {
    setStage("landing");
    try {
      localStorage.setItem("developers_app_stage", "landing");
    } catch {}
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem("developers_app_user");
      localStorage.removeItem("developers_app_stage");
    } catch {}
    setStage("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
    setStage(targetStage);
    try {
      localStorage.setItem("developers_app_stage", targetStage);
    } catch {}
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  // Active Transition Overlay ("Making a Leap from Ordinary to Dev...")
  if (isTransitioning) {
    return <TransitionScreen onComplete={handleTransitionComplete} />;
  }

  // PAGE ONE: CINEMATIC ANIMATED LANDING PAGE (Reference Image 1: Nucleus)
  if (stage === "landing") {
    return (
      <LandingStage
        currentUser={currentUser}
        onNavigateToDashboard={() => {
          if (!currentUser) {
            handleNavigateToAccountSelection();
          } else {
            handleNavigateToDashboard();
          }
        }}
        onNavigateToAccountSelection={handleNavigateToAccountSelection}
      />
    );
  }

  // PAGE TWO: ACCOUNT SELECTION & AUTHENTICATION (Reference Image 2: Promethist)
  if (stage === "account-selection") {
    return (
      <WelcomeStage
        onAuthenticated={handleAuthenticated}
        onExploreAsGuest={handleNavigateToLanding}
        onBackToLanding={handleNavigateToLanding}
      />
    );
  }

  // PAGE THREE: MAIN DASHBOARD / WORKSPACE
  // Strict role routing: Organization gets OrganizationBusinessHub, Developer gets DashboardStage
  if (currentUser?.role === "organization") {
    return (
      <OrganizationBusinessHub
        currentUser={currentUser}
        onSwitchUser={(newUser) => {
          setCurrentUser(newUser);
          try {
            localStorage.setItem("developers_app_user", JSON.stringify(newUser));
          } catch {}
        }}
        onLogout={handleLogout}
        onNavigateToLanding={handleNavigateToLanding}
      />
    );
  }

  return (
    <DashboardStage
      currentUser={currentUser || DEFAULT_DEVELOPER}
      onSwitchUser={(newUser) => {
        setCurrentUser(newUser);
        try {
          localStorage.setItem("developers_app_user", JSON.stringify(newUser));
        } catch {}
      }}
      onLogout={handleLogout}
      onNavigateToLanding={handleNavigateToLanding}
    />
  );
}
