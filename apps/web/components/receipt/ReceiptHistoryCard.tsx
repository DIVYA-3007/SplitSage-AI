"use client";

interface ReceiptProps {
  receipt: any;
}

export default function ReceiptHistoryCard({
  receipt,
}: ReceiptProps) {
  function badgeColor(category: string) {
    switch (category) {
      case "Food":
        return "bg-green-600";

      case "Travel":
        return "bg-blue-600";

      case "Shopping":
        return "bg-orange-500";

      case "Fashion":
        return "bg-pink-600";

      case "Medical":
        return "bg-red-600";

      case "Groceries":
        return "bg-yellow-500";

      default:
        return "bg-slate-600";
    }
  }

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-blue-500 transition">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-2xl font-bold text-white">

          🧾 Receipt

        </h2>

        <span
          className={`${badgeColor(
            receipt.category
          )} px-4 py-1 rounded-full text-sm font-bold`}
        >
          {receipt.category}
        </span>

      </div>

      <div className="space-y-4">

        <div>

          <p className="text-slate-400">
            Merchant
          </p>

          <p className="text-xl font-semibold">
            {receipt.merchant}
          </p>

        </div>

        <div>

          <p className="text-slate-400">
            Description
          </p>

          <p>
            {receipt.description}
          </p>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>

            <p className="text-slate-400">
              Amount
            </p>

            <p className="text-green-400 text-xl font-bold">
              ₹{receipt.amount}
            </p>

          </div>

          <div>

            <p className="text-slate-400">
              Confidence
            </p>

            <p className="text-blue-400 text-xl font-bold">
              {receipt.confidence}%
            </p>

          </div>

        </div>

        <div>

          <p className="text-slate-400">
            Uploaded
          </p>

          <p>
            {new Date(
              receipt.createdAt
            ).toLocaleDateString()}
          </p>

        </div>

      </div>

    </div>
  );
}