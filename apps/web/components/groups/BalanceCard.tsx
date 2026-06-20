"use client";

interface Balance {
  userId: string;
  name: string;
  balance: number;
}

interface Props {
  balances: Balance[];
}

export default function BalanceCard({
  balances,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

      <h2 className="text-3xl font-bold mb-8">
        💰 Group Balances
      </h2>

      <div className="space-y-4">

        {balances.map((user) => (

          <div
            key={user.userId}
            className="flex justify-between items-center bg-slate-800 rounded-2xl p-5"
          >

            <div>

              <h3 className="text-xl font-semibold">
                {user.name}
              </h3>

              <p className="text-slate-400">

                {user.balance >= 0
                  ? "Should Receive"
                  : "Owes"}

              </p>

            </div>

            <div
              className={`text-2xl font-bold ${
                user.balance >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >

              {user.balance >= 0 ? "+" : "-"}

              ₹
              {Math.abs(
                user.balance
              ).toFixed(2)}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}