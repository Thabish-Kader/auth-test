import docClient from "@/app/dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
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
			const createUserParmas = {
				TableName: process.env.TABLE_NAME,
				Item: {
					email: "test@email.com",
					name: "testman",
					isActive: false,
				},
			};

			await docClient.send(new PutCommand(createUserParmas));
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
