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
			const name = session.user?.name;
			const email = session.user?.email;
			try {
				const createUserParmas = {
					TableName: process.env.TABLE_NAME,
					Item: {
						email: email,
						name: name,
						isActive: false,
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
