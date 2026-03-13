<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { _ } from 'svelte-i18n';
	import LanguageThemeToggle from '$lib/components/LanguageThemeToggle.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<title>{$_('meta.title')}</title>
	<meta name="description" content={$_('meta.description')} />
</svelte:head>

<LanguageThemeToggle />
{@render children()}
