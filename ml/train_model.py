import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import accuracy_score
from xgboost import XGBClassifier

# Load dataset
df = pd.read_csv("../dataset/fake_reviews.csv")

# Show dataset columns
print(df.columns)

# Text column
X = df['text_'].astype(str)

# Labels
y = df['label'].map({
    'CG': 1,
    'OR': 0
})

# Convert text to vectors
vectorizer = TfidfVectorizer(
    stop_words='english',
    max_features=5000
)

X_vectorized = vectorizer.fit_transform(X)

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X_vectorized,
    y,
    test_size=0.2,
    random_state=42
)

# Create model
model = XGBClassifier()

# Train model
model.fit(X_train, y_train)

# Predictions
predictions = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, predictions)

print(f"Accuracy: {accuracy * 100:.2f}%")

# Save model
joblib.dump(model, "fraud_model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

print("Model saved successfully!")