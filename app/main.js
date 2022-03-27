const _ = require('lodash');
const prompt = require('prompt-sync')({ sigint: true });

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

const playerLog = (player) => `Ingrese lanzamientos de ${player.name}: `;

const promptMessage = () => {
  const playerGame = prompt('> ');
  const cleanPlayerGame = playerGame.replace(/'/g, '"');
  return cleanPlayerGame;
};

const parseMessage = (message) => {
  const parsedArray = JSON.parse(message);
  return parsedArray;
};

const currentPointsMessage = (currentPoints, player) => (currentPoints === 0 ? `${player.name} queda con 0 puntos y gana el juego. Felicitaciones ${player.name} !!` : `${player.name} queda con ${currentPoints}`);

const playTurn = _.flowRight([parseMessage, promptMessage]);

const playGame = (...args) => {
  const players = initGame(...args);
  console.log(welcomeLog(players));
  while (!_.some(players, { points: 0 })) {
    players.map((player) => {
      console.log(playerLog(player));
      const move = playTurn();
      const currentPoints = insertMoves(player, move);
      console.log(currentPointsMessage(currentPoints, player));
      return { name: player.name, points: currentPoints };
    });
  }
};

playGame('Pepe', 'Lucía', 'María');
