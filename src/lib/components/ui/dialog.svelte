import type { Snippet } from 'svelte';
import { cn } from '$lib/utils';

type DialogProps = {
	open?: boolean;
	onclose?: () => void;
	children: Snippet;
};

export function Dialog({ open = $bindable(false), onclose, children }: DialogProps) {
	if (!open) return null;

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			open = false;
			onclose?.();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			open = false;
			onclose?.();
		}
	}

	return (
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
			onclick={handleBackdropClick}
			onkeydown={handleKeydown}
			role="dialog"
			tabindex="-1"
		>
			<div class={cn(
				'relative w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg',
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
			)}>
				{@render children()}
			</div>
		</div>
	);
}

type DialogHeaderProps = {
	class?: string;
	children: Snippet;
};

export function DialogHeader({ class: className, children }: DialogHeaderProps) {
	return <div class={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}>{@render children()}</div>;
}

type DialogTitleProps = {
	class?: string;
	children: Snippet;
};

export function DialogTitle({ class: className, children }: DialogTitleProps) {
	return <h2 class={cn('text-lg font-semibold leading-none tracking-tight', className)}>{@render children()}</h2>;
}

type DialogDescriptionProps = {
	class?: string;
	children: Snippet;
};

export function DialogDescription({ class: className, children }: DialogDescriptionProps) {
	return <p class={cn('text-sm text-muted-foreground', className)}>{@render children()}</p>;
}

type DialogContentProps = {
	class?: string;
	children: Snippet;
};

export function DialogContent({ class: className, children }: DialogContentProps) {
	return <div class={cn('py-4', className)}>{@render children()}</div>;
}

type DialogFooterProps = {
	class?: string;
	children: Snippet;
};

export function DialogFooter({ class: className, children }: DialogFooterProps) {
	return <div class={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4', className)}>{@render children()}</div>;
}
