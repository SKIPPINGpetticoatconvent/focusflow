import type { Snippet } from 'svelte';
import { cn } from '$lib/utils';

type TabsProps = {
	value?: string;
	class?: string;
	children: Snippet;
	onchange?: (value: string) => void;
};

export function Tabs({ value = $bindable(), class: className, children, onchange }: TabsProps) {
	return (
		<div class={cn('w-full', className)}>
			<div data-state="active" data-orientation="horizontal" role="tablist">
				{@render children({ value, onchange: (v: string) => { value = v; onchange?.(v); } })}
			</div>
		</div>
	);
}

type TabsListProps = {
	class?: string;
	children: Snippet;
};

export function TabsList({ class: className, children }: TabsListProps) {
	return (
		<div class={cn('inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground', className)}>
			{@render children()}
		</div>
	);
}

type TabsTriggerProps = {
	value: string;
	class?: string;
	children: Snippet;
	onclick?: () => void;
};

export function TabsTrigger({ value, class: className, children, onclick }: TabsTriggerProps) {
	return (
		<button
			onclick={onclick}
			class={cn(
				'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
				className
			)}
			data-state="active"
			role="tab"
			type="button"
		>
			{@render children()}
		</button>
	);
}

type TabsContentProps = {
	value: string;
	class?: string;
	children: Snippet;
};

export function TabsContent({ value, class: className, children }: TabsContentProps) {
	return (
		<div
			class={cn('mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', className)}
			role="tabpanel"
			data-state="active"
		>
			{@render children()}
		</div>
	);
}
