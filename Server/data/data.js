const chats = [
    {
      isGroupChat: false,
      users: [
        {
          name: "Pratima Shrestha",
          email: "Pratima@example.com",
        },
        {
          name: "poppy",
          email: "poppy@example.com",
        },
      ],
      _id: "617a077e18c25468bc7c4dd4",
      chatName: "Pratima Shrestha",
    },
    {
      isGroupChat: false,
      users: [
        {
          name: "Guest User",
          email: "guest@example.com",
        },
        {
          name: "poppy",
          email: "poppy@example.com",
        },
      ],
      _id: "617a077e18c25468b27c4dd4",
      chatName: "Guest User",
    },
    {
      isGroupChat: false,
      users: [
        {
          name: "parth",
          email: "parth@example.com",
        },
        {
          name: "poppy",
          email: "poppy@example.com",
        },
      ],
      _id: "617a077e18c2d468bc7c4dd4",
      chatName: "parth",
    },
    {
      isGroupChat: true,
      users: [
        {
          name: "Pratima Shrestha",
          email: "jon@example.com",
        },
        {
          name: "poppy",
          email: "poppy@example.com",
        },
        {
          name: "Guest User",
          email: "guest@example.com",
        },
      ],
      _id: "617a518c4081150716472c78",
      chatName: "Friends",
      groupAdmin: {
        name: "Guest User",
        email: "guest@example.com",
      },
    },
    {
      isGroupChat: false,
      users: [
        {
          name: "Jane Shrestha",
          email: "jane@example.com",
        },
        {
          name: "poppy",
          email: "poppy@example.com",
        },
      ],
      _id: "617a077e18c25468bc7cfdd4",
      chatName: "Jane Shrestha",
    },
    {
      isGroupChat: true,
      users: [
        {
          name: "Pratima Shrestha",
          email: "jon@example.com",
        },
        {
          name: "poppy",
          email: "poppy@example.com",
        },
        {
          name: "Guest User",
          email: "guest@example.com",
        },
      ],
      _id: "617a518c4081150016472c78",
      chatName: "Chill Zone",
      groupAdmin: {
        name: "Guest User",
        email: "guest@example.com",
      },
    },
  ];

  module.exports = {chats};