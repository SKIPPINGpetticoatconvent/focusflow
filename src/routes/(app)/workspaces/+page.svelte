<script lang="ts">
	import { workspaceStore, workspaces, currentWorkspace } from '$lib/stores/workspace';
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

<div class="p-8">
	<div class="flex items-center justify-between mb-8">
		<div>
			<h1 class="text-3xl font-bold">Workspaces</h1>
			<p class="text-base-content/60">Manage your workspaces</p>
		</div>
		<button class="btn btn-primary" onclick={() => showNewWorkspaceDialog = true}>
			<Plus class="w-4 h-4 mr-2" />
			New Workspace
		</button>
	</div>

	<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each $workspaces as workspace}
			<button 
				class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-all text-left {$currentWorkspace?.id === workspace.id ? 'ring-2 ring-primary' : ''}"
				onclick={() => selectWorkspace(workspace.id)}
			>
				<div class="card-body">
					<h2 class="card-title flex items-center gap-2">
						{#if workspace.type === 'team'}
							<Users class="w-5 h-5" />
						{:else}
							<Folder class="w-5 h-5" />
						{/if}
						{workspace.name}
					</h2>
					<p class="text-sm text-base-content/60 capitalize">{workspace.type}</p>
					<p class="text-xs text-base-content/40">
						Created {new Date(workspace.created_at).toLocaleDateString()}
					</p>
				</div>
			</button>
		{/each}

		{#if $workspaces.length === 0}
			<div class="col-span-full text-center py-12">
				<Folder class="w-12 h-12 mx-auto text-base-content/40 mb-4" />
				<p class="text-base-content/60">No workspaces yet</p>
				<button class="btn btn-outline mt-4" onclick={() => showNewWorkspaceDialog = true}>
					<Plus class="w-4 h-4 mr-2" />
					Create your first workspace
				</button>
			</div>
		{/if}
	</div>
</div>

{#if showNewWorkspaceDialog}
	<div class="modal modal-open">
		<div class="modal-box">
			<h3 class="font-bold text-lg">Create New Workspace</h3>
			<p class="text-base-content/60 py-2">Enter a name for your new workspace</p>
			
			<div class="form-control">
				<label class="label" for="workspaceName">
					<span class="label-text">Workspace Name</span>
				</label>
				<input
					id="workspaceName"
					type="text"
					placeholder="My Workspace"
					class="input input-bordered"
					bind:value={newWorkspaceName}
				/>
			</div>

			<div class="form-control">
				<span class="label">
					<span class="label-text">Workspace Type</span>
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
						<span>Personal</span>
					</label>
					<label class="flex items-center gap-2 cursor-pointer">
						<input
							type="radio"
							name="workspaceType"
							value="team"
							bind:group={newWorkspaceType}
							class="radio radio-primary"
						/>
						<span>Team</span>
					</label>
				</div>
			</div>

			<div class="modal-action">
				<button class="btn btn-ghost" onclick={() => showNewWorkspaceDialog = false}>Cancel</button>
				<button class="btn btn-primary" onclick={handleCreateWorkspace} disabled={!newWorkspaceName.trim()}>Create</button>
			</div>
		</div>
		<div class="modal-backdrop" onclick={() => showNewWorkspaceDialog = false} onkeydown={(e) => e.key === 'Escape' && (showNewWorkspaceDialog = false)} role="button" tabindex="0"></div>
	</div>
{/if}
