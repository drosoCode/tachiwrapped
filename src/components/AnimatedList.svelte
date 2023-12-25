<script>
    import { slide } from 'svelte/transition';
    export let items;
    export let duration = 500;
    export let delay = 200;
    export let itemCls = "text-xl font-semibold px-2 py-2 rounded-md bg-amber-100 mb-4 w-96";
    export let ctCls = "flex flex-col items-center";
</script>

<ul class={ctCls}>
    {#each items as item, i ({})}
        <li in:slide={{ duration: duration, delay: i*delay }} class={itemCls}>
            {item}
        </li>
    {/each}
</ul>