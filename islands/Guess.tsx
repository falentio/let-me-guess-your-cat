import { useEffect, useMemo, useReducer, useState } from "preact/hooks";
import type { GuessTuple } from "../guess/guess.ts";
import { Guess, shuffle } from "../guess/guess.ts";

interface GuessProps {
}

export default function GuessComponent(props: GuessProps) {
	const [images, setImages] = useState<string[]>([]);
	const [result, setResult] = useState("");

	useEffect(() => {
		result && setImages([]);
	}, [result]);

	return (
		<div class="flex flex-col space-y-2 w-full">
			{!result && !images.length && <ImagePicker setImages={setImages} />}
			{!result && images.length > 0 && <GroupChooser images={images} setResult={setResult} />}

			{result && (
				<div class="mx-auto flex flex-col items-center gap-4">
					<span class="text-5xl">Here is your cats sir</span>
					<span>
						Pardon me if it incorrect, I will incorrectly guess your cats when you got
						lie in one off 3 previous questions.
					</span>
					<div class="h-36 w-36">
						<img
							key={result}
							src={`//kucing.falentio.com/seed/${result}/100`}
							class="object-cover rounded-full bg-gray-800 w-full h-full"
						/>
					</div>
					<button
						class="h-12 w-max bg-blue-400 p-2 rounded shadow"
						onClick={() => {
							setImages([]);
							setResult("");
						}}
					>
						New Game
					</button>
				</div>
			)}
		</div>
	);
}

function ImagePicker(props: { setImages(images: string[]) }) {
	const [images, setImages] = useState<string[]>([]);
	const randomImages = () => {
		setImages(Array.from({ length: 21 }).map(() => Math.random().toString(36).slice(-10)));
	};
	useEffect(() => {
		randomImages();
	}, []);

	return (
		<div class="flex flex-col space-y-4">
			<span class="text-5xl">
				Setup your cats lineup
			</span>
			<span>
				*Please memorize 1 of them
			</span>
			<div class="grid grid-cols-3 md:grid-cols-7 gap-3 w-max mx-auto">
				{images.map((i) => (
					<div class="w-24 h-24">
						<img
							key={i}
							src={`//kucing.falentio.com/seed/${i}/100`}
							class="object-cover rounded-full bg-gray-800 w-full h-full"
						/>
					</div>
				))}
			</div>
			<button
				class="w-full p-2 border border-gray-700 bg-blue-400"
				onClick={() => randomImages()}
			>
				Randomize
			</button>
			<button
				class="w-full p-2 border border-gray-700 bg-blue-400"
				onClick={() => props.setImages(images)}
			>
				Ok
			</button>
		</div>
	);
}

function GroupChooser({ images, setResult }: { images: string[]; setResult(s: string) }) {
	const guess = useMemo(() => new Guess<string>(), []);
	const [answer, setAnswer] = useState<null | string>(null);
	const [groups, setGroups] = useState<GuessTuple<string>>([[], [], []]);

	useState(() => guess.setItems(images), []);
	useEffect(() => {
		setGroups(guess.getGroups());
	}, []);
	useEffect(() => {
		answer && setResult(answer);
	}, [answer]);

	return (
		<div class="w-full flex flex-col gap-4">
			<span class="text-5xl">
				Which groups your cats are?
			</span>
			<span>
				*click the box
			</span>
			<div class="flex flex-row md:flex-col justify-center w-full gap-4">
				{groups.map((group, groupId) => (
					<button
						class="p-4 flex flex-wrap flex-row justify-center gap-2 shadow rounded border-2 border-gray-700 hover:bg-blue-300 focus:bg-blue-200"
						onClick={() => {
							setAnswer(guess.answer(groupId));
							setGroups(guess.getGroups());
						}}
					>
						<span class="text-lg">Box {groupId + 1}</span>
						{shuffle(group).map((i) => (
							<div class="w-20 h-20">
								<img
									key={i}
									src={`//kucing.falentio.com/seed/${i}/100`}
									class="object-cover rounded-full bg-gray-800 w-full h-full"
								/>
							</div>
						))}
					</button>
				))}
			</div>
		</div>
	);
}
