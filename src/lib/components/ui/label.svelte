import { cn } from '$lib/utils';

type LabelProps = {
	for?: string;
	class?: string;
	children: any;
};

export function Label({ for: forId, class: className, children }: LabelProps) {
	return (
		<label
			for={forId}
			class={cn(
				'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
				className
			)}
		>
			{children}
		</label>
	);
}
