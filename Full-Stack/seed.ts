const {PrismaClient} = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.deleteMany();
    await database.category.createMany({
      data: [
        { "name": "Programming" },
        { "name": "Web Development" },
        { "name": "Electronics" },
        { "name": "Mobile App Development" },
        { "name": "Design" }
      ]
    })

    console.log("success");
  }
  catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main()
// const {PrismaClient} = require("@prisma/client");
// const database = new PrismaClient();

// async function createCourses() {
//   const userId = 'user_2mvUpXyOS0rVyEQsk4pW4YiU3Ye'; // author user ID

//   const courses = [
//     {
//       title: 'Full-Stack Web Development',
//       description: 'Learn full-stack development with HTML, CSS, JavaScript, and Node.js.',
//       imageUrl: 'https://images.unsplash.com/photo-1558691218-3d5fd1e33f0d', // Full-Stack Web Development Image
//       isPublished: true,
//       author: 'John Doe',
//       category: {
//         connectOrCreate: {
//           where: { name: 'Web Development' },
//           create: { name: 'Web Development' },
//         },
//       },
//       chapters: {
//         create: [
//           {
//             title: 'Frontend Development with HTML & CSS',
//             description: 'Learn how to create beautiful web pages with HTML and CSS.',
//             videoUrl: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
//             position: 1,
//           },
//           {
//             title: 'JavaScript Basics',
//             description: 'Learn the fundamentals of JavaScript programming.',
//             videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
//             position: 2,
//           },
//           {
//             title: 'Node.js and Express',
//             description: 'Learn how to build backend APIs with Node.js and Express.',
//             videoUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
//             position: 3,
//           },
//         ],
//       },
//     },
//     {
//       title: 'Mobile App Development with Flutter',
//       description: 'Build cross-platform mobile apps using Flutter.',
//       imageUrl: 'https://images.unsplash.com/photo-1523475496153-3fbec1cf6d05', // Mobile App Development Image
//       isPublished: true,
//       author: 'Jane Smith',
//       category: {
//         connectOrCreate: {
//           where: { name: 'Mobile App Development' },
//           create: { name: 'Mobile App Development' },
//         },
//       },
//       chapters: {
//         create: [
//           {
//             title: 'Introduction to Flutter',
//             description: 'Get started with Flutter and Dart to build mobile apps.',
//             videoUrl: 'https://www.youtube.com/watch?v=fq4N0hgOWzU',
//             position: 1,
//           },
//           {
//             title: 'Building a Responsive UI',
//             description: 'Learn how to create a responsive user interface in Flutter.',
//             videoUrl: 'https://www.youtube.com/watch?v=Vp6GC3jKGXU',
//             position: 2,
//           },
//         ],
//       },
//     },
//     {
//       title: 'Electronics for Beginners',
//       description: 'A beginner’s guide to electronics and circuit design.',
//       imageUrl: 'https://images.unsplash.com/photo-1555617981-cb21f8cf0b4f', // Electronics Image
//       isPublished: true,
//       author: 'Alex Johnson',
//       category: {
//         connectOrCreate: {
//           where: { name: 'Electronics' },
//           create: { name: 'Electronics' },
//         },
//       },
//       chapters: {
//         create: [
//           {
//             title: 'Introduction to Electronics',
//             description: 'Learn the basics of electronics and components.',
//             videoUrl: 'https://www.youtube.com/watch?v=-mHLvtGjum4',
//             position: 1,
//           },
//           {
//             title: 'Circuit Design Basics',
//             description: 'Learn how to design simple circuits.',
//             videoUrl: 'https://www.youtube.com/watch?v=Ie6Y65Lx264',
//             position: 2,
//           },
//         ],
//       },
//     },
//     {
//       title: 'Mastering Python Programming',
//       description: 'Learn Python programming from basics to advanced topics.',
//       imageUrl: 'https://images.unsplash.com/photo-1581092580493-100961d0e65c', // Python Programming Image
//       isPublished: true,
//       author: 'Chris Lee',
//       category: {
//         connectOrCreate: {
//           where: { name: 'Programming' },
//           create: { name: 'Programming' },
//         },
//       },
//       chapters: {
//         create: [
//           {
//             title: 'Python Basics',
//             description: 'Learn the syntax and basics of Python programming.',
//             videoUrl: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
//             position: 1,
//           },
//           {
//             title: 'Working with Data in Python',
//             description: 'Learn how to manipulate data with Python libraries like Pandas.',
//             videoUrl: 'https://www.youtube.com/watch?v=vmEHCJofslg',
//             position: 2,
//           },
//         ],
//       },
//     },
//     {
//       title: 'Graphic Design Fundamentals',
//       description: 'Learn the basics of graphic design and typography.',
//       imageUrl: 'https://images.unsplash.com/photo-1506765515384-028b60a970df', // Graphic Design Image
//       isPublished: true,
//       author: 'Emma Williams',
//       category: {
//         connectOrCreate: {
//           where: { name: 'Design' },
//           create: { name: 'Design' },
//         },
//       },
//       chapters: {
//         create: [
//           {
//             title: 'Introduction to Graphic Design',
//             description: 'Learn the principles of graphic design.',
//             videoUrl: 'https://www.youtube.com/watch?v=gfuw7dISG5Y',
//             position: 1,
//           },
//           {
//             title: 'Typography and Layout',
//             description: 'Learn how to create beautiful designs with typography and layout techniques.',
//             videoUrl: 'https://www.youtube.com/watch?v=xp8mEVdVrrc',
//             position: 2,
//           },
//         ],
//       },
//     },
//   ];

//   for (const course of courses) {
//     await database.course.create({
//       data: {
//         ...course,
//         userId, // assigning the user ID
//       },
//     });
//   }

//   console.log('Courses created successfully!');
// }

// createCourses()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await database.$disconnect();
//   });
