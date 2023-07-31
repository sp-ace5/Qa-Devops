const express = require("express");
const bots = require("./src/botsData");
const shuffle = require("./src/shuffle");
const path = require('path');
const Rollbar = require('rollbar');

const playerRecord = {
  wins: 0,
  losses: 0,
};
const app = express();

app.use(express.json());

app.use(express.static('public'));

const rollbar = new Rollbar({
  accessToken: 'YOUR_ROLLBAR_ACCESS_TOKEN',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const calculateTotalHealth = (robots) =>
  robots.reduce((total, { health }) => total + health, 0);

const calculateTotalAttack = (robots) =>
  robots
    .map(({ attacks }) =>
      attacks.reduce((total, { damage }) => total + damage, 0)
    )
    .reduce((total, damage) => total + damage, 0);


const calculateHealthAfterAttack = ({ playerDuo, compDuo }) => {
  const compAttack = calculateTotalAttack(compDuo);
  const playerHealth = calculateTotalHealth(playerDuo);
  const playerAttack = calculateTotalAttack(playerDuo);
  const compHealth = calculateTotalHealth(compDuo);

  return {
    compHealth: compHealth - playerAttack,
    playerHealth: playerHealth - compAttack,
  };
};

app.get("/api/robots", (req, res) => {
  try {
    res.status(200).send(botsArr);
  } catch (error) {
    rollbar.error('ERROR GETTING BOTS', error);
    res.sendStatus(400);
  }
});

app.get("/api/robots/shuffled", (req, res) => {
  try {
    let shuffled = shuffle(bots);
    res.status(200).send(shuffled);
  } catch (error) {
    rollbar.error('ERROR GETTING SHUFFLED BOTS', error);
    res.sendStatus(400);
  }
});

app.post("/api/duel", (req, res) => {
  try {
    const { compDuo, playerDuo } = req.body;

    const { compHealth, playerHealth } = calculateHealthAfterAttack({
      compDuo,
      playerDuo,
    });

    if (compHealth > playerHealth) {
      playerRecord.losses += 1;
      res.status(200).send("You lost!");
    } else {
      playerRecord.losses += 1;
      res.status(200).send("You won!");
    }
  } catch (error) {
    rollbar.error('ERROR DUELING', error);
    res.sendStatus(400);
  }
});

app.get("/api/player", (req, res) => {
  try {
    res.status(200).send(playerRecord);
  } catch (error) {
    rollbar.error('ERROR GETTING PLAYER STATS', error);
    res.sendStatus(400);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});