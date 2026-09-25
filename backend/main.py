from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os
#from rag import retrieve_context
#from transformers import pipeline



# Create app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

model = joblib.load(
    os.path.join(BASE_DIR, "ml", "fraud_model.pkl")
)

vectorizer = joblib.load(
    os.path.join(BASE_DIR, "ml", "vectorizer.pkl")
)

# Input schema
class ReviewRequest(BaseModel):
    review: str



# Home route
@app.get("/")
def home():
    return {
        "message": "TrustReview AI Backend Running"
    }

# Prediction route
@app.post("/predict")
def predict_review(data: ReviewRequest):

    review = data.review.lower()

    # Vectorize review
    review_vector = vectorizer.transform([review])

    # ML probability
    probability = model.predict_proba(review_vector)[0][1]

    fraud_score = probability * 100
    reasons = []

    # Spam keywords
    spam_words = [
        "best ever",
        "must buy",
        "perfect",
        "amazing",
        "excellent",
        "mind blowing",
        "revolutionary",
        "unbeatable",
        "life changing",
        "100%",
        "guaranteed"
    ]

    # Keyword score
    for word in spam_words:

        if word in review:

            fraud_score += 12

            reasons.append(
                f"Suspicious phrase detected: '{word}'"
            )

    # Exclamation detection
    if review.count("!") > 2:

        fraud_score += 20

        reasons.append(
            "Too many exclamation marks"
        )

    # CAPS detection
    capital_words = sum(
        1 for word in data.review.split()
        if word.isupper()
    )

    if capital_words > 3:

        fraud_score += 15

        reasons.append(
            "Excessive use of capital letters"
        )

    # Repeated words
    words = review.split()

    repeated_words = len(words) - len(set(words))

    if repeated_words > 3:

        fraud_score += 20

        reasons.append(
            "Repeated spam-like words detected"
        )

    # Limit fraud score
    fraud_score = min(fraud_score, 100)

    # Explanation
    if fraud_score > 70:

        reason = "Highly suspicious review behavior detected."

    elif fraud_score > 50:

        reason = "Review contains partially suspicious characteristics."

    else:

        reason = "Review appears authentic and genuine."

    reasons.append(reason)

    # Final prediction
    if fraud_score >= 50:

        prediction = "Fake Review"

    else:

        prediction = "Genuine Review"

    return {
        "review": data.review,
        "prediction": prediction,
        "fraud_probability": round(float(fraud_score), 2),
        "reasons": reasons
    }
