<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/stores/auth';
	import { get } from 'svelte/store';
	import { _ } from 'svelte-i18n';

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let isLoading = $state(false);

	async function handleLogin() {
		if (!email || !password) {
			error = get(_)('login.errorFill');
			return;
		}

		isLoading = true;
		error = '';

		const result = await auth.login(email, password);
		
		if (result.success) {
			goto('/dashboard');
		} else {
			error = result.error || get(_)('login.errorLogin');
		}

		isLoading = false;
	}

	async function handleRegister() {
		if (!email || !password) {
			error = get(_)('login.errorFill');
			return;
		}

		isLoading = true;
		error = '';

		const result = await auth.register(email, password);
		
		if (result.success) {
			goto('/dashboard');
		} else {
			error = result.error || get(_)('login.errorRegister');
		}

		isLoading = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleLogin();
		}
	}
</script>

<div class="relative min-h-[100dvh] overflow-hidden px-4 py-6 sm:py-10">
	<!-- Animated Background -->
	<div class="absolute inset-0 bg-gradient-to-br from-red-500/12 via-orange-400/8 to-yellow-500/12 dark:from-red-950/30 dark:via-orange-950/15 dark:to-yellow-950/30"></div>
	<div class="absolute inset-0 opacity-25">
		<div class="absolute top-1/4 left-1/4 h-48 w-48 rounded-full bg-red-500/25 blur-3xl animate-pulse sm:h-64 sm:w-64"></div>
		<div class="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl animate-pulse sm:h-80 sm:w-80" style="animation-delay: 1s;"></div>
	</div>
	
	<div class="relative z-10 mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-sm items-center sm:max-w-md">
		<div class="w-full">
			<div class="mb-6 text-center">
				<div class="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 shadow-xl transition-transform duration-300 hover:scale-105">
					<span class="text-3xl">🍅</span>
				</div>
				<h1 class="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-3xl font-bold text-transparent">
					FocusFlow
				</h1>
				<p class="mt-1.5 text-sm text-base-content/60 sm:text-base">{$_('login.subtitle')}</p>
			</div>

			<!-- Login Card -->
			<div class="card rounded-2xl border border-base-200/60 bg-base-100/85 shadow-xl backdrop-blur-xl">
				<div class="card-body p-5 sm:p-7">
				<h2 class="text-center text-xl font-bold">{$_('login.title')}</h2>
				<p class="text-base-content/50 text-center text-sm mb-5">{$_('login.description')}</p>
				
				{#if error}
					<div class="alert alert-error mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
						<span>{error}</span>
					</div>
				{/if}

				<div class="form-control">
					<label class="label" for="email">
						<span class="label-text font-medium">{$_('common.email')}</span>
					</label>
					<div class="relative">
						<input
							id="email"
							type="email"
							placeholder="your@email.com"
							class="input input-bordered w-full pl-12 bg-base-200/50 focus:bg-base-200 transition-colors"
							autocomplete="email"
							bind:value={email}
							onkeydown={handleKeydown}
							disabled={isLoading}
						/>
						<svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
					</div>
				</div>
				
				<div class="form-control mt-4">
					<label class="label" for="password">
						<span class="label-text font-medium">{$_('common.password')}</span>
					</label>
					<div class="relative">
						<input
							id="password"
							type="password"
							placeholder="••••••••"
							class="input input-bordered w-full pl-12 bg-base-200/50 focus:bg-base-200 transition-colors"
							autocomplete="current-password"
							bind:value={password}
							onkeydown={handleKeydown}
							disabled={isLoading}
						/>
						<svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
						</svg>
					</div>
				</div>

				<div class="form-control mt-6">
					<button
						class="btn btn-primary w-full gap-2 rounded-xl shadow-md shadow-primary/20"
						onclick={handleLogin} 
						disabled={isLoading}
					>
						{#if isLoading}
							<span class="loading loading-spinner loading-sm"></span>
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
							</svg>
						{/if}
						{isLoading ? $_('common.signInLoading') : $_('common.signIn')}
					</button>
				</div>

				<div class="divider my-3 text-xs text-base-content/40">{$_('common.or')}</div>

				<div class="form-control">
					<button
						class="btn btn-outline w-full gap-2 rounded-xl"
						onclick={handleRegister} 
						disabled={isLoading}
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
						</svg>
						{$_('common.createAccount')}
					</button>
				</div>

				<p class="text-center text-xs text-base-content/40 mt-4">
					<span class="inline-flex items-center gap-1">
						<span class="w-2 h-2 rounded-full bg-success animate-pulse"></span>
						{$_('login.demo')}
					</span>
				</p>
				</div>
			</div>

			<!-- Back Link -->
			<p class="text-center text-sm text-base-content/60 mt-6">
				<a href="/" class="inline-flex items-center gap-1 hover:gap-2 transition-all">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
					{$_('common.backHome')}
				</a>
			</p>
		</div>
	</div>
</div>
