<script lang="ts">
	import { generateAITasks, getAIChatResponse } from '$lib/mock/ai';
	import { taskStore } from '$lib/stores/tasks';
	import { slide } from 'svelte/transition';
	import { MessageSquare, X, Sparkles, Plus, Send } from 'lucide-svelte';
	import type { AI_TASK_SUGGESTION } from '$types';

	let isOpen = $state(false);
	let message = $state('');
	let isLoading = $state(false);
	let suggestions: AI_TASK_SUGGESTION[] = $state([]);
	let chatResponse = $state('');

	async function handleSendMessage() {
		if (!message.trim() || isLoading) return;
		
		isLoading = true;
		
		try {
			if (message.toLowerCase().includes('generate') || message.toLowerCase().includes('create') || message.toLowerCase().includes('task')) {
				suggestions = await generateAITasks(message);
				chatResponse = '';
			} else {
				chatResponse = await getAIChatResponse(message);
				suggestions = [];
			}
		} catch (error) {
			chatResponse = 'Sorry, I encountered an error. Please try again.';
		}
		
		isLoading = false;
	}

	async function addSuggestedTask(suggestion: AI_TASK_SUGGESTION) {
		await taskStore.addTask(suggestion.title, suggestion.priority);
		suggestions = suggestions.filter(s => s.title !== suggestion.title);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	}

	function togglePanel() {
		isOpen = !isOpen;
		if (!isOpen) {
			message = '';
			suggestions = [];
			chatResponse = '';
		}
	}
</script>

<div class="fixed bottom-4 right-4 z-50">
	{#if isOpen}
		<div
			in:slide={{ duration: 300, axis: 'y' }}
			out:slide={{ duration: 300, axis: 'y' }}
			class="absolute bottom-0 right-0 w-80 md:w-96 bg-base-100 border rounded-lg shadow-lg mb-2 mr-2"
		>
			<div class="flex items-center justify-between p-4 border-b">
				<div class="flex items-center gap-2">
					<Sparkles class="w-5 h-5 text-primary" />
					<span class="font-semibold">AI Assistant</span>
				</div>
				<button onclick={togglePanel} class="btn btn-sm btn-ghost">
					<X class="w-4 h-4" />
				</button>
			</div>

			<div class="p-4 max-h-80 overflow-y-auto space-y-4">
				{#if suggestions.length > 0}
					<div class="space-y-2">
						<p class="text-sm font-medium text-base-content/60">Suggested Tasks:</p>
						{#each suggestions as suggestion}
							<div class="p-3 rounded-lg border bg-base-200 hover:bg-base-300 transition-colors">
								<div class="flex items-start justify-between gap-2">
									<div class="flex-1">
										<p class="text-sm font-medium">{suggestion.title}</p>
										<p class="text-xs text-base-content/60 mt-1">
											{suggestion.estimatedPomodoros} pomodoros • {suggestion.priority}
										</p>
										{#if suggestion.reason}
											<p class="text-xs text-base-content/60 mt-1">{suggestion.reason}</p>
										{/if}
									</div>
									<button
										onclick={() => addSuggestedTask(suggestion)}
										class="btn btn-sm btn-ghost"
									>
										<Plus class="w-4 h-4" />
									</button>
								</div>
							</div>
						{/each}
					</div>
				{/if}

				{#if chatResponse}
					<div class="chat chat-start">
						<div class="chat-bubble bg-base-300">
							<p class="text-sm whitespace-pre-wrap">{chatResponse}</p>
						</div>
					</div>
				{/if}

				{#if isLoading}
					<div class="flex items-center gap-2 text-base-content/60">
						<span class="loading loading-dots loading-md"></span>
					</div>
				{/if}
			</div>

			<div class="p-4 border-t">
				<div class="flex gap-2">
					<input
						type="text"
						placeholder="Ask AI or generate tasks..."
						class="input input-bordered flex-1"
						bind:value={message}
						onkeydown={handleKeydown}
						disabled={isLoading}
					/>
					<button class="btn btn-primary" onclick={handleSendMessage} disabled={isLoading || !message.trim()}>
						<Send class="w-4 h-4" />
					</button>
				</div>
			</div>
		</div>
	{/if}

	<button
		onclick={togglePanel}
		class="btn btn-circle btn-lg shadow-lg"
	>
		<MessageSquare class="w-6 h-6" />
	</button>
</div>
