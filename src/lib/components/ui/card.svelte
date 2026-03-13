<script>
	import { cn } from '$lib/utils';
	export let className = '';
</script>

<div class={cn('card bg-base-100 shadow-xl border border-base-200', className)}>
	<slot />
</div>
