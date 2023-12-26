<script>
    import { slide } from 'svelte/transition';
    export let items;
    export let duration = 500;
    export let delay = 200;
    export let itemCls = "text-xl font-semibold px-1 py-2 rounded-md bg-amber-100 mb-4 w-72";
    export let secItemCls = "ml-14 text-xl font-semibold px-2 py-2 rounded-md bg-amber-100 mb-4 w-72";
    export let ctCls = "flex flex-col items-center";
</script>

<ul class={ctCls}>
    {#each items as item, i ({})}
        <li in:slide={{ duration: duration, delay: i*delay }}>
            <h5 class={itemCls}>{item[0]}</h5>
            <ul class="mt-2">
            {#each item[1] as v, j ({})}
                <li in:slide={{ duration: duration, delay: (i+j)*delay }} class={secItemCls}>
                    {v}
                </li>
            {/each}
            </ul>
        </li>
    {/each}
</ul>