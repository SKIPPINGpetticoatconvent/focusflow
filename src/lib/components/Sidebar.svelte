<script lang="ts">
	import { page } from '$app/stores';
	import { auth } from '$lib/stores/auth';
	import { workspaceStore, currentWorkspace } from '$lib/stores/workspace';
	import { _ } from 'svelte-i18n';
	import { slide } from 'svelte/transition';

	let showWorkspaceMenu = $state(false);
let collapsed = $state(false);

	const navItems = [
		{ 
			href: '/dashboard', 
			label: 'sidebar.dashboard',
			icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />'
		},
		{ 
			href: '/workspaces', 
			label: 'sidebar.workspaces',
			icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />'
		},
		{ 
			href: '/settings', 
			label: 'sidebar.settings',
			icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />'
		}
	];

	function isActive(href: string, currentPath: string): boolean {
		return currentPath.startsWith(href);
	}

	async function handleLogout() {
		await auth.logout();
	}
</script>

<aside class="sticky top-0 h-screen border-r border-base-300/40 bg-base-100/85 backdrop-blur-xl flex flex-col {collapsed ? 'w-16' : 'w-72'}">
	<!-- Logo -->
	<div class="flex items-center justify-between gap-2 px-3 py-3">
		{#if collapsed}
			<a href="/dashboard" class="flex w-full items-center justify-center">
				<div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-error to-warning text-error-content shadow-lg">
					<span class="text-2xl">🍅</span>
				</div>
			</a>
		{:else}
			<a href="/dashboard" class="flex items-center gap-3 group">
				<div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-error to-warning text-error-content shadow-lg group-hover:scale-105 transition-transform">
					<span class="text-2xl">🍅</span>
				</div>
				<div class="whitespace-nowrap">
					<h1 class="text-xl font-bold gradient-text">FocusFlow</h1>
					<p class="text-xs text-base-content/50">{$_('sidebar.productTracker')}</p>
				</div>
			</a>
		{/if}
		<button
			class="btn btn-ghost btn-xs rounded-full border border-base-300/60 bg-base-100/80"
			onclick={() => collapsed = !collapsed}
			aria-label="Toggle sidebar"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={collapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'} />
			</svg>
		</button>
	</div>

	<!-- Workspace Selector -->
	{#if $currentWorkspace && !collapsed}
		<div class="px-4 pb-4">
			<div class="rounded-2xl border border-base-300/40 bg-base-200/45 p-1.5">
				<button
					onclick={() => showWorkspaceMenu = !showWorkspaceMenu}
					class="w-full flex items-center justify-between rounded-xl p-3 hover:bg-base-100/70 transition-all"
				>
					<div class="flex items-center gap-3">
						<div class="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
						</div>
						<span class="font-medium truncate">{$currentWorkspace.name}</span>
					</div>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform {showWorkspaceMenu ? 'rotate-180' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
				</button>
				{#if showWorkspaceMenu}
					<div transition:slide class="mt-1 space-y-1 px-1">
						{#each $workspaceStore.workspaces as workspace}
							<button
								onclick={() => { workspaceStore.selectWorkspace(workspace.id); showWorkspaceMenu = false; }}
								class="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all {$currentWorkspace.id === workspace.id ? 'bg-primary/90 text-primary-content shadow-md' : 'hover:bg-base-100/80'}"
							>
								<div class="w-2 h-2 rounded-full {$currentWorkspace.id === workspace.id ? 'bg-primary-content' : 'bg-base-content/30'}"></div>
								{workspace.name}
							</button>
						{/each}
						<a href="/workspaces" class="flex items-center gap-3 px-3 py-2 text-sm text-base-content/60 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
							{$_('sidebar.newWorkspace')}
						</a>
					</div>
				{/if}
			</div>
		</div>
	{/if}

	<!-- Navigation -->
	<nav class="flex-1 px-1 py-2 space-y-1">
		{#if !collapsed}
			<p class="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-base-content/40">{$_('common.menu')}</p>
		{/if}
		{#each navItems as item}
			<a
				href={item.href}
				class="flex items-center {collapsed ? 'justify-center' : 'gap-3 px-3'} rounded-xl border py-3 transition-all group {isActive(item.href, $page.url.pathname) ? 'border-primary/30 bg-primary/90 text-primary-content shadow-lg shadow-primary/30' : 'border-transparent hover:border-base-300/40 hover:bg-base-200/60'}"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					{@html item.icon}
				</svg>
				{#if !collapsed}
					<span class="font-medium">{$_(item.label)}</span>
					{#if isActive(item.href, $page.url.pathname)}
						<div class="ml-auto h-2 w-2 rounded-full bg-primary-content animate-pulse"></div>
					{/if}
				{/if}
			</a>
		{/each}
	</nav>

	<!-- User Section -->
	<div class="border-t border-base-300/40 p-3">
		{#if $auth.user && !collapsed}
			<div class="mb-3 flex items-center gap-3 rounded-2xl border border-base-300/40 bg-base-200/45 p-3">
				{#if $auth.user.avatar_url}
					<div class="avatar">
						<div class="w-10 rounded-full ring-2 ring-base-100">
							<img src={$auth.user.avatar_url} alt="" />
						</div>
					</div>
				{:else}
					<div class="avatar placeholder">
						<div class="w-10 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-content ring-2 ring-base-100">
							<span class="text-sm font-bold">{$auth.user.email?.charAt(0).toUpperCase() || 'U'}</span>
						</div>
					</div>
				{/if}
				<div class="min-w-0 flex-1">
					<p class="truncate text-sm font-semibold">{$auth.user.full_name || $_('common.user')}</p>
					<p class="truncate text-xs text-base-content/50">{$auth.user.email}</p>
				</div>
			</div>
		{/if}
		<button
			class="btn btn-ghost w-full justify-center gap-2 rounded-xl hover:bg-error/10 hover:text-error group {collapsed ? 'px-0' : ''}"
			onclick={handleLogout}
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
			{#if !collapsed}
				{$_('common.logout')}
			{/if}
		</button>
	</div>
</aside>
