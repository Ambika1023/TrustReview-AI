function History() {

  const history = JSON.parse(
    localStorage.getItem("reviewHistory")
  ) || [];

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white p-10">

      <h1 className="text-5xl font-bold text-cyan-400 mb-10 text-center">
        Review History
      </h1>

      {history.length === 0 ? (

        <div className="text-center mt-20">

          <p className="text-2xl text-slate-400">
            No review history found.
          </p>

        </div>

      ) : (

        <div className="grid gap-6">

          {history
            .slice()
            .reverse()
            .map((item, index) => (

              <div
                key={index}
                className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-3xl shadow-xl"
              >

                <div className="flex justify-between items-start mb-5">

                  <div>

                    <h2
                      className={`text-2xl font-bold ${
                        item.prediction === "Fake Review"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {item.prediction}
                    </h2>

                    <p className="text-slate-400 mt-2">
                      Fraud Probability:
                      {" "}
                      {item.fraud_probability}%
                    </p>

                  </div>

                  <div
                    className={`px-4 py-2 rounded-xl font-semibold ${
                      item.prediction === "Fake Review"
                        ? "bg-red-500/20 text-red-300"
                        : "bg-green-500/20 text-green-300"
                    }`}
                  >
                    {100 - item.fraud_probability}%
                    {" "}
                    Authentic
                  </div>

                </div>

                <div className="bg-black/20 p-5 rounded-2xl border border-white/5">

                  <p className="text-slate-300 leading-relaxed">
                    {item.review}
                  </p>

                </div>

                {item.reasons &&
                  item.reasons.length > 0 && (

                  <div className="mt-5">

                    <h3 className="text-pink-400 font-semibold mb-3">
                      Detection Reasons
                    </h3>

                    <div className="space-y-3">

                      {item.reasons.map(
                        (reason, idx) => (

                          <div
                            key={idx}
                            className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl text-sm"
                          >
                            {reason}
                          </div>

                        )
                      )}

                    </div>

                  </div>

                )}

              </div>

            ))}

        </div>

      )}

    </div>
  );
}

export default History;