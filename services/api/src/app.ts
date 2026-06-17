import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import groupRoutes from "./routes/group.routes";
import expenseRoutes from "./routes/expense.routes";
import settlementRoutes from "./routes/settlement.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import activityRoutes from "./routes/activity.routes";
import aiRoutes from "./routes/ai.routes";
import chatRoutes from "./routes/chat.routes";
import receiptRoutes from "./routes/receipt.routes";
import insightRoutes from "./routes/insight.routes";
import dashboardAnalyticsRoutes from "./routes/dashboardAnalytics.routes";
import exportRoutes from "./routes/export.routes";
import settlementAIRoutes from "./routes/settlementAI.routes";
import profileRoutes from "./routes/profile.routes";
import notificationRoutes from "./routes/notification.routes";
import receiptHistoryRoutes from "./routes/receiptHistory.routes";
import forecastRoutes from "./routes/forecast.routes";
import budgetRoutes from "./routes/budget.routes";
import subscriptionRoutes from "./routes/subscription.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    project: "SplitSage AI",
    status: "running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/groups", groupRoutes);

app.use("/api/expenses", expenseRoutes);

app.use("/api/settlements", settlementRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/activity", activityRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/receipt", receiptRoutes);

app.use("/api/insight", insightRoutes);

app.use(
  "/api/dashboard/analytics",
  dashboardAnalyticsRoutes
);

app.use(
  "/api/export",
  exportRoutes
);

app.use(
  "/api/settlement-ai",
  settlementAIRoutes
);

app.use(
  "/api/profile",
  profileRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);

app.use(
  "/api/receipt-history",
  receiptHistoryRoutes
);

app.use(
  "/api/forecast",
  forecastRoutes
);

app.use(
  "/api/budget",
  budgetRoutes
);
app.use(
  "/api/subscriptions",
  subscriptionRoutes
);

export default app;