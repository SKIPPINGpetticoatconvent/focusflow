<script lang="ts">
	import { onMount } from 'svelte';
	import { Languages, Moon, Settings, Sun } from 'lucide-svelte';
	import { initPreferences, locale, theme, toggleLocale, toggleTheme } from '$lib/stores/preferences';

	onMount(() => {
		initPreferences();
	});
</script>

<div class="group fixed right-4 top-4 z-[70]">
	<div class="relative">
		<div class="invisible absolute right-full top-1/2 mr-2 flex -translate-y-1/2 translate-x-1 items-center gap-1 rounded-full border border-base-300/70 bg-base-100/90 p-1 opacity-0 shadow-xl backdrop-blur transition-all duration-200 group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-x-0 group-focus-within:opacity-100">
			<button
				class="btn btn-circle btn-xs {$locale === 'zh' ? 'btn-primary' : 'btn-ghost bg-base-100'}"
				onclick={toggleLocale}
				title={$locale === 'zh' ? '切换到英文' : 'Switch to Chinese'}
				aria-label={$locale === 'zh' ? '切换到英文' : 'Switch to Chinese'}
			>
				<Languages class="h-3.5 w-3.5" />
			</button>
			<button
				class="btn btn-circle btn-xs {$theme === 'dark' ? 'btn-primary' : 'btn-ghost bg-base-100'}"
				onclick={toggleTheme}
				title={$theme === 'dark' ? '切换亮色主题' : '切换暗色主题'}
				aria-label={$theme === 'dark' ? '切换亮色主题' : '切换暗色主题'}
			>
				{#if $theme === 'dark'}
					<Sun class="h-3.5 w-3.5" />
				{:else}
					<Moon class="h-3.5 w-3.5" />
				{/if}
			</button>
		</div>
		<button
			class="btn btn-circle btn-xs border border-base-300/70 bg-base-100/90 shadow-lg transition-transform duration-200 group-hover:rotate-90"
			title="设置"
			aria-label="设置"
		>
			<Settings class="h-3.5 w-3.5" />
		</button>
	</div>
</div>
