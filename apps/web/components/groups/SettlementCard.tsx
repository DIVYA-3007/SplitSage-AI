"use client";

interface Settlement {
  from: string;
  to: string;
  amount: number;
}

interface Props {
  settlements: Settlement[];
}

export default function SettlementCard({
  settlements,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

      <h2 className="text-3xl font-bold mb-8">
        🤝 Suggested Settlements
      </h2>

      {settlements.length === 0 ? (

        <div className="text-center py-10">

          <div className="text-6xl">
            🎉
          </div>

          <p className="text-slate-400 mt-4">
            Everyone is settled up.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {settlements.map(
            (item, index) => (

              <div
                key={index}
                className="bg-slate-800 rounded-2xl p-5 flex justify-between items-center"
              >

                <div>

                  <h3 className="text-xl font-semibold">

                    {item.from}

                    <span className="mx-3 text-blue-400">
                      →
                    </span>

                    {item.to}

                  </h3>

                </div>

                <div className="text-green-400 text-2xl font-bold">

                  ₹{item.amount.toFixed(2)}

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}