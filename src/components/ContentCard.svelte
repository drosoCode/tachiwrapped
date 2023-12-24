<script>
    import SvgIcon from '@jamescoyle/svelte-icon';
    export let title;
    export let icon;
    export let value;
    export let cardCls = "";
    export let iconCls = "";
</script>

<div class={"flex flex-row px-5 py-3 rounded-md "+cardCls}>
    <span class={"py-2 "+iconCls}>
        <SvgIcon type="mdi" path={icon} size={60}></SvgIcon>
    </span>
    <div class="flex-grow flex flex-col justify-around">
        <h6 class="text-amber-100 font-semibold text-xl">{title}</h6>
        <h2 class="text-amber-100 font-bold text-4xl">{value}</h2>
    </div>
</div>