"use client";

interface Props {
  totalExpense: number;
  totalGroups: number;
  totalReceipts: number;
  totalChats: number;
  totalNotifications: number;
}

export default function AnalyticsCards({
  totalExpense,
  totalGroups,
  totalReceipts,
  totalChats,
  totalNotifications,
}: Props) {
  const cards = [
    {
      title: "Total Expense",
      value: `₹${totalExpense}`,
      icon: "💰",
    },
    {
      title: "Groups",
      value: totalGroups,
      icon: "👥",
    },
    {
      title: "Receipts",
      value: totalReceipts,
      icon: "🧾",
    },
    {
      title: "AI Chats",
      value: totalChats,
      icon: "🤖",
    },
    {
      title: "Notifications",
      value: totalNotifications,
      icon: "🔔",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition"
        >
          <div className="text-4xl mb-4">
            {card.icon}
          </div>

          <h3 className="text-slate-400">
            {card.title}
          </h3>

          <p className="text-3xl font-bold mt-2">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}