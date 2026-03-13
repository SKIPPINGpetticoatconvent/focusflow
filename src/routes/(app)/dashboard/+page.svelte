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

<div class="min-h-screen bg-gradient-to-br from-base-200/40 via-base-100 to-base-100 p-4 md:p-8">
	<!-- Header -->
	<div class="mx-auto mb-8 max-w-[1280px]" in:fly={{ y: -20, duration: 500, easing: quintOut }}>
		<div class="flex flex-col gap-4 rounded-3xl border border-base-300/40 bg-base-100/70 px-5 py-5 backdrop-blur-xl md:flex-row md:items-center md:justify-between md:px-8">
			<div>
				<h1 class="text-3xl md:text-4xl font-bold tracking-tight">
					{$_('dashboard.welcomeBack')}{$auth.user?.full_name ? `, ${$auth.user.full_name}` : ''}!
				</h1>
				<p class="text-base-content/60 mt-1 text-lg flex items-center gap-2">
					<span class="animate-pulse">✨</span>
					{$_('dashboard.productive')}
				</p>
			</div>
			<div class="flex items-center gap-3">
				<div class="badge badge-lg border-0 bg-primary/15 text-primary gap-2 px-4">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
					<span>{currentTime}</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Main Grid -->
	<div class="mx-auto grid max-w-[1280px] gap-6 lg:grid-cols-3">
		<!-- Left Column -->
		<div class="lg:col-span-2 space-y-6">
			<!-- Focus Timer Card -->
			<div 
				class="card overflow-hidden border border-base-300/40 bg-base-100/80 shadow-xl backdrop-blur-sm"
				in:fly={{ y: 20, duration: 500, delay: 100, easing: quintOut }}
			>
				<div class="card-body p-0">
					<div class="border-b border-base-300/40 bg-gradient-to-r from-error/10 to-warning/10 p-6">
						<div class="flex items-center gap-3">
							<div class="w-12 h-12 rounded-2xl bg-error text-error-content flex items-center justify-center shadow-lg">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
							</div>
							<div>
								<h2 class="card-title text-xl">{$_('dashboard.focusTimer')}</h2>
								<p class="text-base-content/60 text-sm">{$_('dashboard.focusTimerDesc')}</p>
							</div>
						</div>
					</div>
					<div class="p-6">
						<PomodoroTimer />
					</div>
				</div>
			</div>

			<!-- Tasks Card (hover / focus expand) -->
			<div 
				class="group/card card overflow-hidden border border-base-300/40 bg-base-100/80 shadow-xl backdrop-blur-sm"
				in:fly={{ y: 20, duration: 500, delay: 200, easing: quintOut }}
			>
				<div class="card-body p-0">
					<div class="flex items-center justify-between border-b border-base-300/40 bg-gradient-to-r from-primary/10 to-secondary/10 p-6">
						<div class="flex items-center gap-3">
							<div class="w-12 h-12 rounded-2xl bg-primary text-primary-content flex items-center justify-center shadow-lg">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
							</div>
							<div>
								<h2 class="card-title text-xl">{$_('dashboard.tasks')}</h2>
								<p class="text-base-content/60 text-sm">{$_('dashboard.tasksDesc')}</p>
							</div>
						</div>
						<div class="flex items-center gap-2 text-xs text-base-content/50">
							<span class="hidden sm:inline">{$_('taskList.all')}</span>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover/card:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
						</div>
					</div>
					<div class="max-h-0 opacity-0 overflow-hidden transition-all duration-300 group-hover/card:max-h-[30rem] group-hover/card:opacity-100 group-focus-within/card:max-h-[30rem] group-focus-within/card:opacity-100">
						<div class="p-6">
							<TaskList />
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Column -->
		<div class="space-y-6">
			<!-- Statistics Card (hover / focus expand) -->
			<div 
				class="group/card card overflow-hidden border border-base-300/40 bg-base-100/80 shadow-xl backdrop-blur-sm"
				in:fly={{ y: 20, duration: 500, delay: 300, easing: quintOut }}
			>
				<div class="card-body p-0">
					<div class="flex items-center justify-between border-b border-base-300/40 bg-gradient-to-r from-info/10 to-success/10 p-6">
						<div class="flex items-center gap-3">
							<div class="w-12 h-12 rounded-2xl bg-info text-info-content flex items-center justify-center shadow-lg">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2V19m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
							</div>
							<div>
								<h2 class="card-title text-xl">{$_('dashboard.statistics')}</h2>
								<p class="text-base-content/60 text-sm">{$_('dashboard.statisticsDesc')}</p>
							</div>
						</div>
						<div class="flex items-center gap-2 text-xs text-base-content/50">
							<span class="hidden sm:inline">{$_('stats.totalMinutes')}</span>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover/card:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
						</div>
					</div>
					<div class="max-h-0 opacity-0 overflow-hidden transition-all duration-300 group-hover/card:max-h-[26rem] group-hover/card:opacity-100 group-focus-within/card:max-h-[26rem] group-focus-within/card:opacity-100">
						<div class="p-6">
							<StatsDashboard />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<AIAssistant />
