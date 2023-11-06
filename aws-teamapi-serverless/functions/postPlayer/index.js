import { sendResponse } from "../../responses";

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

export const handler = async (event, context) => {
  const player = JSON.parse(event.body);

  const timestamp = new Date().getTime();

  player.playerId = `${timestamp}`

  try {
    await db
      .put({
        TableName: "team-db",
        Item: player,
      })
      .promise();

    return sendResponse(200, { success: true });
  } catch (error) {
    return sendResponse(500, { success: false });
  }
};
