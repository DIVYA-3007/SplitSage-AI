"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import api from "@/lib/api";

interface AnalyticsContextType {
  analytics: any;
  loading: boolean;
  refreshAnalytics: () => Promise<void>;
}

const AnalyticsContext =
  createContext<AnalyticsContextType>({
    analytics: null,
    loading: true,
    refreshAnalytics: async () => {},
  });

export function AnalyticsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [analytics, setAnalytics] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  async function refreshAnalytics() {
    try {
      setLoading(true);

      const response =
        await api.get(
          "/dashboard/analytics"
        );

      setAnalytics(response.data);
    } catch (error) {
      console.error(
        "Failed to load analytics:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshAnalytics();
  }, []);

  return (
    <AnalyticsContext.Provider
      value={{
        analytics,
        loading,
        refreshAnalytics,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext() {
  const context =
    useContext(AnalyticsContext);

  if (!context) {
    throw new Error(
      "useAnalyticsContext must be used inside AnalyticsProvider"
    );
  }

  return context;
}