<script lang="ts">
	import { onDestroy } from 'svelte';
	import { get } from 'svelte/store';
	import { Chart, registerables } from 'chart.js';
	import { mockDb } from '$lib/mock/db';
	import { auth } from '$lib/stores/auth';
	import { currentWorkspace } from '$lib/stores/workspace';
	import { _, locale } from 'svelte-i18n';
	import type { DailyStats } from '$types';

	Chart.register(...registerables);

	let barCanvas: HTMLCanvasElement;
	let pieCanvas: HTMLCanvasElement;
	let barChart: Chart | null = null;
	let pieChart: Chart | null = null;
	let stats: DailyStats[] = $state([]);

	let userId = $derived($auth.user?.id || '');
	let workspaceId = $derived($currentWorkspace?.id || '');

	async function loadStats() {
		if (!userId || !workspaceId) return;
		stats = await mockDb.getStats(workspaceId, userId);
		createCharts();
	}

	function createCharts() {
		if (!barCanvas || !pieCanvas) return;
		const t = get(_);
		const currentLocale = (get(locale) || 'en') as string;

		if (barChart) barChart.destroy();
		if (pieChart) pieChart.destroy();

		const labels = stats.map(s => {
			const date = new Date(s.date);
			return date.toLocaleDateString(currentLocale === 'zh' ? 'zh-CN' : 'en-US', { weekday: 'short' });
		});

		barChart = new Chart(barCanvas, {
			type: 'bar',
			data: {
				labels,
				datasets: [{
					label: t('stats.focusMinutes'),
					data: stats.map(s => s.totalMinutes),
					backgroundColor: 'rgba(239, 68, 68, 0.5)',
					borderColor: 'rgb(239, 68, 68)',
					borderWidth: 1,
					borderRadius: 4
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: { display: false }
				},
				scales: {
					y: {
						beginAtZero: true,
						title: { display: true, text: t('stats.minutes') }
					}
				}
			}
		});

		const completedTasks = stats.reduce((sum, s) => sum + s.tasksCompleted, 0);
		const totalTasks = stats.reduce((sum, s) => sum + s.sessionsCompleted, 0);
		const pendingTasks = Math.max(0, totalTasks - completedTasks);

		pieChart = new Chart(pieCanvas, {
			type: 'doughnut',
			data: {
				labels: [t('stats.completed'), t('stats.inProgress')],
				datasets: [{
					data: [completedTasks, pendingTasks],
					backgroundColor: [
						'rgba(34, 197, 94, 0.7)',
						'rgba(59, 130, 246, 0.7)'
					],
					borderColor: [
						'rgb(34, 197, 94)',
						'rgb(59, 130, 246)'
					],
					borderWidth: 1
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						position: 'bottom'
					}
				}
			}
		});
	}

	$effect(() => {
		if (userId && workspaceId) {
			$locale;
			loadStats();
		}
	});

	onDestroy(() => {
		if (barChart) barChart.destroy();
		if (pieChart) pieChart.destroy();
	});
</script>

<div class="space-y-6">
	<div class="stats stats-vertical lg:stats-horizontal shadow">
		<div class="stat">
			<div class="stat-title text-error">{$_('stats.totalMinutes')}</div>
			<div class="stat-value text-error">
				{stats.reduce((sum, s) => sum + s.totalMinutes, 0)}
			</div>
		</div>
		<div class="stat">
			<div class="stat-title text-success">{$_('stats.sessions')}</div>
			<div class="stat-value text-success">
				{stats.reduce((sum, s) => sum + s.sessionsCompleted, 0)}
			</div>
		</div>
		<div class="stat">
			<div class="stat-title text-info">{$_('stats.tasksDone')}</div>
			<div class="stat-value text-info">
				{stats.reduce((sum, s) => sum + s.tasksCompleted, 0)}
			</div>
		</div>
	</div>

	<div class="space-y-4">
		<h4 class="text-sm font-medium">{$_('stats.weeklyFocus')}</h4>
		<div class="h-40">
			<canvas bind:this={barCanvas}></canvas>
		</div>
	</div>

	<div class="space-y-4">
		<h4 class="text-sm font-medium">{$_('stats.taskCompletion')}</h4>
		<div class="h-40">
			<canvas bind:this={pieCanvas}></canvas>
		</div>
	</div>
</div>
