import Image from "next/image";
import { Navbar } from "./Navbar";

export default function Home() {
	return (
		<>
			<Navbar />
			<main className="flex min-h-screen flex-col items-center justify-between p-24">
				<h1>Auth test</h1>
			</main>
		</>
	);
}
