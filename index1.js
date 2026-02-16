const express = require("express");
const app = express();

app.use(express.json());

let students = [
  { id: 1, name: "A", mobileno: 8978735498, address: "ABC", age: 20 },
  { id: 2, name: "B", mobileno: 7873547890, address: "BCD", age: 25 }
];

app.post("/students", (req, res) => {

  const { name, mobileno, address, age } = req.body;

  if (!name || !mobileno || !address || !age) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    mobileno,
    address,
    age
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/students/:id", (req, res) => {

  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

app.put("/students/:id", (req, res) => {

  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { name, mobileno, address, age } = req.body;

  if (!name && !mobileno && !address && !age) {
    return res.status(400).json({
      message: "At least one field must be provided"
    });
  }

  if (name) student.name = name;
  if (mobileno) student.mobileno = mobileno;
  if (address) student.address = address;
  if (age) student.age = age;

  res.json(student);
});

app.delete("/students/:id", (req, res) => {

  const id = parseInt(req.params.id);
  const exists = students.find(s => s.id === id);

  if (!exists) {
    return res.status(404).json({ message: "Student not found" });
  }

  students = students.filter(s => s.id !== id);

  res.json({ message: "Student deleted successfully" });
});



app.get("/students-names", (req, res) => {
  const names = students.map(s => s.name);
  res.json(names);
});

app.get("/students-above-21", (req, res) => {
  const result = students.filter(s => s.age > 21);
  res.json(result);
});


app.get("/find-student-2", (req, res) => {
  const student = students.find(s => s.id === 2);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
