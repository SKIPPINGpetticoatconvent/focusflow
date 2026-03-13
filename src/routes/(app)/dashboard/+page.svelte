<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth';
	import PomodoroTimer from '$lib/components/PomodoroTimer.svelte';
	import TaskList from '$lib/components/TaskList.svelte';
	import StatsDashboard from '$lib/components/StatsDashboard.svelte';
	import AIAssistant from '$lib/components/AIAssistant.svelte';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let currentTime = $state('');

	function updateTime() {
		currentTime = new Date().toLocaleTimeString('en-US', { 
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

<div class="p-4 md:p-8 min-h-screen bg-gradient-to-br from-base-200/50 to-base-100">
	<!-- Header -->
	<div class="mb-8" in:fly={{ y: -20, duration: 500, easing: quintOut }}>
		<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
			<div>
				<h1 class="text-3xl md:text-4xl font-bold">
					Welcome back{$auth.user?.full_name ? `, ${$auth.user.full_name}` : ''}!
				</h1>
				<p class="text-base-content/60 mt-1 text-lg flex items-center gap-2">
					<span class="animate-pulse">✨</span>
					Let's be productive today.
				</p>
			</div>
			<div class="flex items-center gap-3">
				<div class="badge badge-lg badge-primary gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
					<span>{currentTime}</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Main Grid -->
	<div class="grid lg:grid-cols-3 gap-6">
		<!-- Left Column -->
		<div class="lg:col-span-2 space-y-6">
			<!-- Focus Timer Card -->
			<div 
				class="card bg-base-100 shadow-xl border border-base-200 overflow-hidden"
				in:fly={{ y: 20, duration: 500, delay: 100, easing: quintOut }}
			>
				<div class="card-body p-0">
					<div class="bg-gradient-to-r from-error/10 to-warning/10 p-6 border-b border-base-200">
						<div class="flex items-center gap-3">
							<div class="w-12 h-12 rounded-xl bg-error text-error-content flex items-center justify-center shadow-lg">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
							</div>
							<div>
								<h2 class="card-title text-xl">Focus Timer</h2>
								<p class="text-base-content/60 text-sm">Stay focused, achieve more</p>
							</div>
						</div>
					</div>
					<div class="p-6">
						<PomodoroTimer />
					</div>
				</div>
			</div>

			<!-- Tasks Card -->
			<div 
				class="card bg-base-100 shadow-xl border border-base-200 overflow-hidden"
				in:fly={{ y: 20, duration: 500, delay: 200, easing: quintOut }}
			>
				<div class="card-body p-0">
					<div class="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-b border-base-200">
						<div class="flex items-center gap-3">
							<div class="w-12 h-12 rounded-xl bg-primary text-primary-content flex items-center justify-center shadow-lg">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
							</div>
							<div>
								<h2 class="card-title text-xl">Tasks</h2>
								<p class="text-base-content/60 text-sm">Organize your work</p>
							</div>
						</div>
					</div>
					<div class="p-6">
						<TaskList />
					</div>
				</div>
			</div>
		</div>

		<!-- Right Column -->
		<div class="space-y-6">
			<!-- Statistics Card -->
			<div 
				class="card bg-base-100 shadow-xl border border-base-200 overflow-hidden"
				in:fly={{ y: 20, duration: 500, delay: 300, easing: quintOut }}
			>
				<div class="card-body p-0">
					<div class="bg-gradient-to-r from-info/10 to-success/10 p-6 border-b border-base-200">
						<div class="flex items-center gap-3">
							<div class="w-12 h-12 rounded-xl bg-info text-info-content flex items-center justify-center shadow-lg">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
							</div>
							<div>
								<h2 class="card-title text-xl">Statistics</h2>
								<p class="text-base-content/60 text-sm">Track your progress</p>
							</div>
						</div>
					</div>
					<div class="p-6">
						<StatsDashboard />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<AIAssistant />
