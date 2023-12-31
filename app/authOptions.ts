import docClient from "@/app/dynamodb";
import { TCustomer } from "@/app/types";
import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2022-11-15",
});
export const authOptions: NextAuthOptions = {
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
			try {
				await stripe.customers
					.create({
						email: session.user?.email!,
						name: session.user?.name!,
					})
					.then(async (customer) => {
						session!.user!.id = customer.id;
						session!.user!.stripeCustomerId = customer.id;
						session!.user!.isActive = false;

						const createUserParmas = {
							TableName: process.env.TABLE_NAME,
							Item: {
								...customer,
								isActive: false,
							},
						};

						await docClient.send(new PutCommand(createUserParmas));
					});

				return session;
			} catch (error) {
				console.log(error);
				throw error;
			}
		},
	},
};
