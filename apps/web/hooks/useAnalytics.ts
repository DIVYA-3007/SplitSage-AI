"use client";

import { useAnalyticsContext } from "@/context/AnalyticsContext";

export default function useAnalytics() {
  return useAnalyticsContext();
}