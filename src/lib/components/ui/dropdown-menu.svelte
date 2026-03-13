import type { Snippet } from 'svelte';
import { cn } from '$lib/utils';

type DropdownMenuProps = {
	children: Snippet;
};

export function DropdownMenu({ children }: DropdownMenuProps) {
	return <div class="relative">{@render children()}</div>;
}

type DropdownMenuTriggerProps = {
	class?: string;
	children: Snippet;
	onclick?: () => void;
};

export function DropdownMenuTrigger({ class: className, children, onclick }: DropdownMenuTriggerProps) {
	return (
		<button class={cn('', className)} {onclick}>
			{@render children()}
		</button>
	);
}

type DropdownMenuContentProps = {
	class?: string;
	children: Snippet;
};

export function DropdownMenuContent({ class: className, children }: DropdownMenuContentProps) {
	return (
		<div class={cn(
			'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
			className
		)}>
			{@render children()}
		</div>
	);
}

type DropdownMenuItemProps = {
	class?: string;
	children: Snippet;
	onclick?: () => void;
};

export function DropdownMenuItem({ class: className, children, onclick }: DropdownMenuItemProps) {
	return (
		<button
			class={cn(
				'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				className
			)}
			onclick={onclick}
		>
			{@render children()}
		</button>
	);
}

type DropdownMenuSeparatorProps = {
	class?: string;
};

export function DropdownMenuSeparator({ class: className }: DropdownMenuSeparatorProps) {
	return <div class={cn('-mx-1 my-1 h-px bg-muted', className)} />;
}

type DropdownMenuLabelProps = {
	class?: string;
	children: Snippet;
};

export function DropdownMenuLabel({ class: className, children }: DropdownMenuLabelProps) {
	return (
		<div class={cn('px-2 py-1.5 text-sm font-semibold', className)}>
			{@render children()}
		</div>
	);
}
