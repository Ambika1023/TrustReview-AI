import { useState, useEffect } from "react";
import axios from "axios";

function Analyzer() {

  const [review, setReview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const savedHistory = localStorage.getItem(
      "reviewHistory"
    );

    if (savedHistory) {
      JSON.parse(savedHistory);
    }

  }, []);

  const analyzeReview = async () => {

    if (!review) {
      alert("Please enter a review");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        {
          review: review
        }
      );

      setResult(response.data);

      const oldHistory = JSON.parse(
        localStorage.getItem("reviewHistory")
      ) || [];

      const updatedHistory = [
        ...oldHistory,
        response.data
      ];

      localStorage.setItem(
        "reviewHistory",
        JSON.stringify(updatedHistory)
      );

    } catch (error) {

      console.error(error);

      alert("Backend connection failed");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white p-10">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-3 text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]">
          TrustReview AI
        </h1>

        <p className="text-center text-slate-400 mb-10">
          AI Powered Fraudulent Review Detection System
        </p>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl">

          <textarea
            rows="8"
            placeholder="Paste product review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-5 rounded-2xl bg-black/30 border border-white/20 text-white text-lg outline-none backdrop-blur-md focus:ring-2 focus:ring-cyan-400"
          />

          <button
            onClick={analyzeReview}
            className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300 py-4 rounded-2xl text-xl font-semibold shadow-lg shadow-cyan-500/30"
          >
            {loading ? "Analyzing..." : "Analyze Review"}
          </button>

          {result && (

            <div className="mt-8 bg-black/30 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl">

              <h2 className="text-3xl font-bold mb-6 text-cyan-400">
                Prediction Result
              </h2>

              <div className="space-y-5">

                <div>

                  <p className="text-lg font-semibold mb-2 text-yellow-400">
                    Prediction
                  </p>

                  <div
                    className={`p-4 rounded-xl text-xl font-bold ${
                      result.prediction === "Fake Review"
                        ? "bg-red-600"
                        : "bg-green-600"
                    }`}
                  >
                    {result.prediction}
                  </div>

                </div>

                <div>

                  <p className="text-lg font-semibold mb-2 text-red-400">
                    Fraud Probability
                  </p>

                  <div className="w-full bg-slate-700 rounded-full h-6">

                    <div
                      className={`h-6 rounded-full ${
                        result.fraud_probability > 50
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${result.fraud_probability}%`
                      }}
                    />

                  </div>

                  <p className="mt-2 text-lg">
                    {result.fraud_probability}%
                  </p>

                </div>

                <div>

                  <p className="text-lg font-semibold mb-2 text-green-400">
                    Authenticity Score
                  </p>

                  <div className="text-2xl font-bold text-blue-400">
                    {100 - result.fraud_probability}%
                  </div>

                </div>

                {result.reasons.length > 0 && (

                  <div className="mt-6">

                    <p className="text-lg font-semibold mb-3 text-pink-400">
                      Why This Review Was Flagged
                    </p>

                    <div className="space-y-3">

                      {result.reasons.map((reason, index) => (

                        <div
                          key={index}
                          className="bg-red-500/20 border border-red-500 p-3 rounded-xl"
                        >
                          {reason}
                        </div>

                      ))}

                    </div>

                  </div>

                )}

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Analyzer;