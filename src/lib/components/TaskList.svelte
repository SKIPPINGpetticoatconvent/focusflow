<script lang="ts">
	import { taskStore, filteredTasks } from '$lib/stores/tasks';
	import { flip } from 'svelte/animate';
	import { scale, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import type { Task, TaskPriority } from '$types';

	let newTaskTitle = $state('');
	let editingTaskId: string | null = $state(null);
	let editingTitle = $state('');
	let filter: 'all' | 'pending' | 'in_progress' | 'completed' = $state('all');
	let searchQuery = $state('');

	$effect(() => {
		taskStore.setFilter(filter);
	});

	$effect(() => {
		taskStore.setSearchQuery(searchQuery);
	});

	const priorityColors: Record<TaskPriority, { badge: string; icon: string }> = {
		low: { badge: 'badge-info', icon: '↓' },
		medium: { badge: 'badge-primary', icon: '→' },
		high: { badge: 'badge-warning', icon: '↑' },
		urgent: { badge: 'badge-error', icon: '!' }
	};

	async function handleAddTask(e: Event) {
		e.preventDefault();
		if (!newTaskTitle.trim()) return;
		await taskStore.addTask(newTaskTitle);
		newTaskTitle = '';
	}

	async function handleToggleTask(taskId: string) {
		await taskStore.toggleTaskStatus(taskId);
	}

	async function handleDeleteTask(taskId: string) {
		await taskStore.deleteTask(taskId);
	}

	function startEditing(task: Task) {
		editingTaskId = task.id;
		editingTitle = task.title;
	}

	function cancelEditing() {
		editingTaskId = null;
		editingTitle = '';
	}

	async function saveEditing(taskId: string) {
		if (!editingTitle.trim()) return;
		await taskStore.updateTask(taskId, { title: editingTitle });
		editingTaskId = null;
		editingTitle = '';
	}

	function handleDragStart(e: DragEvent, taskId: string) {
		if (e.dataTransfer) {
			e.dataTransfer.setData('text/plain', taskId);
			e.dataTransfer.effectAllowed = 'move';
		}
	}

	async function handleDrop(e: DragEvent, targetTaskId: string) {
		e.preventDefault();
		const draggedId = e.dataTransfer?.getData('text/plain');
		if (!draggedId || draggedId === targetTaskId) return;

		const tasks = $filteredTasks.tasks;
		const draggedIndex = tasks.findIndex(t => t.id === draggedId);
		const targetIndex = tasks.findIndex(t => t.id === targetTaskId);

		if (draggedIndex === -1 || targetIndex === -1) return;

		const newOrder = [...tasks];
		const [draggedTask] = newOrder.splice(draggedIndex, 1);
		newOrder.splice(targetIndex, 0, draggedTask);

		await taskStore.reorderTasks(newOrder.map(t => t.id));
	}

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		if (e.dataTransfer) {
			e.dataTransfer.dropEffect = 'move';
		}
	}
</script>

