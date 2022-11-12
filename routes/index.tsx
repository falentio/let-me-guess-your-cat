import { Head } from "$fresh/runtime.ts";
import Guess from "../islands/Guess.tsx";

export default function Home() {
	return (
		<>
			<Head>
				<title>3 steps of guessing your selected cat :)</title>
				<style>
					{`
					@import url('https://fonts.googleapis.com/css2?family=Abel&display=swap');

					html {
						font-family: 'Abel', sans-serif;
					}
				`}
				</style>
			</Head>
			<div class="p-4 mx-auto max-w-screen-md">
				<Guess />
			</div>
		</>
	);
}
