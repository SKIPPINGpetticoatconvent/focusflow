<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/stores/auth';

	onMount(() => {
		const unsubscribe = auth.subscribe(state => {
			if (state.initialized) {
				if (state.user) {
					goto('/dashboard');
				} else {
					goto('/login');
				}
			}
		});

		auth.init();

		return unsubscribe;
	});
</script>

<div class="relative min-h-[100dvh] overflow-hidden px-4 py-6 sm:py-10">
	<!-- Background -->
	<div class="absolute inset-0 bg-gradient-to-br from-red-500/15 via-orange-400/10 to-yellow-500/15 dark:from-red-950/40 dark:via-orange-950/20 dark:to-yellow-950/40"></div>
	<div class="absolute inset-0 opacity-35">
		<div class="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-red-500/25 blur-3xl"></div>
		<div class="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" style="animation-delay: 1s;"></div>
	</div>

	<div class="relative z-10 mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-md items-center">
		<div class="w-full">
			<div class="mb-6 text-center sm:mb-8">
				<div class="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 to-orange-500 shadow-2xl">
					<span class="text-4xl">🍅</span>
				</div>
				<h1 class="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-4xl font-bold text-transparent">
					FocusFlow
				</h1>
				<p class="mt-2 text-base text-base-content/70 sm:text-lg">{$_('app.loadingFocusFlow')}</p>
			</div>

			<div class="card border border-base-200/70 bg-base-100/85 shadow-2xl backdrop-blur-xl">
				<div class="card-body items-center justify-center gap-4 py-8">
					<span class="loading loading-dots loading-lg text-primary"></span>
					<p class="text-sm text-base-content/60">
						{$_('app.loading')}
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
