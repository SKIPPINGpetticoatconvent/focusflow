<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/stores/auth';

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let isLoading = $state(false);

	async function handleLogin() {
		if (!email || !password) {
			error = 'Please fill in all fields';
			return;
		}

		isLoading = true;
		error = '';

		const result = await auth.login(email, password);
		
		if (result.success) {
			goto('/dashboard');
		} else {
			error = result.error || 'Login failed';
		}

		isLoading = false;
	}

	async function handleRegister() {
		if (!email || !password) {
			error = 'Please fill in all fields';
			return;
		}

		isLoading = true;
		error = '';

		const result = await auth.register(email, password);
		
		if (result.success) {
			goto('/dashboard');
		} else {
			error = result.error || 'Registration failed';
		}

		isLoading = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleLogin();
		}
	}
</script>

<div class="min-h-screen flex items-center justify-center relative overflow-hidden">
	<!-- Animated Background -->
	<div class="absolute inset-0 bg-gradient-to-br from-red-500/20 via-orange-500/10 to-yellow-500/20 dark:from-red-950/40 dark:via-orange-950/20 dark:to-yellow-950/40"></div>
	<div class="absolute inset-0 opacity-30">
		<div class="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/30 rounded-full blur-3xl animate-pulse"></div>
		<div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
		<div class="absolute top-1/2 left-1/2 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
	</div>
	
	<!-- Floating Pomodoros -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<span class="absolute top-20 left-10 text-4xl animate-bounce" style="animation-duration: 3s;">🍅</span>
		<span class="absolute top-40 right-20 text-3xl animate-bounce" style="animation-duration: 4s; animation-delay: 0.5s;">⏱️</span>
		<span class="absolute bottom-32 left-20 text-2xl animate-bounce" style="animation-duration: 3.5s; animation-delay: 1s;">✨</span>
		<span class="absolute bottom-20 right-32 text-3xl animate-bounce" style="animation-duration: 4.5s; animation-delay: 1.5s;">🎯</span>
	</div>

	<div class="relative z-10 w-full max-w-md px-4">
		<!-- Logo Section -->
		<div class="text-center mb-8">
			<div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-red-500 to-orange-500 shadow-2xl mb-4 transform hover:scale-110 transition-transform duration-300">
				<span class="text-4xl">🍅</span>
			</div>
			<h1 class="text-4xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
				FocusFlow
			</h1>
			<p class="text-base-content/60 mt-2 text-lg">Master your time, achieve your goals</p>
		</div>

		<!-- Login Card -->
		<div class="card bg-base-100/80 backdrop-blur-lg shadow-2xl border border-base-200/50">
			<div class="card-body">
				<h2 class="card-title text-2xl justify-center mb-2">Welcome Back</h2>
				<p class="text-base-content/60 text-center mb-6">Enter your credentials to continue</p>
				
				{#if error}
					<div class="alert alert-error mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
						<span>{error}</span>
					</div>
				{/if}

				<div class="form-control">
					<label class="label" for="email">
						<span class="label-text font-medium">Email</span>
					</label>
					<div class="relative">
						<input
							id="email"
							type="email"
							placeholder="your@email.com"
							class="input input-bordered w-full pl-12 bg-base-200/50 focus:bg-base-200 transition-colors"
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
						<span class="label-text font-medium">Password</span>
					</label>
					<div class="relative">
						<input
							id="password"
							type="password"
							placeholder="••••••••"
							class="input input-bordered w-full pl-12 bg-base-200/50 focus:bg-base-200 transition-colors"
							bind:value={password}
							onkeydown={handleKeydown}
							disabled={isLoading}
						/>
						<svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
						</svg>
					</div>
				</div>

				<div class="form-control mt-8">
					<button 
						class="btn btn-primary btn-lg" 
						onclick={handleLogin} 
						disabled={isLoading}
					>
						{#if isLoading}
							<span class="loading loading-spinner loading-sm"></span>
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
							</svg>
						{/if}
						{isLoading ? 'Signing in...' : 'Sign In'}
					</button>
				</div>

				<div class="divider text-base-content/60">OR</div>

				<div class="form-control">
					<button 
						class="btn btn-outline btn-lg" 
						onclick={handleRegister} 
						disabled={isLoading}
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
						</svg>
						Create Account
					</button>
				</div>

				<p class="text-center text-xs text-base-content/40 mt-6">
					<span class="inline-flex items-center gap-1">
						<span class="w-2 h-2 rounded-full bg-success animate-pulse"></span>
						Demo mode: Use any email/password
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
				Back to home
			</a>
		</p>
	</div>
</div>
