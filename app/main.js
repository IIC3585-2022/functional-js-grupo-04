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

const pointsCalculator = (totalPts, movePts) => {
  const newScore = totalPts - movePts;
  return newScore < 0 ? -newScore : newScore;
};

const insertMoves = (player, moves) => {
  const mapMovesToValues = moves.map((move) => moveValue(move));
  let currentScore = player.points;
  mapMovesToValues.map((move) => {
    currentScore = pointsCalculator(currentScore, move);
    if (currentScore === 0) {
      return 0;
    }
    return currentScore;
  });
  return currentScore;
};

const playGame = (...args) => {
  const players = initGame(...args);
  console.log(welcomeLog(players));
};

playGame('Pepe', 'Lucía', 'María');