<div class="space-y-5">
	<!-- Search bar -->
	<div class="relative group">
		<div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40 group-focus-within:text-primary transition-colors">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
		</div>
		<input
			type="search"
			placeholder="Search tasks..."
			class="input input-bordered w-full pl-12 pr-4 py-3 rounded-xl focus:input-primary transition-all"
			bind:value={searchQuery}
		/>
	</div>

	<!-- Add task form -->
	<form onsubmit={handleAddTask} class="flex gap-3">
		<div class="relative flex-1">
			<input
				type="text"
				placeholder="What needs to be done?"
				class="input input-bordered w-full pr-4 py-3 rounded-xl focus:input-primary transition-all"
				bind:value={newTaskTitle}
			/>
		</div>
		<button 
			type="submit" 
			class="btn btn-primary gap-2 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
			disabled={!newTaskTitle.trim()}
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
			<span class="hidden sm:inline">Add Task</span>
		</button>
	</form>

	<!-- Filter buttons -->
	<div class="flex gap-2 flex-wrap">
		{#each [
			{ id: 'all', label: 'All', icon: '○', count: $filteredTasks.tasks.length },
			{ id: 'pending', label: 'Pending', icon: '○' },
			{ id: 'in_progress', label: 'In Progress', icon: '◐' },
			{ id: 'completed', label: 'Completed', icon: '●' }
		] as filterOption}
			<button
				onclick={() => filter = filterOption.id as any}
				class="btn btn-sm rounded-full gap-2 {filter === filterOption.id ? 'btn-primary shadow-md' : 'btn-ghost hover:bg-base-200'}"
			>
				<span>{filterOption.icon}</span>
				<span>{filterOption.label}</span>
				{#if filterOption.count !== undefined}
					<span class="badge badge-sm {filter === filterOption.id ? 'badge-ghost' : ''}">{$filteredTasks.tasks.length}</span>
				{/if}
			</button>
		{/each}
	</div>

	<!-- Task list -->
	{#if $filteredTasks.tasks.length === 0}
		<div class="text-center py-12" transition:fade>
			<div class="w-20 h-20 mx-auto mb-4 rounded-full bg-base-200 flex items-center justify-center">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
			</div>
			<p class="text-base-content/60 text-lg">
				{searchQuery ? 'No tasks match your search.' : 'No tasks yet. Add one above!'}
			</p>
		</div>
	{:else}
		<ul class="space-y-2">
			{#each $filteredTasks.tasks as task (task.id)}
				<li
					animate:flip={{ duration: 300, easing: quintOut }}
					draggable="true"
					ondragstart={(e) => handleDragStart(e, task.id)}
					ondrop={(e) => handleDrop(e, task.id)}
					ondragover={handleDragOver}
					in:scale={{ duration: 200, start: 0.8 }}
					out:scale={{ duration: 200, start: 0 }}
					class="group flex items-center gap-3 p-4 rounded-xl bg-base-200/50 hover:bg-base-200 border border-transparent hover:border-base-300 transition-all hover:shadow-md"
				>
					<!-- Drag handle -->
					<div class="cursor-grab active:cursor-grabbing text-base-content/30 hover:text-base-content/60 opacity-0 group-hover:opacity-100 transition-opacity">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
					</div>

					<!-- Checkbox -->
					<input
						type="checkbox"
						checked={task.status === 'completed'}
						onchange={() => handleToggleTask(task.id)}
						class="checkbox checkbox-primary checkbox-md rounded-lg"
					/>

					{#if editingTaskId === task.id}
						<!-- Edit mode -->
						<div class="flex-1 flex gap-2" transition:fade>
							<input
								type="text"
								class="input input-bordered input-sm flex-1"
								bind:value={editingTitle}
								onkeydown={(e) => e.key === 'Enter' && saveEditing(task.id)}
								autofocus
							/>
							<button class="btn btn-sm btn-success btn-circle" onclick={() => saveEditing(task.id)}>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
							</button>
							<button class="btn btn-sm btn-ghost btn-circle" onclick={cancelEditing}>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
							</button>
						</div>
					{:else}
						<!-- Display mode -->
						<span
							class="flex-1 text-base transition-all {task.status === 'completed' ? 'line-through text-base-content/40' : ''}"
						>
							{task.title}
						</span>
						<span class="badge badge-sm {priorityColors[task.priority].badge} gap-1">
							<span>{priorityColors[task.priority].icon}</span>
							<span class="capitalize">{task.priority}</span>
						</span>
						<div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
							<button
								onclick={() => startEditing(task)}
								class="btn btn-xs btn-ghost btn-circle"
								title="Edit"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
							</button>
							<button
								onclick={() => handleDeleteTask(task.id)}
								class="btn btn-xs btn-ghost btn-circle text-error hover:bg-error/10"
								title="Delete"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
							</button>
						</div>
					{/if}
				</li>
		{/each}
		</ul>
	{/if}
</div>
