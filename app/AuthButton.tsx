"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
type PropsAuthButton = {
	className?: string;
};
export const AuthButton = ({ className, ...props }: PropsAuthButton) => {
	const { data: session } = useSession();
	console.log(session?.user);
	return (
		<>
			{session ? (
				<div className="flex items-center gap-2">
					<Image
						src={session?.user?.image!}
						className="rounded-full object-cover hidden sm:block"
						width={40}
						height={40}
						alt={session.user?.name!}
					/>
					<div className=" flex-col text-sm hidden lg:flex ">
						<p className="text-gray-300">
							Welcome {session?.user?.name}
						</p>
						<p className="text-gray-400 text-xs">
							{session?.user?.email!}
						</p>
					</div>
					<button
						className={`${className}`}
						onClick={() => signOut()}
						{...props}
					>
						Sign Out
					</button>
				</div>
			) : (
				<button
					className={`${className}`}
					onClick={() => signIn("google")}
				>
					Sign In
				</button>
			)}
		</>
	);
};
