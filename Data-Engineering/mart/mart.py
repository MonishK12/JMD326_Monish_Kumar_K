import pandas as pd

# Load data from the CSV files
categories_df = pd.read_csv('./prep/prep_categories.csv')
courses_df = pd.read_csv('./prep/prep_courses.csv')
user_progress_df = pd.read_csv('./prep/prep_user_progress.csv')
purchases_df = pd.read_csv('./prep/prep_purchases.csv')
employees_df = pd.read_csv('./prep/prep_employees.csv')
feedback_df = pd.read_csv('./prep/prep_feedback.csv')
quiz_scores_df = pd.read_csv('./prep/prep_quiz_scores.csv')
chapters_df = pd.read_csv('./prep/prep_chapters.csv')  # Load chapters data

# Create Dimension Tables
dim_employees = employees_df[['id', 'name', 'email', 'department', 'role']].drop_duplicates()
dim_courses = courses_df[['id', 'title', 'categoryId', 'description', 'author', 'price', 'isPublished']].drop_duplicates()
dim_feedback = feedback_df[['id', 'userId', 'courseName', 'courseRating', 'quizRating', 'instructorRating', 'contentRating', 'satisfaction']].drop_duplicates()
dim_quiz_scores = quiz_scores_df[['id', 'userId', 'score', 'attempt']].drop_duplicates()
dim_purchases = purchases_df[['id', 'userId', 'courseId']].drop_duplicates()

# Create Fact Tables
fact_feedback = feedback_df[['id', 'userId', 'courseRating', 'quizRating', 'instructorRating', 'contentRating', 'satisfaction', 'createdAt']]
fact_quiz_scores = quiz_scores_df[['id', 'userId', 'score', 'attempt', 'createdAt']]
fact_user_progress = user_progress_df[['id', 'userId', 'chapterId', 'isCompleted', 'createdAt']]
fact_purchases = purchases_df[['id', 'userId', 'courseId', 'createdAt']]

# Add courseId to fact_user_progress by merging with chapters_df
fact_user_progress = pd.merge(fact_user_progress, chapters_df[['id', 'courseId']], left_on='chapterId', right_on='id', how='inner')
fact_user_progress = fact_user_progress.drop(columns=['id_y']).rename(columns={'id_x': 'id'})

# Save to CSV files
dim_employees.to_csv('./mart/dim_employees.csv', index=False)
dim_courses.to_csv('./mart/dim_courses.csv', index=False)
dim_feedback.to_csv('./mart/dim_feedback.csv', index=False)
dim_quiz_scores.to_csv('./mart/dim_quiz_scores.csv', index=False)
dim_purchases.to_csv('./mart/dim_purchases.csv', index=False)

fact_feedback.to_csv('./mart/fact_feedback.csv', index=False)
fact_quiz_scores.to_csv('./mart/fact_quiz_scores.csv', index=False)
fact_user_progress.to_csv('./mart/fact_user_progress.csv', index=False)
fact_purchases.to_csv('./mart/fact_purchases.csv', index=False)

print("Fact and Dimension tables created and saved to CSV files.")
