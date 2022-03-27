const _ = require('lodash');

const initGame = (...args) => args.map((name) => ({ name, points: 501 }));

const playerNames = (players) => players.map((player) => player.name);

const stringPlayerNames = (names) => names.reduce((a, b, i, array) => a + (i < array.length - 1 ? ', ' : ' y ') + b);

const playerNamesLog = _.flowRight([stringPlayerNames, playerNames]);

const welcomeLog = (players) => `Juego inicializado con jugadores ${playerNamesLog(players)}.`;

const moveValue = (move) => {
  if (move instanceof Array) {
    return _.multiply(...move);
  }
  return move === 'SB' ? 25 : 50;
};

const applyMove = (score, move) => (score === 0 ? 0 : Math.abs(score - move));

const insertMoves = (player, moves) => {
  const mapMovesToValues = moves.map((move) => moveValue(move));
  const currentScore = player.points;
  const finalValue = mapMovesToValues.reduce((score, move) => applyMove(score, move), currentScore);
  return finalValue;
};

const playGame = (...args) => {
  const players = initGame(...args);
  console.log(welcomeLog(players));
};

playGame('Pepe', 'Lucía', 'María');

console.log(insertMoves({ name: 'Felipe', points: 100 }, [[1, 20], [2, 15], [3, 15]]));
