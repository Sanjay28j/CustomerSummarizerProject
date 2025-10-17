import pandas as pd
from pathlib import Path

# Define paths
BASE_DIR = Path(__file__).resolve().parent
ASSET_PATH = BASE_DIR / "asset" / "customer_support_tickets.csv"
OUTPUT_PATH = BASE_DIR / "asset" / "customer_support_tickets_cleaned.csv"

# Load data
df = pd.read_csv(ASSET_PATH)

# Convert date/time columns to datetime type
for col in ['First Response Time', 'Time to Resolution', 'Date of Purchase']:
    if col in df.columns:
        df[col] = pd.to_datetime(df[col], errors='coerce')

# Remove duplicates
df = df.drop_duplicates()

# Handle missing values 
if 'Resolution' in df.columns:
    df['Resolution'] = df['Resolution'].fillna('Pending')

if 'Customer Satisfaction Rating' in df.columns:
    df['Customer Satisfaction Rating'] = df['Customer Satisfaction Rating'].fillna(0)

if 'First Response Time' in df.columns:
    df['First Response Time'] = df['First Response Time'].fillna(pd.Timestamp('1970-01-01'))

# Calculate ticket age (in days)
if 'Date of Purchase' in df.columns:
    df['Ticket Age Days'] = (pd.Timestamp.now() - df['Date of Purchase']).dt.days

# Save cleaned data
df.to_csv(OUTPUT_PATH, index=False)

print(f"✅ Data cleaning complete. Cleaned file saved as: {OUTPUT_PATH}")
