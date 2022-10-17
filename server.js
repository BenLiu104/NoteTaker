
const express = require("express");
const api = require("./route/index")
const { clog } = require('./middleware/clog');
const PORT = process.env.PORT || 3001;

const path = require('path');
const app = express();

app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/api', api);



app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} `)
);
