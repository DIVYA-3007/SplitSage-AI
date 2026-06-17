export default function LoadingAnimation() {
  return (
    <div className="bg-slate-900 rounded-2xl p-8 text-center animate-pulse">

      <div className="text-5xl">
        🤖
      </div>

      <h2 className="text-3xl font-bold mt-4">
        SplitSage AI
      </h2>

      <p className="text-slate-400 mt-3">
        Reading Receipt...
      </p>

      <div className="w-full bg-slate-700 rounded-full h-3 mt-6">

        <div className="bg-blue-500 h-3 rounded-full w-2/3 animate-pulse"></div>

      </div>

      <div className="mt-5 text-slate-400">

        Extracting Merchant...

        <br />

        Extracting Amount...

        <br />

        Detecting Category...

      </div>

    </div>
  );
}