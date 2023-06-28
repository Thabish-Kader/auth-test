import docClient from "@/app/dynamodb";
import { TCustomer } from "@/app/types";
import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async session({ session }) {
			const queryUserParams = {
				TableName: process.env.TABLE_NAME,
				KeyConditionExpression: "email = :email",
				ExpressionAttributeValues: {
					":email": session.user?.email!,
				},
			};

			const existingUser = await docClient.send(
				new QueryCommand(queryUserParams)
			);

			const customers = existingUser.Items as TCustomer[];

			if (customers.length > 0) {
				session.user!.id = customers[0].id;
				session.user!.stripeCustomerId = customers[0].id;
				session.user!.isActive = customers[0].isActive;
				session.user!.subscriptionId = customers[0].subscriptionId;
				return session;
			}

			const email = session.user?.email!;
			try {
				const createUserParmas = {
					TableName: process.env.TABLE_NAME,
					Item: {
						email: email,
						stripeCustomerId: "123",
						isActive: false,
						subscriptionId: "456",
					},
				};
				await docClient.send(new PutCommand(createUserParmas));
			} catch (error) {
				console.log(error);
			}
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
