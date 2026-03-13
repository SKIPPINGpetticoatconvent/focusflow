<script lang="ts">
	import { workspaceStore, workspaces, currentWorkspace } from '$lib/stores/workspace';
	import { _, locale } from 'svelte-i18n';
	import { Plus, Users, Folder } from 'lucide-svelte';

	let showNewWorkspaceDialog = $state(false);
	let newWorkspaceName = $state('');
	let newWorkspaceType: 'personal' | 'team' = $state('personal');

	async function handleCreateWorkspace() {
		if (!newWorkspaceName.trim()) return;
		
		await workspaceStore.createWorkspace(newWorkspaceName, newWorkspaceType);
		newWorkspaceName = '';
		newWorkspaceType = 'personal';
		showNewWorkspaceDialog = false;
	}

	function selectWorkspace(id: string) {
		workspaceStore.selectWorkspace(id);
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-base-200/40 via-base-100 to-base-100 p-4 md:p-8">
	<div class="mx-auto max-w-[1280px]">
	<div class="mb-6 flex flex-col gap-3 rounded-3xl border border-base-300/40 bg-base-100/70 px-5 py-5 backdrop-blur-xl sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">{$_('workspace.title')}</h1>
			<p class="text-base-content/60">{$_('workspace.subtitle')}</p>
		</div>
		<button class="btn btn-primary rounded-xl" onclick={() => showNewWorkspaceDialog = true}>
			<Plus class="w-4 h-4 mr-2" />
			{$_('workspace.newWorkspace')}
		</button>
	</div>

	<div class="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
		{#each $workspaces as workspace}
			<button 
				class="card cursor-pointer border border-base-300/40 bg-base-100/80 text-left shadow-xl backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-2xl {$currentWorkspace?.id === workspace.id ? 'ring-2 ring-primary/70' : ''}"
				onclick={() => selectWorkspace(workspace.id)}
			>
				<div class="card-body gap-2">
					<h2 class="card-title flex items-center gap-2">
						{#if workspace.type === 'team'}
							<Users class="w-5 h-5" />
						{:else}
							<Folder class="w-5 h-5" />
						{/if}
						{workspace.name}
					</h2>
					<p class="text-sm text-base-content/60 capitalize">
						{workspace.type === 'personal' ? $_('workspace.personal') : $_('workspace.team')}
					</p>
					<p class="text-xs text-base-content/40">
						{$_('workspace.created')} {new Date(workspace.created_at).toLocaleDateString($locale === 'zh' ? 'zh-CN' : 'en-US')}
					</p>
				</div>
			</button>
		{/each}

		{#if $workspaces.length === 0}
			<div class="col-span-full text-center py-12">
				<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-base-300/40 bg-base-100/70">
					<Folder class="w-9 h-9 text-base-content/40" />
				</div>
				<p class="text-base-content/60">{$_('workspace.noWorkspace')}</p>
				<button class="btn btn-outline mt-4 rounded-xl" onclick={() => showNewWorkspaceDialog = true}>
					<Plus class="w-4 h-4 mr-2" />
					{$_('workspace.createFirst')}
				</button>
			</div>
		{/if}
	</div>
	</div>
</div>

{#if showNewWorkspaceDialog}
	<div class="modal modal-open">
		<div class="modal-box">
			<h3 class="font-bold text-lg">{$_('workspace.createTitle')}</h3>
			<p class="text-base-content/60 py-2">{$_('workspace.createDesc')}</p>
			
			<div class="form-control">
				<label class="label" for="workspaceName">
					<span class="label-text">{$_('workspace.workspaceName')}</span>
				</label>
				<input
					id="workspaceName"
					type="text"
					placeholder={$_('workspace.myWorkspace')}
					class="input input-bordered"
					bind:value={newWorkspaceName}
				/>
			</div>

			<div class="form-control">
				<span class="label">
					<span class="label-text">{$_('workspace.workspaceType')}</span>
				</span>
				<div class="flex gap-4">
					<label class="flex items-center gap-2 cursor-pointer">
						<input
							type="radio"
							name="workspaceType"
							value="personal"
							bind:group={newWorkspaceType}
							class="radio radio-primary"
						/>
						<span>{$_('workspace.personal')}</span>
					</label>
					<label class="flex items-center gap-2 cursor-pointer">
						<input
							type="radio"
							name="workspaceType"
							value="team"
							bind:group={newWorkspaceType}
							class="radio radio-primary"
						/>
						<span>{$_('workspace.team')}</span>
					</label>
				</div>
			</div>

			<div class="modal-action">
				<button class="btn btn-ghost" onclick={() => showNewWorkspaceDialog = false}>{$_('workspace.cancel')}</button>
				<button class="btn btn-primary" onclick={handleCreateWorkspace} disabled={!newWorkspaceName.trim()}>{$_('workspace.create')}</button>
			</div>
		</div>
		<div class="modal-backdrop" onclick={() => showNewWorkspaceDialog = false} onkeydown={(e) => e.key === 'Escape' && (showNewWorkspaceDialog = false)} role="button" tabindex="0"></div>
	</div>
{/if}
