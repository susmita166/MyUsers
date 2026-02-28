const express = require('express');
const serverless = require('serverless-http');
require('dotenv').config();
const app = express();

//const PORT = process.env.PORT || 3000;

app.use(express.json());

let users = [
  { id: 1, name: "Susmita" },
  { id: 2, name: "Rahul" }
];

app.get('/', (req, res) => {
  res.send("🚀 Project Running Successfully.....");
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
// 🔥 IMPORTANT: export handler for Lambda
module.exports.handler = serverless(app);
