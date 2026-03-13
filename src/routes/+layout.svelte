<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<title>FocusFlow - Smart Pomodoro Task Tracker</title>
	<meta name="description" content="A powerful productivity tool combining Pomodoro technique with AI-powered task management" />
</svelte:head>

{@render children()}
