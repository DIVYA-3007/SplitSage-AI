"use client";

interface Props {
  result: any;
  setResult: any;
}

export default function ReceiptResult({
  result,
  setResult,
}: Props) {
  return (
    <div className="bg-slate-900 rounded-2xl p-8">

      <h2 className="text-3xl font-bold mb-8">
        🤖 AI Extraction
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <label>Merchant</label>

          <input
            value={result.merchant}
            onChange={(e) =>
              setResult({
                ...result,
                merchant: e.target.value,
              })
            }
            className="w-full bg-slate-800 rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label>Amount</label>

          <input
            value={result.amount}
            onChange={(e) =>
              setResult({
                ...result,
                amount: e.target.value,
              })
            }
            className="w-full bg-slate-800 rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label>Category</label>

          <input
            value={result.category}
            onChange={(e) =>
              setResult({
                ...result,
                category: e.target.value,
              })
            }
            className="w-full bg-slate-800 rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label>Date</label>

          <input
            value={result.date}
            onChange={(e) =>
              setResult({
                ...result,
                date: e.target.value,
              })
            }
            className="w-full bg-slate-800 rounded-lg p-3 mt-2"
          />
        </div>

      </div>

      <div className="mt-6">

        <label>Description</label>

        <textarea
          value={result.description}
          onChange={(e) =>
            setResult({
              ...result,
              description: e.target.value,
            })
          }
          className="w-full bg-slate-800 rounded-lg p-3 mt-2"
        />

      </div>

    </div>
  );
}