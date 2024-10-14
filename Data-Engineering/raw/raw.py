import pandas as pd

# Define file paths for your local CSV files
file_paths = {
    'categories': './dataset/categories.csv',
    'courses': './dataset/courses.csv',
    'chapters': './dataset/chapters.csv',
    'user_progress': './dataset/user_progress.csv',
    'purchases': './dataset/purchases.csv',
    'employees': './dataset/employees.csv',
    'feedback': './dataset/feedback.csv',
    'quiz_scores': './dataset/quiz_scores.csv',
    'discussions': './dataset/discussions.csv',
    'messages': './dataset/messages.csv',
}

# Read the CSV files into pandas DataFrames
dataframes = {}
for name, file_path in file_paths.items():
    try:
        df = pd.read_csv(file_path)
        dataframes[name] = df
        print(f"Loaded {name} with {df.shape[0]} records.")
    except FileNotFoundError:
        print(f"File not found: {file_path}")
    except pd.errors.EmptyDataError:
        print(f"File is empty: {file_path}")
    except Exception as e:
        print(f"Error loading {name}: {e}")

# Accessing the DataFrames
categories_df = dataframes.get('categories')
courses_df = dataframes.get('courses')
chapters_df = dataframes.get('chapters')
user_progress_df = dataframes.get('user_progress')
purchases_df = dataframes.get('purchases')
employees_df = dataframes.get('employees')
feedback_df = dataframes.get('feedback')
quiz_scores_df = dataframes.get('quiz_scores')
discussions_df = dataframes.get('discussions')
messages_df = dataframes.get('messages')

# Save DataFrames to pickle for future use (optional)
for name, df in dataframes.items():
    df.to_csv(f'D:/final-project/eealb-v2/De-finalproj/raw/raw_layer_{name}.csv')
