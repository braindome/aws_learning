console.log("Loading function");

var team = [
  {
    playerId: 1234,
    name: "Ella Johansson",
    role: "Goalkeeper",
    age: 25,
    height: 175,
    weight: 70,
  },
  {
    playerId: 5678,
    name: "Oscar Karlsson",
    role: "Defender",
    age: 29,
    height: 185,
    weight: 80,
  },
  {
    playerId: 9876,
    name: "Isabella Nilsson",
    role: "Midfielder",
    age: 22,
    height: 168,
    weight: 65,
  },
  {
    playerId: 4321,
    name: "Lucas Lindberg",
    role: "Defender",
    age: 26,
    height: 182,
    weight: 78,
  },
  {
    playerId: 6543,
    name: "Liam Andersson",
    role: "Forward",
    age: 31,
    height: 177,
    weight: 75,
  },
  {
    playerId: 8765,
    name: "Astrid Söderström",
    role: "Midfielder",
    age: 20,
    height: 170,
    weight: 68,
  },
  {
    playerId: 3456,
    name: "Elias Eriksson",
    role: "Defender",
    age: 18,
    height: 179,
    weight: 76,
  },
  {
    playerId: 7890,
    name: "Maja Hedström",
    role: "Midfielder",
    age: 24,
    height: 163,
    weight: 63,
  },
  {
    playerId: 2345,
    name: "Alexander Larsson",
    role: "Defender",
    age: 27,
    height: 184,
    weight: 79,
  },
  {
    playerId: 5432,
    name: "Olivia Lindström",
    role: "Forward",
    age: 30,
    height: 173,
    weight: 72,
  },
  {
    playerId: 6789,
    name: "Hugo Nyström",
    role: "Goalkeeper",
    age: 21,
    height: 188,
    weight: 82,
  },
];

export const handler = async (event, context) => {
  const playerId = event.pathParameters.playerId;

  const idInt = parseInt(playerId);

  const player = team.find(player => player.playerId === idInt);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ player }),
  };
};