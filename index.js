const express = require("express");
const app = express();

app.use(express.json()); // to read JSON body

// In-memory array (acts like DB)
let users = [
  { id: 1, name: "Ali", age: 25 },
  { id: 2, name: "Sara", age: 22 }
];


// ================= CREATE =================
// POST /users
app.post("/users", (req, res) => {

  if (!req.body || !req.body.name || !req.body.age) {
    return res.status(400).json({
      error: "Valid name and age required"
    });
  }

  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age
  };

  users.push(newUser);
  res.status(201).json(newUser);
});



app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);

  if (!user) return res.status(404).send("User not found");

  res.send(user);
});


app.put("/users/:id", (req, res) => {

  const user = users.find(u => u.id == req.params.id);

  if (!user) {
    return res.status(404).send("User not found");
  }

  if (!req.body || !req.body.name || !req.body.age) {
    return res.status(400).json({
      error: "Valid name and age required"
    });
  }

  user.name = req.body.name;
  user.age = req.body.age;

  res.json(user);
});


app.delete("/users/:id", (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.send("User deleted");
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
