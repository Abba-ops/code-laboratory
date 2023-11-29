import express from "express";
import bodyParser from "body-parser";
import jokes from "./jokes.js";

const app = express();
const port = 3000;
const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";

app.use(bodyParser.urlencoded({ extended: true }));

// 1. GET a random joke
app.get("/random", (req, res) => {
  const random = Math.floor(Math.random() * jokes.length);
  res.json(jokes[random]);
});

// 2. GET a specific joke
app.get("/jokes/:id", (req, res) => {
  const id = Number(req.params.id);
  const joke = jokes.find((joke) => joke.id === id);
  res.json(joke);
});

// 3. GET jokes by filtering on the joke type
app.get("/filter", (req, res) => {
  const filtered = jokes.filter((joke) => joke.jokeType === req.query.type);
  res.json(filtered);
});

// 4. POST a new joke
app.post("/jokes", (req, res) => {
  const joke = {
    id: jokes.length + 1,
    jokeText: req.body.text,
    jokeType: req.body.type,
  };
  jokes.push(joke);
  res.json(joke);
});

// 5. PUT a joke
app.put("/jokes/:id", (req, res) => {
  const id = Number(req.params.id);
  const joke = jokes.find((joke) => joke.id === id);
  joke.jokeText = req.body.text;
  joke.jokeType = req.body.type;
  res.json(joke);
});

// 6. PATCH a joke
app.patch("/jokes/:id", (req, res) => {
  const id = Number(req.params.id);
  const joke = jokes.find((joke) => joke.id === id);
  joke.jokeText = req.body.text || joke.jokeText;
  joke.jokeType = req.body.type || joke.jokeType;
  res.json(joke);
});

// 7. DELETE Specific joke
app.delete("/jokes/:id", (req, res) => {
  const id = Number(req.params.id);
  const jokeIndex = jokes.findIndex((joke) => joke.id === id);
  if (jokeIndex !== -1) {
    jokes.splice(jokeIndex, 1);
    res.json(jokes);
  } else {
    res.status(404).json({ error: "Joke not found" });
  }
});

// 8. DELETE All jokes
app.delete("/all", (req, res) => {
  const userKey = req.query.key;
  if (userKey === masterKey) {
    jokes = [];
    res.sendStatus(200);
  } else {
    res
      .status(404)
      .json({ error: "You are not authorized to perform this action" });
  }
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
