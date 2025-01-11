const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Post.deleteMany({});

        // Array of test users
        const users = [
            { name: 'John Doe', email: 'john@example.com', password: 'password123' },
            { name: 'Jane Smith', email: 'jane@example.com', password: 'password123' },
            { name: 'Alice Johnson', email: 'alice@example.com', password: 'password123' },
        ];

        // Create users and store their ObjectIds
        const createdUsers = [];
        for (let userData of users) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const user = new User({ ...userData, password: hashedPassword });
            await user.save();
            createdUsers.push(user);
        }

        // Array of test posts
        const posts = [
            { user: createdUsers[0]._id, content: 'Hello, this is John\'s first post!', likes: 3 },
            { user: createdUsers[1]._id, content: 'Jane here! Excited to join this platform!', likes: 5 },
            { user: createdUsers[2]._id, content: 'Alice loves coding and sharing ideas.', likes: 8 },
            { user: createdUsers[0]._id, content: 'Another day, another post from John!', likes: 2 },
        ];

        // Create posts
        for (let postData of posts) {
            const post = new Post(postData);
            await post.save();
        }

        console.log('Multiple users and posts seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
