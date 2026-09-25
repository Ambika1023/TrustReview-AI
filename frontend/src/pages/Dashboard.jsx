import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {

  const history = JSON.parse(
    localStorage.getItem("reviewHistory")
  ) || [];

  const fakeCount = history.filter(
    item => item.prediction === "Fake Review"
  ).length;

  const genuineCount = history.filter(
    item => item.prediction === "Genuine Review"
  ).length;

  const averageFraud =
    history.length > 0
      ? (
          history.reduce(
            (acc, item) =>
              acc + item.fraud_probability,
            0
          ) / history.length
        ).toFixed(2)
      : 0;

  const chartData = {
    labels: [
      "Fake Reviews",
      "Genuine Reviews"
    ],
    datasets: [
      {
        data: [
          fakeCount,
          genuineCount
        ],
        backgroundColor: [
          "#ef4444",
          "#22c55e"
        ],
        borderWidth: 0
      }
    ]
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white p-10">

      <h1 className="text-5xl font-bold text-cyan-400 mb-10 text-center">
        Analytics Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">

          <p className="text-slate-400">
            Total Reviews
          </p>

          <h2 className="text-4xl font-bold mt-3 text-cyan-400">
            {history.length}
          </h2>

        </div>

        <div className="bg-red-600/20 border border-red-500 p-6 rounded-2xl">

          <p className="text-red-300">
            Fake Reviews
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {fakeCount}
          </h2>

        </div>

        <div className="bg-green-600/20 border border-green-500 p-6 rounded-2xl">

          <p className="text-green-300">
            Genuine Reviews
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {genuineCount}
          </h2>

        </div>

        <div className="bg-blue-600/20 border border-blue-500 p-6 rounded-2xl">

          <p className="text-blue-300">
            Avg Fraud Score
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {averageFraud}%
          </h2>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-10">

        <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-8 rounded-3xl">

          <h2 className="text-3xl font-bold mb-8 text-cyan-400 text-center">
            Review Distribution
          </h2>

          <div className="max-w-sm mx-auto">
            <Pie data={chartData} />
          </div>

        </div>

        <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-8 rounded-3xl">

          <h2 className="text-3xl font-bold mb-8 text-cyan-400">
            Recent Insights
          </h2>

          <div className="space-y-5">

            <div className="bg-red-500/10 border border-red-500 p-5 rounded-2xl">

              <p className="text-red-300 font-semibold">
                Fake Review Detection
              </p>

              <p className="mt-2 text-slate-300">
                The system detected {fakeCount} suspicious reviews.
              </p>

            </div>

            <div className="bg-green-500/10 border border-green-500 p-5 rounded-2xl">

              <p className="text-green-300 font-semibold">
                Genuine Review Analysis
              </p>

              <p className="mt-2 text-slate-300">
                {genuineCount} reviews appear authentic.
              </p>

            </div>

            <div className="bg-cyan-500/10 border border-cyan-500 p-5 rounded-2xl">

              <p className="text-cyan-300 font-semibold">
                AI Monitoring Status
              </p>

              <p className="mt-2 text-slate-300">
                Real-time fraud detection system is active.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;