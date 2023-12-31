<script lang="ts">
	import OptionalNumber from './user_form_inputs/optional_number.svelte';
	import Number from './user_form_inputs/number.svelte';
	import Bool from './user_form_inputs/bool.svelte';
	import Select from './user_form_inputs/select.svelte';

	import { CheckMode, type Config } from '$lib/types/config';
	import { Lesson, type LessonTypingConfig } from '$lib/lessons/lesson';
	import {
		defaultLessonFormState,
		type FormUserValueReturn,
		type LessonFormState
	} from '$lib/types/forms';

	export let config: Config;
	export let lesson: Lesson;
	export let lessonConfigOverrides: Partial<LessonTypingConfig>;

	const state: LessonFormState = getFormState(lesson, config, lessonConfigOverrides);

	const wordModeChoices = [
		{
			key: 'words',
			label: config.lang.configCheckModeWords,
			value: CheckMode.WordRepeat
		},
		{ key: 'chars', label: config.lang.configCheckModeChars, value: CheckMode.Char }
	];

	let untilDataFn: () => FormUserValueReturn<number | null>;
	let randomDataFn: () => FormUserValueReturn<boolean>;
	let minQueueDataFn: () => FormUserValueReturn<number>;
	let wordBatchSizeDataFn: () => FormUserValueReturn<number>;
	let backspaceDataFn: () => FormUserValueReturn<boolean>;
	let checkModeDataFn: () => FormUserValueReturn<CheckMode>;

	export function getData(): [Lesson, Partial<LessonTypingConfig>] {
		const lessonOverrides: Partial<LessonTypingConfig> = {
			until: untilDataFn(),
			random: randomDataFn(),
			minQueue: minQueueDataFn(),
			wordBatchSize: wordBatchSizeDataFn(),
			backspace: backspaceDataFn(),
			checkMode: checkModeDataFn()
		};

		const userOverrides = config.lessonConfigOverrides(lessonOverrides);
		const result = Lesson.addWrappers(lesson.baseLesson(), userOverrides);

		return [result, lessonOverrides];
	}

	function getFormState(
		lesson: Lesson,
		config: Config,
		lessonConfigOverrides: Partial<LessonTypingConfig>
	): LessonFormState {
		let s: LessonFormState = {
			...defaultLessonFormState
		};

		for (const key in lessonConfigOverrides) {
			// @ts-ignore
			if (lessonConfigOverrides[key] !== undefined) {
				// @ts-ignore
				s[key] = lessonConfigOverrides[key];
			}
		}

		if (lesson.baseLesson().getType() !== 'wordlist') {
			s.random = 'disabled';
		}

		return s;
	}
</script>

<div class="grid">
	<OptionalNumber
		bind:getData={untilDataFn}
		{config}
		id="until"
		label={config.lang.configUntil}
		initialState={state.until}
		defaultValue={100}
		nullLabel={config.lang.infinite}
		min={1}
		step={1}
	/>

	<Bool
		bind:getData={randomDataFn}
		{config}
		id="random"
		label={config.lang.configRandom}
		onLabel={config.lang.on}
		offLabel={config.lang.off}
		initialState={Lesson.canRandomize(lesson.baseLesson().getType()) ? state.random : 'disabled'}
	/>

	<Number
		bind:getData={minQueueDataFn}
		{config}
		id="min-queue"
		label={config.lang.configMinQueue}
		initialState={state.minQueue}
		defaultValue={config.minQueue}
		min={1}
		max={100}
	/>

	<Number
		bind:getData={wordBatchSizeDataFn}
		{config}
		id="word-batch-size"
		label={config.lang.configWordBatchSize}
		initialState={state.wordBatchSize}
		defaultValue={config.wordBatchSize}
		min={1}
		max={100}
	/>

	<Bool
		bind:getData={backspaceDataFn}
		{config}
		id="accept-backspace"
		label={config.lang.configAcceptBackspace}
		onLabel={config.lang.accept}
		offLabel={config.lang.ignore}
		initialState={state.backspace}
	/>

	<Select
		bind:getData={checkModeDataFn}
		{config}
		id="check-mode"
		label={config.lang.configCheckMode}
		choices={wordModeChoices}
		initialValue={state.checkMode}
	/>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: min-content auto;
		column-gap: 2rem;
		row-gap: 1.3rem;
		margin: 1rem auto;
		min-width: 40ch;
		width: min-content;
	}
</style>
