const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost/TodoListDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully MongoDB Connected..."))
  .catch((err) => console.log(err));

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

const port = 5000;

app.listen(port, () => console.log(`{Server started on port ${port}}`));
