const express = require("express");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());

const users = [];

const validateUserId = (request, response, next) => {
  const { id } = request.params;

  if (!isUuid(id))
    return response.status(400).json({ error: "Invalid user id." });

  return next();
};

app.get("/users", (request, response) => {
  const { name } = request.query;
  const results = name ? users.filter(user => user.name.includes(name)) : users;
  return response.json(results);
});

app.post("/users", (request, response) => {
  const { name, age, gender, company, email, picture } = request.body;
  const user = { id: uuid(), name, age, gender, company, email };

  users.push(user);
  return response.json(user);
});

app.put("/users/:id", validateUserId, (request, response) => {
  const { id } = request.params;
  const { name, age, gender, company, email } = request.body;

  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex < 0)
    return response.status(400).json({ error: "User not found" });

  const user = {
    id,
    name,
    age,
    gender,
    company,
    email,
  };

  users[userIndex] = user;

  return response.json(project);
});

app.delete("/users/:id", validateUserId, (request, response) => {
  const { id } = request.params;

  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex < 0)
    return response.status(400).json({ error: "User not found" });

  users.splice(userIndex, 1);
  return response.status(204).send();
});

app.listen(3333, () => console.log("Backend started 🚀"));
