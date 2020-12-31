import express from "express";
import mongooes from "mongoose";
import Cors from "cors";

import Cards from "./dbCards.js";

// App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://eric-dev-user:eric-dev-pass@cluster0.wr5lx.mongodb.net/tinderdb?retryWrites=true&w=majority`;

// Middlewares
app.use(express.json());
app.use(Cors());

// DB config
mongooes.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// API Endpoints
app.get("/", (req, res) => res.status(200).send("HELLO WORLD"));

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listener
app.listen(port, () => console.log(`lisenting on localhost: ${port}`));
