<script>
    export let name;
    export let image;
    export let number;
    export let cardCls = "";
</script>

<div class={"relative w-60 bg-neutral-800 rounded-lg shadow "+cardCls} style="height: 23rem;">
    <img 
        style="height: 23rem;line-height: 500%;"
        class="rounded-lg w-60 object-fill text-slate-300 font-semibold text-2xl"
        src={image}
        alt={name}
    />
    <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-90 rounded-b-lg">
        <h5 class="mb-2 text-2xl font-semibold text-white">{name}</h5>
        <h6 class="text-gray-400 font-light">{number} Chapters</h6>
    </div>
</div>
