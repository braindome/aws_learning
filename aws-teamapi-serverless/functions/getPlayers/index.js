import { sendResponse } from "../../responses";

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

export const handler = async (event, context) => {

    const {Items} = await db.scan({
        TableName: 'team-db'
    }).promise();

    return sendResponse(200, {success: true, team: Items})

};