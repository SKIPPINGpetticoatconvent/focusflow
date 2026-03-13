import type { Snippet } from 'svelte';
import { cn } from '../../../lib/utils';
	type?: 'text' | 'email' | 'password' | 'search' | 'number';
	placeholder?: string;
	value?: string;
	class?: string;
	disabled?: boolean;
	required?: boolean;
	name?: string;
	id?: string;
	oninput?: (e: Event) => void;
	onkeydown?: (e: KeyboardEvent) => void;
};

export function Input({
	type = 'text',
	placeholder,
	value = $bindable(),
	class: className,
	disabled,
	required,
	name,
	id,
	oninput,
	onkeydown
}: InputProps) {
	return (
		<input
			{type}
			{placeholder}
			bind:value
			class={cn(
				'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			{disabled}
			{required}
			{name}
			{id}
			oninput={oninput}
			onkeydown={onkeydown}
		/>
	);
}

function cn(...classes: (string | undefined | false)[]) {
	return classes.filter(Boolean).join(' ');
}
