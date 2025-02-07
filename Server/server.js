const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const { notFound, errorHandler } = require('./middleware/error');
const { chats } = require("./data/data");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
}));

// Basic routes
app.get('/', (req, res) => {
    console.log("API is running.");
    res.send("API is running.");
});

app.get("/api/chat", (req, res) => {
    res.send(chats);
});

// Route to get a single chat by ID
app.get("/api/chat/:id", (req, res) => {
    const singleChat = chats.find((c) => c._id === req.params.id);
    if (singleChat) {
        res.send(singleChat);
    } else {
        res.status(404).send({ message: "Chat not found" });
    }
});

// User routes
app.use('/api/user', userRoutes);
app.use('/api/chat',chatRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4001;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
