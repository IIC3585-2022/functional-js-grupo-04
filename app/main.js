const _ = require('lodash');

const initGame = (...args) => args.map((name) => ({ name, points: 501 }));

const playerNames = (players) => players.map((player) => player.name);

const stringPlayerNames = (names) => names.reduce((a, b, i, array) => a + (i < array.length - 1 ? ', ' : ' y ') + b);

const playerNamesLog = _.flowRight([stringPlayerNames, playerNames]);

const welcomeLog = (players) => `Juego inicializado con jugadores ${playerNamesLog(players)}.`;

const playGame = (...args) => {
  const players = initGame(...args);
  console.log(welcomeLog(players));
};

playGame('Pepe', 'Lucía', 'María');
