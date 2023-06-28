import Image from "next/image";
import React from "react";

import Link from "next/link";
import { AuthButton } from "./AuthButton";

export const Navbar = () => {
	return (
		<header className="border-b border-blue-500 bg-black/30">
			<div className="relative z-50 max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 h-20 backdrop-blur-md">
				<div className="flex items-center text-white justify-between w-full">
					{/* logo */}
					<Link href={"/"} className=" flex items-center ">
						<h1 className="ml-2 font-bold text-md sm:text-2xl">
							Productify{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to to-blue-500">
								IT
							</span>
						</h1>
					</Link>
					{/* Links */}
					<div className=" items-center space-x-2 hidden md:flex gap-8">
						<Link
							href="/billing"
							className="hover:text-white transition text-gray-300"
						>
							Billing Info
						</Link>
						<Link
							href="https://billing.stripe.com/p/login/eVa00xbTo4OvgYE288"
							className="hover:text-white transition text-gray-300"
						>
							Customer Portal
						</Link>
						<Link
							href="/rate"
							className="hover:text-white transition text-gray-300"
						>
							Rate Us
						</Link>
					</div>
					{/* Button  */}
					<AuthButton className="text-gray-100 bg-gray-100/10 py-2.5 px-4 rounded-md md:mr-6 text-sm font-semibold hover:bg-gray-100/20 hover:scale-110 transition-all duration-300 border border-indigo-800/20;" />
				</div>
			</div>
		</header>
	);
};
