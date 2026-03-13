<script lang="ts">
	import { pomodoroStore } from '$lib/stores/pomodoro';
	import { _ } from 'svelte-i18n';
	import { fade, scale } from 'svelte/transition';

	const modeColors: Record<string, string> = {
		work: 'stroke-error',
		short_break: 'stroke-success',
		long_break: 'stroke-info'
	};

	const modeGlowColors: Record<string, string> = {
		work: 'shadow-error/50',
		short_break: 'shadow-success/50',
		long_break: 'shadow-info/50'
	};

	const modeBgColors: Record<string, string> = {
		work: 'bg-error/10 text-error',
		short_break: 'bg-success/10 text-success',
		long_break: 'bg-info/10 text-info'
	};

	let minutes = $derived(Math.floor($pomodoroStore.timeRemaining / 60));
	let seconds = $derived($pomodoroStore.timeRemaining % 60);
	let timeDisplay = $derived(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
	let totalTime = $derived($pomodoroStore.mode === 'work' ? $pomodoroStore.settings.workDuration * 60 :
	               $pomodoroStore.mode === 'short_break' ? $pomodoroStore.settings.shortBreakDuration * 60 :
	               $pomodoroStore.settings.longBreakDuration * 60);
	let progress = $derived(totalTime > 0 ? ((totalTime - $pomodoroStore.timeRemaining) / totalTime) * 100 : 0);
	let circumference = $derived(2 * Math.PI * 120);
	let strokeDashoffset = $derived(circumference - (progress / 100) * circumference);

	let showCelebration = $state(false);

	$effect(() => {
		if ($pomodoroStore.timeRemaining === 0 && !$pomodoroStore.isRunning) {
			showCelebration = true;
			setTimeout(() => showCelebration = false, 1500);
		}
	});

	function handleStart() {
		pomodoroStore.start();
	}

	function handlePause() {
		pomodoroStore.pause();
	}

	function handleReset() {
		pomodoroStore.reset();
	}

	function handleSkip() {
		pomodoroStore.skip();
	}

	const modeLabelKey: Record<string, string> = {
		work: 'pomodoro.focusTime',
		short_break: 'pomodoro.shortBreak',
		long_break: 'pomodoro.longBreak'
	};
</script>

<div class="flex flex-col items-center py-2">
	<!-- Mode Badge -->
	{#key $pomodoroStore.mode}
		<div
			in:fade={{ duration: 200 }}
			class="badge mb-4 {modeBgColors[$pomodoroStore.mode]} border-0 px-3 py-2 text-xs font-medium"
		>
			{$_(modeLabelKey[$pomodoroStore.mode])}
		</div>
	{/key}

	<!-- Timer Circle -->
	<div
		class="relative h-48 w-48 rounded-full transition-all duration-500 sm:h-56 sm:w-56 {$pomodoroStore.isRunning ? 'scale-105 shadow-2xl ' + modeGlowColors[$pomodoroStore.mode] : 'shadow-lg'}"
	>
		<div class="absolute inset-0 rounded-full border-2 border-base-200/50"></div>
		
		<svg class="h-full w-full -rotate-90" viewBox="0 0 260 260">
			<circle cx="130" cy="130" r="120" fill="none" stroke="currentColor" stroke-width="8" class="text-base-300" />
			<circle cx="130" cy="130" r="120" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-dasharray={circumference} stroke-dashoffset={strokeDashoffset} class="{modeColors[$pomodoroStore.mode]} transition-all duration-1000 ease-linear" />
		</svg>
		
		<div class="absolute inset-3 flex flex-col items-center justify-center rounded-full bg-base-100 shadow-inner">
			<span class="font-mono text-4xl font-bold text-base-content/85 sm:text-5xl">
				{timeDisplay}
			</span>
			<span class="mt-1 text-xs text-base-content/50">
				{$pomodoroStore.isRunning ? $_('pomodoro.running') : $_('pomodoro.ready')}
			</span>
		</div>

		{#if showCelebration}
			<div
				in:scale={{ duration: 300, start: 0.5 }}
				out:scale={{ duration: 300, start: 0 }}
				class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
			>
				<div class="animate-bounce text-5xl">🎉</div>
			</div>
		{/if}
	</div>

	<!-- Control buttons -->
	<div class="mt-5 flex flex-wrap items-center justify-center gap-2" in:fade={{ delay: 200, duration: 200 }}>
		{#if !$pomodoroStore.isRunning}
			<button 
				class="btn btn-primary gap-2 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5" 
				onclick={handleStart}
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
				{$_('pomodoro.startFocus')}
			</button>
		{:else}
			<button 
				class="btn btn-warning gap-2 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5" 
				onclick={handlePause}
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
				{$_('pomodoro.pause')}
			</button>
		{/if}
		<button class="btn btn-ghost gap-2 rounded-xl hover:bg-base-200" onclick={handleReset}>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
			{$_('pomodoro.reset')}
		</button>
		<button class="btn btn-ghost gap-2 rounded-xl hover:bg-base-200" onclick={handleSkip}>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
			{$_('pomodoro.skip')}
		</button>
	</div>

	<!-- Stats -->
	<div class="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs" in:fade={{ delay: 300, duration: 200 }}>
		<div class="flex items-center gap-1.5 rounded-full bg-base-200/70 px-3 py-1.5">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-error" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
			<span class="font-medium">{$pomodoroStore.completedPomodoros}</span>
			<span class="text-base-content/50">{$_('pomodoro.completed')}</span>
		</div>
		<div class="flex items-center gap-1.5 rounded-full bg-base-200/70 px-3 py-1.5">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
			<span class="font-medium">{$pomodoroStore.settings.sessionsBeforeLongBreak - ($pomodoroStore.completedPomodoros % $pomodoroStore.settings.sessionsBeforeLongBreak)}</span>
			<span class="text-base-content/50">{$_('pomodoro.untilLongBreak')}</span>
		</div>
	</div>
</div>
