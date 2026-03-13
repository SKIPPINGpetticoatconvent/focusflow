<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { auth } from '$lib/stores/auth';
	import { workspaceStore } from '$lib/stores/workspace';
	import { taskStore } from '$lib/stores/tasks';
	import { currentWorkspace } from '$lib/stores/workspace';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
	let isLoading = $state(true);

	onMount(async () => {
		await auth.init();
		
		const unsubscribe = auth.subscribe(state => {
			if (state.initialized) {
				if (!state.user) {
					goto('/login');
				} else {
					workspaceStore.init();
				}
				isLoading = false;
			}
		});

		return unsubscribe;
	});

	$effect(() => {
		if ($currentWorkspace) {
			taskStore.init();
		}
	});

	const publicRoutes = ['/login', '/register', '/reset-password'];
	let isPublicRoute = $derived(publicRoutes.some(route => $page.url.pathname.startsWith(route)));
</script>

{#if isLoading}
	<div class="min-h-screen flex items-center justify-center">
		<div class="text-center">
			<div class="text-4xl mb-4 animate-bounce">🍅</div>
			<p class="text-muted-foreground">Loading...</p>
		</div>
	</div>
{:else if isPublicRoute}
	{@render children()}
{:else}
	<div class="flex min-h-screen">
		<Sidebar />
		<main class="flex-1 overflow-auto">
			{@render children()}
		</main>
	</div>
{/if}
