<script>
    import { Duration } from "luxon";
    import { getStats } from "../lib/stats";
    import Chart from "./Chart.svelte";
    import { mdiBook, mdiBookOpenPageVariant, mdiClockTimeEight } from '@mdi/js';
    import AnimatedNumber from "./AnimatedNumber.svelte";
    import ContentCard from "./ContentCard.svelte";
    import AnimatedList from "./AnimatedList.svelte";
    import MangaCard from "./MangaCard.svelte";

    export let mangaData;
    export let sources;
    let stats = null;

    let authorsByNb = [];
    let authorsByChap = [];
    let prefSources = [];
    let genres = [];
    let mostRead = [];
    let fullyRead = [];
    let fastestRead = [];
    let mostActiveMonth = [0, 0];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    $: {
        stats = getStats(mangaData);
        console.log(stats)

        authorsByNb = Object.entries(stats.authorsByManga).sort((a,b) => (b[1].length - a[1].length)).filter((x) => (x[1].length > 1)).slice(0,5);
        authorsByChap = Object.entries(stats.authorsByChapter).sort((a,b) => (b[1]-a[1])).slice(0,5);
        prefSources = Object.entries(stats.sources).sort((a,b) => (b[1] - a[1])).slice(0,5);
        genres = Object.entries(stats.genres).sort((a,b) => (b[1] - a[1])).slice(0,5);
        mostRead = Object.entries(stats.mangas).sort((a,b) => (b[1] - a[1])).slice(0,6);
        fullyRead = Object.entries(stats.fullyRead).sort((a,b) => (b[1] - a[1]));
        fastestRead = Object.entries(stats.fastestRead).sort((a,b) => (a[1] - b[1])).slice(0,2);
        mostActiveMonth = Object.entries(stats.byMonth).sort((a,b) => (b[1].time - a[1].time))[0];
    }

    const formatTime = (t) => {
        return (Duration.fromMillis(t, {}).toFormat("d,h;mm")+"min").replace(",", "d ").replace(";", "h ").replace("0d ", "");
    }

    const formatName = (t) => {
        return t.split(" ").map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
    }
</script>

<main class="">
    <div class="flex flex-row flex-wrap justify-around">
        <AnimatedNumber value={stats.totalChapters} icon={mdiBookOpenPageVariant} cardCls={"bg-gradient-to-br from-orange-600 to-orange-400 w-96 mb-4"} iconCls={"text-amber-100"} title={"Total Chapters"}/>
        <AnimatedNumber value={stats.totalMangas} icon={mdiBook} cardCls={"bg-gradient-to-br from-teal-600 to-teal-400 w-96 mb-4"} iconCls={"text-amber-100"} title={"Total Mangas"}/>
        <ContentCard value={formatTime(stats.totalTime)} icon={mdiClockTimeEight} cardCls={"bg-gradient-to-br from-cyan-600 to-cyan-400 w-96 mb-4"} iconCls={"text-amber-100"} title={"Total Time"}/>
        <ContentCard value={months[mostActiveMonth[0]]} icon={mdiClockTimeEight} cardCls={"bg-gradient-to-br from-cyan-600 to-cyan-400 w-96 mb-4"} iconCls={"text-amber-100"} title={"Most Active Month"}/>
        <ContentCard value={Math.round(stats.upToDateMangas/stats.totalMangas*100)+"% ("+stats.upToDateMangas+"/"+stats.totalMangas+")"} icon={mdiClockTimeEight} cardCls={"bg-gradient-to-br from-cyan-600 to-cyan-400 w-96 mb-4"} iconCls={"text-amber-100"} title={"Up To Date Mangas"}/>
        <AnimatedNumber value={fullyRead.length} icon={mdiClockTimeEight} cardCls={"bg-gradient-to-br from-cyan-600 to-cyan-400 w-96 mb-4"} iconCls={"text-amber-100"} title={"Fully Read Mangas"}/>
    </div>

    {#if authorsByChap.length > 0}
        <div class="mt-10">
            <h1 class="text-amber-100 font-semibold text-2xl mb-5">Your preferred authors are</h1>
            <AnimatedList items={authorsByChap.map((x, i) => (i+1)+". "+formatName(x[0])+" ("+x[1]+")")}/>
        </div>
    {/if}


    {#if authorsByNb.length > 0}
        <div class="mt-10">
            <h1 class="text-amber-100 font-semibold text-2xl mb-5">You've read multiple titles from these authors</h1>
            <AnimatedList items={authorsByNb.map((x) => x[1].length+" from "+formatName(x[0])+": "+x[1].join(", "))}/>
        </div>
    {/if}

    <div class="mt-10">
        <h1 class="text-amber-100 font-semibold text-2xl mb-5">This year, you've liked a lot these categories</h1>
        <AnimatedList items={genres.map((x) => formatName(x[0]))}/>
    </div>

    
    <div class="mt-10">
        <h1 class="text-amber-100 font-semibold text-2xl mb-5">Your most used sources are</h1>
        <AnimatedList items={prefSources.map((x) => formatName(sources[x[0]]))}/>
    </div>

    <div class="mt-10">
        <h1 class="text-amber-100 font-semibold text-2xl mb-5">You've read these mangas in no time !</h1>
        <AnimatedList items={fastestRead.map((x) => formatName(x[0]))}/>
    </div>
    

    <div class="mt-10 lg:px-10">
        <h1 class="text-amber-100 font-semibold text-2xl mb-5">Your preferrend mangas are</h1>
        <div class="flex flex-row flex-wrap justify-around">
            {#each mostRead as m}
                <MangaCard image={mangaData[m[0]].image} name={m[0]} number={m[1]} cardCls={"mb-4"}/>
            {/each}
        </div>
    </div>

    <div class="mt-10">
        <h1 class="text-amber-100 font-semibold text-2xl mb-5">Here is your reading history</h1>
        <Chart byMonth={stats.byMonth} width={400} height={200}/>
    </div>
</main>
