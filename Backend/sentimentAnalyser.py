# sentimentAnalyser.py

import pandas as pd
from pathlib import Path
from transformers import pipeline

# Define paths
BASE_DIR = Path(__file__).resolve().parent
INPUT_PATH = BASE_DIR / "asset" / "customer_support_tickets_cleaned.csv"
OUTPUT_PATH = BASE_DIR / "asset" / "customer_support_tickets_with_sentiment.csv"

# Load the cleaned CSV
df = pd.read_csv(INPUT_PATH)

# Check for Ticket Description column
if 'Ticket Description' not in df.columns:
    raise ValueError("❌ 'Ticket Description' column not found in the CSV.")

# Load Hugging Face sentiment analysis pipeline
print("🔍 Loading sentiment analysis model...")
sentiment_model = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment-latest")


# Perform sentiment analysis on each ticket
print("🧠 Analyzing ticket sentiments...")
df['Sentiment'] = df['Ticket Description'].astype(str).apply(
    lambda text: sentiment_model(text[:512])[0]['label']  # limit text length for efficiency
)

# Map standard Hugging Face labels to more descriptive categories
sentiment_map = {
    "positive": "Satisfied",
    "neutral": "Neutral",
    "negative": "Frustrated"
}

df['Sentiment'] = df['Sentiment'].map(sentiment_map).fillna("Neutral")

# Save updated CSV with sentiment column
df.to_csv(OUTPUT_PATH, index=False)

print(f"✅ Sentiment analysis complete. Results saved at: {OUTPUT_PATH}")
