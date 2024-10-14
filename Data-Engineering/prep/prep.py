import pandas as pd
import numpy as np

# Define file paths for your local CSV files
file_paths = {
    'categories': './raw/raw_layer_categories.csv',
    'courses': './raw/raw_layer_courses.csv',
    'chapters': './raw/raw_layer_chapters.csv',
    'user_progress': './raw/raw_layer_user_progress.csv',
    'purchases': './raw/raw_layer_purchases.csv',
    'employees': './raw/raw_layer_employees.csv',
    'feedback': './raw/raw_layer_feedback.csv',
    'quiz_scores': './raw/raw_layer_quiz_scores.csv',
    'discussions': './raw/raw_layer_discussions.csv',
    'messages': './raw/raw_layer_messages.csv',
}

# Load the raw data into pandas DataFrames
dataframes = {}
for name, file_path in file_paths.items():
    try:
        df = pd.read_csv(file_path)
        dataframes[name] = df
        print(f"Loaded {name} with {df.shape[0]} records.")
    except Exception as e:
        print(f"Error loading {name}: {e}")

# Data Cleaning and Preparation
def clean_categories(df):
    df = df.drop_duplicates()
    return df

def clean_courses(df):
    df = df.drop_duplicates()
    df['title'] = df['title'].str.strip()  # Strip whitespace
    df['description'] = df['description'].fillna('No description provided.')  # Fill missing descriptions
    return df

def clean_chapters(df):
    df = df.drop_duplicates()
    df['title'] = df['title'].str.strip()
    df['description'] = df['description'].fillna('No description provided.')
    df['courseId'] = df['courseId'].astype(str)  # Ensure courseId is a string
    return df

def clean_user_progress(df):
    df = df.drop_duplicates()
    df['userId'] = df['userId'].astype(str)
    df['chapterId'] = df['chapterId'].astype(str)
    df['isCompleted'] = df['isCompleted'].fillna(False).astype(bool)  # Ensure isCompleted is boolean
    return df

def clean_purchases(df):
    df = df.drop_duplicates()
    df['userId'] = df['userId'].astype(str)
    df['courseId'] = df['courseId'].astype(str)
    return df

def clean_employees(df):
    df = df.drop_duplicates()
    df['name'] = df['name'].str.strip()
    df['email'] = df['email'].str.strip().str.lower()  # Standardize email to lower case
    df['department'] = df['department'].str.strip()
    df['role'] = df['role'].str.strip()
    return df

def clean_feedback(df):
    df = df.drop_duplicates()
    df['userId'] = df['userId'].astype(str)
    df['courseName'] = df['courseName'].str.strip()
    df['comments'] = df['comments'].fillna('No comments provided.')
    return df

def clean_quiz_scores(df):
    df = df.drop_duplicates()
    df['userId'] = df['userId'].astype(str)
    df['score'] = df['score'].clip(lower=0, upper=100)  # Ensure score is between 0 and 100
    return df

def clean_discussions(df):
    df = df.drop_duplicates()
    df['category'] = df['category'].str.strip()
    return df

def clean_messages(df):
    df = df.drop_duplicates()
    df['content'] = df['content'].str.strip()
    return df

# Clean each DataFrame
cleaned_dataframes = {
    'categories': clean_categories(dataframes['categories']),
    'courses': clean_courses(dataframes['courses']),
    'chapters': clean_chapters(dataframes['chapters']),
    'user_progress': clean_user_progress(dataframes['user_progress']),
    'purchases': clean_purchases(dataframes['purchases']),
    'employees': clean_employees(dataframes['employees']),
    'feedback': clean_feedback(dataframes['feedback']),
    'quiz_scores': clean_quiz_scores(dataframes['quiz_scores']),
    'discussions': clean_discussions(dataframes['discussions']),
    'messages': clean_messages(dataframes['messages']),
}

# Example: Save cleaned DataFrames to CSV files
for name, df in cleaned_dataframes.items():
    df.to_csv(f'./prep/prep_{name}.csv', index=False)
    print(f"Cleaned {name} saved with {df.shape[0]} records.")

print("Data preparation completed.")
