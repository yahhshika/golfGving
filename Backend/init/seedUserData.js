const bcrypt = require("bcrypt")

const seedUsers = () => {
  const password = bcrypt.hashSync("password123", 10);

  return [
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      password,
      role: "user",
      scores: [
        { score: 12 },
        { score: 18 },
        { score: 24 },
        { score: 31 },
        { score: 39 },
        { score: 42 },
      ],
    },

    {
      name: "Bob Smith",
      email: "bob@example.com",
      password,
      role: "user",
      scores: [
        { score: 10 },
        { score: 14 },
        { score: 21 },
        { score: 29 },
        { score: 36 },
      ],
    },

    {
      name: "Charlie Brown",
      email: "charlie@example.com",
      password,
      role: "user",
      scores: [
        { score: 40 },
        { score: 43 },
        { score: 45 }, // Perfect winner
      ],
    },

    {
      name: "David Wilson",
      email: "david@example.com",
      password,
      role: "user",
      scores: [
        { score: 6 },
        { score: 13 },
        { score: 19 },
        { score: 22 },
        { score: 27 },
      ],
    },

    {
      name: "Emma Davis",
      email: "emma@example.com",
      password,
      role: "user",
      scores: [
        { score: 35 },
        { score: 37 },
        { score: 41 },
        { score: 44 },
      ],
    },

    {
      name: "Frank Miller",
      email: "frank@example.com",
      password,
      role: "user",
      scores: [
        { score: 9 },
        { score: 16 },
        { score: 23 },
      ],
    },

    {
      name: "Grace Taylor",
      email: "grace@example.com",
      password,
      role: "user",
      scores: [
        { score: 15 },
        { score: 26 },
        { score: 33 },
        { score: 40 },
      ],
    },

    {
      name: "Henry Clark",
      email: "henry@example.com",
      password,
      role: "subscriber",
      scores: [
        { score: 20 },
        { score: 28 },
        { score: 34 },
      ],
    },

    {
      name: "Ivy Anderson",
      email: "ivy@example.com",
      password,
      role: "user",
      scores: [
        { score: 30 },
        { score: 38 },
        { score: 43 },
      ],
    },

    {
      name: "Admin",
      email: "admin@example.com",
      password,
      role: "admin",
      scores: [],
    },
  ];
};

module.exports = seedUsers;