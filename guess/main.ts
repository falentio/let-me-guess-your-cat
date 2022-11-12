import { Input } from "https://deno.land/x/cliffy@v0.25.2/prompt/mod.ts";
import { Guess, shuffle } from "./guess.ts";

const guess = new Guess();
guess.setItems([..."ABCDEFGHIJKLMNOPQRSTUVWXYZa"]);

let guessed: null | number = null;

while (guessed === null) {
	guess
		.getGroups()
		.map((group, i) => {
			console.log(`Group ${i + 1}: ${(group).join(", ")}`);
		});
	const input = await Input.prompt("which group your letter is");
	const index = parseInt(input) - 1;
	if (index > 2 || index < 0 || isNaN(index)) {
		console.log("unknown group");
		Deno.exit(1);
	}
	guessed = guess.answer(index);
}

console.log(`Your letter is: "${guessed}"`);
