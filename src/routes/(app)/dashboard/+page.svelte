<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth';
	import PomodoroTimer from '$lib/components/PomodoroTimer.svelte';
	import TaskList from '$lib/components/TaskList.svelte';
	import StatsDashboard from '$lib/components/StatsDashboard.svelte';
	import AIAssistant from '$lib/components/AIAssistant.svelte';
	import { _, locale } from 'svelte-i18n';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let currentTime = $state('');

	function updateTime() {
		currentTime = new Date().toLocaleTimeString($locale === 'zh' ? 'zh-CN' : 'en-US', {
			hour: '2-digit', 
			minute: '2-digit',
			hour12: false 
		});
	}

	onMount(() => {
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	});
</script>

<div class="mx-auto max-w-6xl">
	<!-- Header -->
	<div class="mb-6" in:fly={{ y: -20, duration: 500, easing: quintOut }}>
		<div class="flex flex-col gap-3 rounded-2xl border border-base-300/40 bg-base-100/70 px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h1 class="text-2xl font-bold tracking-tight sm:text-3xl">
					{$_('dashboard.welcomeBack')}{$auth.user?.full_name ? `, ${$auth.user.full_name}` : ''}!
				</h1>
				<p class="text-base-content/60 mt-0.5 flex items-center gap-1.5 text-sm sm:text-base">
					<span class="animate-pulse">✨</span>
					{$_('dashboard.productive')}
				</p>
			</div>
			<div class="badge border-0 bg-primary/15 text-primary gap-2 px-3 py-2.5 text-sm">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
				<span>{currentTime}</span>
			</div>
		</div>
	</div>

	<!-- Main Grid -->
	<div class="grid gap-5 lg:grid-cols-3">
		<!-- Left Column -->
		<div class="lg:col-span-2 space-y-5">
			<!-- Focus Timer Card -->
			<div 
				class="card overflow-hidden rounded-2xl border border-base-300/40 bg-base-100/80 shadow-lg backdrop-blur-sm"
				in:fly={{ y: 20, duration: 500, delay: 100, easing: quintOut }}
			>
				<div class="card-body p-0">
					<div class="border-b border-base-300/40 bg-gradient-to-r from-error/8 to-warning/8 px-5 py-4">
						<div class="flex items-center gap-3">
							<div class="flex h-9 w-9 items-center justify-center rounded-xl bg-error text-error-content shadow">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
							</div>
							<div>
								<h2 class="text-base font-semibold">{$_('dashboard.focusTimer')}</h2>
								<p class="text-xs text-base-content/50">{$_('dashboard.focusTimerDesc')}</p>
							</div>
						</div>
					</div>
					<div class="p-5">
						<PomodoroTimer />
					</div>
				</div>
			</div>

			<!-- Tasks Card (hover / focus expand) -->
			<div 
				class="group/card card overflow-hidden rounded-2xl border border-base-300/40 bg-base-100/80 shadow-lg backdrop-blur-sm"
				in:fly={{ y: 20, duration: 500, delay: 200, easing: quintOut }}
			>
				<div class="card-body p-0">
					<div class="flex items-center justify-between border-b border-base-300/40 bg-gradient-to-r from-primary/8 to-secondary/8 px-5 py-4">
						<div class="flex items-center gap-3">
							<div class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-content shadow">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
							</div>
							<div>
								<h2 class="text-base font-semibold">{$_('dashboard.tasks')}</h2>
								<p class="text-xs text-base-content/50">{$_('dashboard.tasksDesc')}</p>
							</div>
						</div>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/40 transition-transform group-hover/card:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</div>
					<div class="max-h-0 opacity-0 overflow-hidden transition-all duration-300 group-hover/card:max-h-[32rem] group-hover/card:opacity-100 group-focus-within/card:max-h-[32rem] group-focus-within/card:opacity-100">
						<div class="p-5">
							<TaskList />
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Column -->
		<div class="space-y-5">
			<!-- Statistics Card (hover / focus expand) -->
			<div 
				class="group/card card overflow-hidden rounded-2xl border border-base-300/40 bg-base-100/80 shadow-lg backdrop-blur-sm"
				in:fly={{ y: 20, duration: 500, delay: 300, easing: quintOut }}
			>
				<div class="card-body p-0">
					<div class="flex items-center justify-between border-b border-base-300/40 bg-gradient-to-r from-info/8 to-success/8 px-5 py-4">
						<div class="flex items-center gap-3">
							<div class="flex h-9 w-9 items-center justify-center rounded-xl bg-info text-info-content shadow">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2V19m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
							</div>
							<div>
								<h2 class="text-base font-semibold">{$_('dashboard.statistics')}</h2>
								<p class="text-xs text-base-content/50">{$_('dashboard.statisticsDesc')}</p>
							</div>
						</div>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/40 transition-transform group-hover/card:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</div>
					<div class="max-h-0 opacity-0 overflow-hidden transition-all duration-300 group-hover/card:max-h-[28rem] group-hover/card:opacity-100 group-focus-within/card:max-h-[28rem] group-focus-within/card:opacity-100">
						<div class="p-5">
							<StatsDashboard />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<AIAssistant />
