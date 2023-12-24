<script>
    import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
    import ContentCard from './ContentCard.svelte';
    export let title;
    export let icon;
    export let value;
    export let cardCls = "";
    export let iconCls = "";
    export let duration = 1000;

	const val = tweened(1, {
		duration: duration,
		easing: cubicOut
	});
    $: {
        val.set(value);
    }
    $: displayVal = $val.toFixed(0);
</script>

<ContentCard title={title} value={displayVal} icon={icon} iconCls={iconCls} cardCls={cardCls}/>