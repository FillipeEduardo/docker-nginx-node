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

app.listen(port,() => {
  console.log(`Escutando na porta ${port}`);
});
