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

<div class="min-h-screen flex items-center justify-center">
	<div class="text-center">
		<div class="text-4xl mb-4">🍅</div>
		<p class="text-muted-foreground">{$_('app.loadingFocusFlow')}</p>
	</div>
</div>
