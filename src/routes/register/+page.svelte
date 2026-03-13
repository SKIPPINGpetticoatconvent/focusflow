<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/stores/auth';
	import { get } from 'svelte/store';
	import { _ } from 'svelte-i18n';

	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let error = $state('');
	let isLoading = $state(false);

	async function handleRegister() {
		if (!email || !password || !confirmPassword) {
			error = get(_)('register.errorFill');
			return;
		}

		if (password !== confirmPassword) {
			error = get(_)('register.errorMismatch');
			return;
		}

		if (password.length < 6) {
			error = get(_)('register.errorLength');
			return;
		}

		isLoading = true;
		error = '';

		const result = await auth.register(email, password);
		
		if (result.success) {
			goto('/dashboard');
		} else {
			error = result.error || get(_)('register.errorRegister');
		}

		isLoading = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleRegister();
		}
	}
</script>

<div class="relative min-h-[100dvh] overflow-hidden px-4 py-6 sm:py-10">
	<!-- Animated Background -->
	<div class="absolute inset-0 bg-gradient-to-br from-red-500/12 via-orange-400/8 to-yellow-500/12 dark:from-red-950/30 dark:via-orange-950/15 dark:to-yellow-950/30"></div>
	<div class="absolute inset-0 opacity-25">
		<div class="absolute top-1/4 right-1/4 h-48 w-48 rounded-full bg-orange-500/25 blur-3xl animate-pulse sm:h-64 sm:w-64"></div>
		<div class="absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full bg-yellow-500/20 blur-3xl animate-pulse sm:h-80 sm:w-80" style="animation-delay: 1.5s;"></div>
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
				<p class="mt-1.5 text-sm text-base-content/60 sm:text-base">{$_('register.subtitle')}</p>
			</div>

			<!-- Register Card -->
			<div class="card rounded-2xl border border-base-200/60 bg-base-100/85 shadow-xl backdrop-blur-xl">
				<div class="card-body p-5 sm:p-7">
				<h2 class="text-center text-xl font-bold">{$_('register.title')}</h2>
				<p class="text-base-content/50 text-center text-sm mb-5">{$_('register.description')}</p>
				
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
							autocomplete="new-password"
							bind:value={password}
							onkeydown={handleKeydown}
							disabled={isLoading}
						/>
						<svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
						</svg>
					</div>
				</div>

				<div class="form-control mt-4">
					<label class="label" for="confirmPassword">
						<span class="label-text font-medium">{$_('register.confirmPassword')}</span>
					</label>
					<div class="relative">
						<input
							id="confirmPassword"
							type="password"
							placeholder="••••••••"
							class="input input-bordered w-full pl-12 bg-base-200/50 focus:bg-base-200 transition-colors"
							autocomplete="new-password"
							bind:value={confirmPassword}
							onkeydown={handleKeydown}
							disabled={isLoading}
						/>
						<svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
						</svg>
					</div>
				</div>

				<div class="form-control mt-6">
					<button
						class="btn btn-primary w-full gap-2 rounded-xl shadow-md shadow-primary/20"
						onclick={handleRegister} 
						disabled={isLoading}
					>
						{#if isLoading}
							<span class="loading loading-spinner loading-sm"></span>
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
							</svg>
						{/if}
						{isLoading ? $_('common.createAccountLoading') : $_('common.createAccount')}
					</button>
				</div>

				<p class="text-sm text-base-content/50 text-center mt-4">
					{$_('register.alreadyHave')} 
					<a href="/login" class="link link-primary font-medium">{$_('register.goSignIn')}</a>
				</p>
			</div>
		</div>

		<!-- Back Link -->
		<p class="text-center text-sm text-base-content/60 mt-6">
			<a href="/login" class="inline-flex items-center gap-1 hover:gap-2 transition-all">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
				</svg>
				{$_('common.backLogin')}
			</a>
		</p>
		</div>
	</div>
</div>
