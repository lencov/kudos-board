const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function main() {

  await prisma.comment.deleteMany();
  await prisma.card.deleteMany();
  await prisma.board.deleteMany();

  // Create sample boards
  const boards = await Promise.all([
    prisma.board.create({
      data: {
        title: 'Team Appreciation Board',
        category: 'thank you',
        description: 'A place to show appreciation for our amazing team members and their hard work.',
        author: 'Sarah Johnson',
        imageURL: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit=crop',
      },
    }),
    prisma.board.create({
      data: {
        title: 'Project Launch Celebration',
        category: 'celebration',
        description: 'Celebrating the successful launch of our new product! Great work everyone!',
        author: 'Mike Chen',
        imageURL: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=300&fit=crop',
      },
    }),
    prisma.board.create({
      data: {
        title: 'Daily Motivation',
        category: 'inspiration',
        description: 'Share inspiring quotes, stories, and moments to keep our team motivated.',
        author: 'Alex Rivera',
        imageURL: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
      },
    }),
    prisma.board.create({
      data: {
        title: 'Customer Success Stories',
        category: 'celebration',
        description: 'Highlighting amazing feedback and success stories from our customers.',
        imageURL: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=300&fit=crop',
      },
    }),
    prisma.board.create({
      data: {
        title: 'Welcome New Team Members',
        category: 'thank you',
        description: 'A warm welcome to all our new team members joining our amazing company!',
        author: 'HR Team',
        imageURL: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&h=300&fit=crop',
      },
    }),
  ]);


  const cards = await Promise.all([
    // Cards for Team Appreciation Board
    prisma.card.create({
      data: {
        title: 'Outstanding Code Review!',
        description: 'Thank you for the thorough code review on the authentication module. Your attention to detail caught several important issues!',
        gifURL: 'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif',
        owner: 'John Doe',
        likeCount: 5,
        boardId: boards[0].id,
        isPinned: true,
        pinnedAt: new Date(),
      },
    }),
    prisma.card.create({
      data: {
        title: 'Great Presentation Skills',
        description: 'Your presentation to the client was fantastic! You explained complex technical concepts in a way everyone could understand.',
        gifURL: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
        owner: 'Emily Davis',
        likeCount: 8,
        boardId: boards[0].id,
      },
    }),
    prisma.card.create({
      data: {
        title: 'Always Helpful',
        description: 'Thanks for always being willing to help teammates with debugging issues. Your patience and expertise are invaluable!',
        gifURL: 'https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif',
        owner: 'David Wilson',
        likeCount: 3,
        boardId: boards[0].id,
      },
    }),

    // Cards for Project Launch Celebration
    prisma.card.create({
      data: {
        title: 'We Did It! 🎉',
        description: 'After months of hard work, we successfully launched the new feature! The user feedback has been overwhelmingly positive.',
        gifURL: 'https://media.giphy.com/media/26u4b45b8KlFpqSuQ/giphy.gif',
        owner: 'Project Team',
        likeCount: 12,
        boardId: boards[1].id,
        isPinned: true,
        pinnedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
    }),
    prisma.card.create({
      data: {
        title: 'Zero Critical Bugs!',
        description: 'Amazing work by the QA team - we launched with zero critical bugs. The testing process was thorough and effective.',
        gifURL: 'https://media.giphy.com/media/3o7absbD7kbZXE2pQc/giphy.gif',
        owner: 'QA Team',
        likeCount: 7,
        boardId: boards[1].id,
      },
    }),
    prisma.card.create({
      data: {
        title: 'Record Breaking Performance',
        description: 'The new feature is performing 40% faster than our initial benchmarks. Excellent optimization work!',
        gifURL: 'https://media.giphy.com/media/26BRBKqUiq586bRVm/giphy.gif',
        likeCount: 9,
        boardId: boards[1].id,
      },
    }),

    // Cards for Daily Motivation
    prisma.card.create({
      data: {
        title: 'Monday Motivation',
        description: '"The way to get started is to quit talking and begin doing." - Walt Disney. Let\'s make this week amazing!',
        gifURL: 'https://media.giphy.com/media/26u4lOMA8JKSnL9Uk/giphy.gif',
        owner: 'Motivation Bot',
        likeCount: 4,
        boardId: boards[2].id,
      },
    }),
    prisma.card.create({
      data: {
        title: 'Growth Mindset',
        description: 'Remember: every expert was once a beginner. Every pro was once an amateur. Keep learning and growing!',
        gifURL: 'https://media.giphy.com/media/26u4nzKLOqJuokTaU/giphy.gif',
        owner: 'Lisa Park',
        likeCount: 6,
        boardId: boards[2].id,
      },
    }),

    // Cards for Customer Success Stories
    prisma.card.create({
      data: {
        title: '5-Star Review!',
        description: 'Just received an amazing 5-star review: "This app has transformed how we manage our workflow. Incredible user experience!"',
        gifURL: 'https://media.giphy.com/media/26u4kr1xrcbYHs13O/giphy.gif',
        owner: 'Customer Success',
        likeCount: 15,
        boardId: boards[3].id,
        isPinned: true,
        pinnedAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      },
    }),
    prisma.card.create({
      data: {
        title: 'Customer Saved 10 Hours/Week',
        description: 'A customer reported that our automation features are saving them 10 hours per week. That\'s the impact we\'re making!',
        gifURL: 'https://media.giphy.com/media/26BRzozg4TCBXv6QU/giphy.gif',
        likeCount: 11,
        boardId: boards[3].id,
      },
    }),

    // Cards for Welcome New Team Members
    prisma.card.create({
      data: {
        title: 'Welcome Jessica!',
        description: 'Welcome to our new Senior Developer Jessica Martinez! We\'re excited to have you join our frontend team.',
        gifURL: 'https://media.giphy.com/media/26u4lOMA8JKSnL9Uk/giphy.gif',
        owner: 'Team Lead',
        likeCount: 8,
        boardId: boards[4].id,
      },
    }),
    prisma.card.create({
      data: {
        title: 'Welcome Tom!',
        description: 'A warm welcome to Tom Anderson, our new Product Manager. Looking forward to working with you!',
        gifURL: 'https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif',
        owner: 'Product Team',
        likeCount: 6,
        boardId: boards[4].id,
      },
    }),
  ]);

  const comments = await Promise.all([
    // Comments for first card
    prisma.comment.create({
      data: {
        message: 'Totally agree! That code review was incredibly detailed and helpful.',
        author: 'Jane Smith',
        cardId: cards[0].id,
      },
    }),
    prisma.comment.create({
      data: {
        message: 'Thanks for the kind words! Always happy to help the team.',
        author: 'John Doe',
        cardId: cards[0].id,
      },
    }),
    prisma.comment.create({
      data: {
        message: 'This is why our code quality is so high!',
        cardId: cards[0].id,
      },
    }),

    // Comments for celebration card
    prisma.comment.create({
      data: {
        message: 'So proud of what we accomplished together! 🎉',
        author: 'Team Member',
        cardId: cards[3].id,
      },
    }),
    prisma.comment.create({
      data: {
        message: 'The user feedback has been incredible. Great work everyone!',
        author: 'Product Manager',
        cardId: cards[3].id,
      },
    }),

    // Comments for customer success story
    prisma.comment.create({
      data: {
        message: 'This is exactly why we do what we do! Making a real difference.',
        author: 'CEO',
        cardId: cards[8].id,
      },
    }),
    prisma.comment.create({
      data: {
        message: 'Love seeing the positive impact on our customers!',
        author: 'Customer Success Manager',
        cardId: cards[8].id,
      },
    }),

    // Comments for motivation card
    prisma.comment.create({
      data: {
        message: 'Needed this today! Thanks for the motivation.',
        author: 'Developer',
        cardId: cards[6].id,
      },
    }),
  ]);


}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
