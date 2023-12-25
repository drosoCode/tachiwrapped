<script>
    export let mangaName;
    export let mangaImage;
    export let mangas;
    export let genres;
    export let totalMangas;
    export let totalTime;
    export let year;

    const truncate = (str) => str.length > 12 ? str.substring(0, 12)+"..." : str
</script>

<div class="flex flex-col justify-between items-center px-4 py-4 w-72 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400">
    <img 
        style="height: 10rem; width: 7.4rem; line-height: 300%;"
        class="rounded-lg w-60 object-fill text-slate-300 font-semibold text-2xl mb-4"
        src={mangaImage}
        alt={mangaName}
    />
    <div class="flex flex-row mb-4">
        <div class="text-left">
            <ul class="mr-8 mb-2">
                <li class="font-semibold">Top Mangas</li>
                {#each mangas as m}
                    <li>{truncate(m)}</li>
                {/each}
            </ul>
            <div class="flex flex-col mr-8">
                <h6 class="font-semibold">Total Mangas</h6>
                <h4>{totalMangas}</h4>
            </div>
        </div>
        <div class="text-left">
            <ul class="mb-2">
                <li class="font-semibold">Top Genres</li>
                {#each genres as g}
                    <li>{truncate(g)}</li>
                {/each}
            </ul>
            <div class="flex flex-col">
                <h6 class="font-semibold">Total Time</h6>
                <h4>{totalTime}</h4>
            </div>
        </div>
    </div>
    <h5 class="font-light italic text-sm">TachiWrapped {year}</h5>
</div>