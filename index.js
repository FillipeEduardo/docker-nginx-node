const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
const port = 3000;
const connection = mysql.createPool({
  host: "db",
  user: "root",
  password: "root",
  database: "fullcycle",
});

app.get("/", async (_, res) => {
  const query = "SELECT * FROM people";
  let [result] = await connection.execute(query);
  let itens = result.map((x) => `<li>${x.name}</li>`).join('')
  const titulo = '<h1>Full Cycle Rocks!</h1>'
  res.send(`${titulo}<ul>${itens}</ul>`);
});

app.listen(port, async () => {
  console.log(`Escutando na porta ${port}`);
  await criarTabelaPeople()
  await inserirRegistroPeople()
});

const criarTabelaPeople = async () => {
  const createQuery = 'CREATE TABLE IF NOT EXISTS people(id int NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255));'
  await connection.execute(createQuery);
}

const inserirRegistroPeople = async () => {
  const insertQuery = 'INSERT INTO people (name) VALUES (\'Fillipe\')'
  await connection.execute(insertQuery);
}