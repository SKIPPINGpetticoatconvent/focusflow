<script lang="ts">
	import { auth } from '$lib/stores/auth';
	import { pomodoroStore } from '$lib/stores/pomodoro';
	import { _ } from 'svelte-i18n';
	import { Settings, Timer, User, Palette } from 'lucide-svelte';

	let fullName = $derived($auth.user?.full_name || '');
	let email = $derived($auth.user?.email || '');
</script>

<div class="max-w-3xl p-4 md:p-8">
	<div class="mb-8">
		<h1 class="text-3xl font-bold">{$_('settings.title')}</h1>
		<p class="text-base-content/60">{$_('settings.subtitle')}</p>
	</div>

	<div class="space-y-6">
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<div class="flex items-center gap-2">
					<User class="w-5 h-5" />
					<h2 class="card-title">{$_('settings.profile')}</h2>
				</div>
				<p class="text-base-content/60">{$_('settings.profileDesc')}</p>
				
				<div class="form-control">
					<label class="label" for="fullName">
						<span class="label-text">{$_('settings.fullName')}</span>
					</label>
					<input id="fullName" type="text" class="input input-bordered" bind:value={fullName} />
				</div>
				<div class="form-control">
					<label class="label" for="email">
						<span class="label-text">{$_('common.email')}</span>
					</label>
					<input id="email" type="text" class="input input-bordered" bind:value={email} disabled />
				</div>
				<div class="card-actions justify-end mt-4">
					<button class="btn btn-primary">{$_('settings.saveChanges')}</button>
				</div>
			</div>
		</div>

		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<div class="flex items-center gap-2">
					<Timer class="w-5 h-5" />
					<h2 class="card-title">{$_('settings.pomodoroSettings')}</h2>
				</div>
				<p class="text-base-content/60">{$_('settings.pomodoroDesc')}</p>
				
				<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
					<div class="form-control">
						<label class="label" for="workDuration">
							<span class="label-text">{$_('settings.workMin')}</span>
						</label>
						<input
							id="workDuration"
							type="number"
							min="1"
							max="60"
							class="input input-bordered"
							value={$pomodoroStore.settings.workDuration}
							oninput={(e) => pomodoroStore.updateSettings({ workDuration: parseInt(e.currentTarget.value) || 25 })}
						/>
					</div>
					<div class="form-control">
						<label class="label" for="shortBreak">
							<span class="label-text">{$_('settings.shortBreakMin')}</span>
						</label>
						<input
							id="shortBreak"
							type="number"
							min="1"
							max="30"
							class="input input-bordered"
							value={$pomodoroStore.settings.shortBreakDuration}
							oninput={(e) => pomodoroStore.updateSettings({ shortBreakDuration: parseInt(e.currentTarget.value) || 5 })}
						/>
					</div>
					<div class="form-control">
						<label class="label" for="longBreak">
							<span class="label-text">{$_('settings.longBreakMin')}</span>
						</label>
						<input
							id="longBreak"
							type="number"
							min="1"
							max="60"
							class="input input-bordered"
							value={$pomodoroStore.settings.longBreakDuration}
							oninput={(e) => pomodoroStore.updateSettings({ longBreakDuration: parseInt(e.currentTarget.value) || 15 })}
						/>
					</div>
				</div>
				<div class="form-control mt-4">
					<label class="label" for="sessionsBeforeLongBreak">
						<span class="label-text">{$_('settings.sessionsBeforeLongBreak')}</span>
					</label>
					<input
						id="sessionsBeforeLongBreak"
						type="number"
						min="1"
						max="10"
						class="input input-bordered"
						value={$pomodoroStore.settings.sessionsBeforeLongBreak}
						oninput={(e) => pomodoroStore.updateSettings({ sessionsBeforeLongBreak: parseInt(e.currentTarget.value) || 4 })}
					/>
				</div>
			</div>
		</div>

		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<div class="flex items-center gap-2">
					<Palette class="w-5 h-5" />
					<h2 class="card-title">{$_('settings.appearance')}</h2>
				</div>
				<p class="text-base-content/60">{$_('settings.appearanceDesc')}</p>
				<p class="text-sm text-base-content/60 mt-2">
					{$_('settings.darkModeHint')}
				</p>
			</div>
		</div>
	</div>
</div>
