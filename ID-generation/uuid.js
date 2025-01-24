
const { v4: uuidv4 } = require('uuid');

const chats = [
    {
        _id: uuidv4(), // Generate a unique ID
        chatName: "Pratima Doe",
        users: [
            { name: "Pratima", email: "Pratima@example.com" },
            { name: "Piyush", email: "piyush@example.com" },
        ],
    },
];
