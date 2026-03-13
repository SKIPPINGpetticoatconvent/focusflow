<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { _ } from 'svelte-i18n';
	import LanguageThemeToggle from '$lib/components/LanguageThemeToggle.svelte';
	import { setupI18n } from '$lib/i18n/setup';

	// Ensure i18n is initialized for SSR and CSR before using $_(...)
	setupI18n('en');

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<title>{$_('meta.title')}</title>
	<meta name="description" content={$_('meta.description')} />
</svelte:head>

<LanguageThemeToggle />
{@render children()}
