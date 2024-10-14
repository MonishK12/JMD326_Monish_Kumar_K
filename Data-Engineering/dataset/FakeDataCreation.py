from faker import Faker
import random
import uuid
import pandas as pd

fake = Faker()

# Fixed categories based on your input
categories = [
    {"id": str(uuid.uuid4()), "name": "Programming"},
    {"id": str(uuid.uuid4()), "name": "Web Development"},
    {"id": str(uuid.uuid4()), "name": "Electronics"},
    {"id": str(uuid.uuid4()), "name": "Mobile App Development"},
    {"id": str(uuid.uuid4()), "name": "Design"},
]

departments = ["Full Stack", "Data Engineering", "Data Science"]
roles = ["Software Engineer", "Sr Software Engineer", "Solution Enabler", "Solution Consultant"]

# Configuration for generating data
num_courses = 30000
num_chapters = 60000  
num_user_progress = 90000  
num_purchases = 30000  
num_employees = 500  
num_feedback = 30000  
num_quiz_scores = 30000  
num_discussions = 500  
num_messages = 60000  

# Generate employees and store their IDs
employees = []
for _ in range(num_employees):
    emp_id = str(uuid.uuid4())
    employees.append({
        "id": emp_id,
        "name": fake.name(),
        "email": fake.unique.email(),
        "department": random.choice(departments),
        "role": random.choice(roles),
        "createdAt": fake.date_time(),
        "updatedAt": fake.date_time(),
    })

# Generate courses
courses = []
for _ in range(num_courses):
    course_name = fake.catch_phrase()
    courses.append({
        "id": str(uuid.uuid4()),
        "title": course_name,
        "description": fake.paragraph(),
        "imageUrl": fake.image_url(),
        "price": 0.00,  # Price is always 0
        "isPublished": random.choice([True, False]),
        "author": fake.name(),
        "categoryId": random.choice(categories)["id"],
        "createdAt": fake.date_time(),
        "updatedAt": fake.date_time(),
    })

# Generate chapters
chapters = []
for _ in range(num_chapters):
    chapters.append({
        "id": str(uuid.uuid4()),
        "title": fake.sentence(),
        "description": fake.paragraph(),
        "videoUrl": fake.url(),
        "position": random.randint(1, 10),
        "isPublished": random.choice([True, False]),
        "isFree": True,  # isFree is always True
        "courseId": random.choice(courses)["id"],
        "createdAt": fake.date_time(),
        "updatedAt": fake.date_time(),
    })

# Generate feedback using employee IDs
feedback = []
for _ in range(num_feedback):
    course = random.choice(courses)
    feedback.append({
        "id": str(uuid.uuid4()),
        "userId": random.choice(employees)["id"],  # Use employee ID here
        "courseRating": random.randint(1, 5),
        "quizRating": random.randint(1, 5),
        "instructorRating": random.randint(1, 5),
        "contentRating": random.randint(1, 5),
        "satisfaction": random.randint(1, 5),
        "comments": fake.paragraph(),
        "courseName": course["title"],
        "createdAt": fake.date_time(),
    })

# Generate user progress using employee IDs
user_progress = []
for _ in range(num_user_progress):
    user_progress.append({
        "id": str(uuid.uuid4()),
        "userId": random.choice(employees)["id"],  # Use employee ID here
        "chapterId": random.choice(chapters)["id"],
        "isCompleted": random.choice([True, False]),
        "createdAt": fake.date_time(),
        "updatedAt": fake.date_time(),
    })

# Generate purchases using employee IDs
purchases = []
for _ in range(num_purchases):
    purchases.append({
        "id": str(uuid.uuid4()),
        "userId": random.choice(employees)["id"],  # Use employee ID here
        "courseId": random.choice(courses)["id"],
        "createdAt": fake.date_time(),
        "updatedAt": fake.date_time(),
    })

# Generate quiz scores using employee IDs
quiz_scores = []
for _ in range(num_quiz_scores):
    quiz_scores.append({
        "id": str(uuid.uuid4()),
        "userId": random.choice(employees)["id"],  # Use employee ID here
        "score": random.randint(0, 100),
        "attempt": random.randint(1, 5),
        "createdAt": fake.date_time(),
    })

# Generate discussions
discussions = []
for _ in range(num_discussions):
    discussions.append({
        "id": str(uuid.uuid4()),
        "category": random.choice(categories)["name"],
        "createdAt": fake.date_time(),
    })

# Generate messages
messages = []
for _ in range(num_messages):
    messages.append({
        "id": str(uuid.uuid4()),
        "discussionId": random.choice(discussions)["id"],
        "userId": random.choice(employees)["id"],  # Use employee ID here
        "content": fake.sentence(),
        "createdAt": fake.date_time(),
        "userName": fake.name(),
        "avatarUrl": fake.image_url(),
    })

# Create DataFrames
categories_df = pd.DataFrame(categories)
courses_df = pd.DataFrame(courses)
chapters_df = pd.DataFrame(chapters)
user_progress_df = pd.DataFrame(user_progress)
purchases_df = pd.DataFrame(purchases)
employees_df = pd.DataFrame(employees)
feedback_df = pd.DataFrame(feedback)
quiz_scores_df = pd.DataFrame(quiz_scores)
discussions_df = pd.DataFrame(discussions)
messages_df = pd.DataFrame(messages)

# Save to CSV files
categories_df.to_csv('categories.csv', index=False)
courses_df.to_csv('courses.csv', index=False)
chapters_df.to_csv('chapters.csv', index=False)
user_progress_df.to_csv('user_progress.csv', index=False)
purchases_df.to_csv('purchases.csv', index=False)
employees_df.to_csv('employees.csv', index=False)
feedback_df.to_csv('feedback.csv', index=False)
quiz_scores_df.to_csv('quiz_scores.csv', index=False)
discussions_df.to_csv('discussions.csv', index=False)
messages_df.to_csv('messages.csv', index=False)

print("Dummy data generated and saved to CSV files.")
