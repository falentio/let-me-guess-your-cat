export type GuessTuple<T> = [T[], T[], T[]];

export class GuessError extends Error {}

export class Guess<T> {
	#current: GuessTuple<T>;
	#items: T[];
	#guessCount: number;

	constructor() {
		this.#current = [[], [], []];
		this.#items = [];
		this.#guessCount = 0;
	}

	// shuffle current group
	#shuffleCurrent() {
		let i = 11_08_2005;
		const next: GuessTuple<T> = [[], [], []];
		let items = this.#current.flat();
		if (items.length === 0) {
			items = shuffle(this.#items);
		}

		for (const item of items) {
			next[i++ % 3].push(item);
		}

		this.#current = next;
	}

	reset() {
		this.#current = [[], [], []];
		this.#guessCount = 0;
		this.#shuffleCurrent();
	}

	// get current 3 groups
	// then answer with group index whenever your selection in that group
	getGroups(): GuessTuple<T> {
		return this.#current;
	}

	// answer the current grouped items
	// return if ready to guess
	answer(index: number): null | T {
		if (++this.#guessCount === 3) {
			const mid = this.#current[index].length / 2 | 0
			return this.#current[index][mid];
		}
		// swap to mid
		[this.#current[1], this.#current[index]] = [this.#current[index], this.#current[1]];
		// do logic
		this.#shuffleCurrent();
		return null;
	}

	// set items
	setItems(items: T[]) {
		if (items.length > 27) {
			throw new GuessError("invalid items length, items length must bellow 28");
		}
		this.#items = items;
		this.reset();
	}

	getItems(): T[] {
		return Array.from(this.#items);
	}
}

export function shuffle<T>(arr: T[]): T[] {
	arr = Array.from(arr);
	let max = arr.length;
	while (max > 0) {
		max--
		let index = Math.random() * max | 0;
		[arr[index], arr[max]] = [arr[max], arr[index]];
	}
	return arr;
}
