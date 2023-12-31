import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// const dynamodb = new DynamoDBClient({
// 	region: process.env.AWS_REGION,
// 	credentials: {
// 		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
// 		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
// 	},
// });

const dynamodb = new DynamoDBClient({
	region: process.env.REGION,
	credentials: {
		accessKeyId: process.env.ACCESS_KEY_ID!,
		secretAccessKey: process.env.SECRET_ACCESS_KEY!,
	},
});

const docClient = DynamoDBDocumentClient.from(dynamodb);

export default docClient;
