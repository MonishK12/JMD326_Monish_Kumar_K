import pandas as pd

# Load data from the CSV files
dim_employees = pd.read_csv('./mart/dim_employees.csv')
dim_courses = pd.read_csv('./mart/dim_courses.csv')
dim_feedback = pd.read_csv('./mart/dim_feedback.csv')
dim_quiz_scores = pd.read_csv('./mart/dim_quiz_scores.csv')
dim_purchases = pd.read_csv('./mart/dim_purchases.csv')

fact_feedback = pd.read_csv('./mart/fact_feedback.csv')
fact_quiz_scores = pd.read_csv('./mart/fact_quiz_scores.csv')
fact_user_progress = pd.read_csv('./mart/fact_user_progress.csv')
fact_purchases = pd.read_csv('./mart/fact_purchases.csv')

# Add courseId to dim_feedback by merging with dim_courses
dim_feedback = pd.merge(dim_feedback, dim_courses[['id', 'title']], left_on='courseName', right_on='title', how='inner')
dim_feedback = dim_feedback.rename(columns={'id': 'courseId'})

# Create Employee Performance Report
employee_quiz_scores = fact_quiz_scores.merge( dim_employees, left_on='userId', right_on='id', how='inner')
employee_feedback = pd.merge(fact_feedback, dim_employees, left_on='userId', right_on='id', how='inner')
print(employee_quiz_scores.shape)
employee_performance = employee_quiz_scores.groupby(['name', 'department', 'role']).agg({
    'score': 'mean',
    'attempt': 'mean'
}).reset_index()
print("Emplo perf",employee_performance.columns,employee_performance.shape)
employee_feedback_ratings = employee_feedback.groupby(['name', 'department', 'role']).agg({
    'courseRating': 'mean',
    'quizRating': 'mean',
    'instructorRating': 'mean',
    'contentRating': 'mean',
    'satisfaction': 'mean'
}).reset_index()
print("feddback",employee_feedback_ratings.columns,employee_feedback_ratings.shape)
employee_report = pd.merge(employee_performance, employee_feedback_ratings, on=['name', 'department', 'role'], how='inner')
print("Employee Report",employee_report)

# Create Course Popularity Report
course_purchases = pd.merge(fact_purchases, dim_courses, left_on='courseId', right_on='id', how='inner')
course_feedback = pd.merge(dim_feedback, dim_courses[['title', 'author', 'categoryId']], left_on='courseName', right_on='title', how='inner')

# Rename columns to avoid conflicts
course_feedback = course_feedback.rename(columns={'title_y': 'title'})
course_purchases = course_purchases.rename(columns={'id_x': 'id'})
# Create course popularity report using the 'id' column from course_purchases
course_popularity = course_purchases.groupby(['title', 'author', 'categoryId']).agg({
    'id': 'count'  # Use 'id' for counting purchases
}).rename(columns={'id': 'num_purchases'}).reset_index()

# Group course feedback data for rating averages
course_ratings = course_feedback.groupby(['title', 'author', 'categoryId']).agg({
    'courseRating': 'mean',
    'quizRating': 'mean',
    'instructorRating': 'mean',
    'contentRating': 'mean',
    'satisfaction': 'mean'
}).reset_index()

# Merge course popularity with course ratings
course_report = pd.merge(course_popularity, course_ratings, on=['title', 'author', 'categoryId'], how='outer')
print(course_report)

# Merge user progress with courses to get course titles
user_progress = pd.merge(fact_user_progress, dim_courses, left_on='courseId', right_on='id', how='inner')

# Calculate the user progress for each course
user_progress_report = user_progress.groupby(['userId', 'title']).agg({
    'isCompleted': 'sum',
    'chapterId': 'count'  # Count total chapters
}).rename(columns={'chapterId': 'total_chapters'}).reset_index()

# Calculate progress percentage for each user
user_progress_report['progress_percentage'] = (user_progress_report['isCompleted'] / user_progress_report['total_chapters']) * 100
print(user_progress_report)
# Save Reports to CSV
employee_report.to_csv('./reports/employee_performance_report.csv', index=False)
course_report.to_csv('./reports/course_popularity_report.csv', index=False)
user_progress_report.to_csv('./reports/user_progress_report.csv', index=False)

print("Reports generated and saved to CSV files.")
