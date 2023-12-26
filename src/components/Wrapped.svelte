<script>
    import { Duration } from "luxon";
    import { getStats } from "../lib/stats";
    import Chart from "./Chart.svelte";
    import { mdiBook, mdiBookOpenPageVariant, mdiClockTimeEight, mdiCalendar, mdiBookCheck, mdiProgressCheck } from '@mdi/js';
    import AnimatedNumber from "./AnimatedNumber.svelte";
    import ContentCard from "./ContentCard.svelte";
    import AnimatedList from "./AnimatedList.svelte";
    import MangaCard from "./MangaCard.svelte";
    import DoubleAnimatedList from "./DoubleAnimatedList.svelte";
    import Recap from "./Recap.svelte";

    export let mangaData;
    export let sources;
    export let scrollBtnShow;
    export let container;
    export let year;

    let stats = null;
    let cpt = 0;
    let elements = [];

    let authorsByNb = [];
    let authorsByChap = [];
    let prefSources = [];
    let genres = [];
    let mostRead = [];
    let fullyRead = [];
    let fastestRead = [];
    let mostActiveMonth = [0, 0];
    let showChart = false;
    let showRecap = false;

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    $: {
        stats = getStats(mangaData);
        updateUI();
    }

    const updateUI = () => {
        container.scrollTo({top: 0});
        reset();
        fullyRead = Object.entries(stats.fullyRead).sort((a,b) => (b[1] - a[1]));
        mostActiveMonth = Object.entries(stats.byMonth).sort((a,b) => (b[1].time - a[1].time))[0];
    }

    const formatTime = (t) => {
        return (Duration.fromMillis(t, {}).toFormat("d,h;mm")+"min").replace(",", "d ").replace(";", "h ").replace("0d ", "");
    }

    const formatName = (t) => {
        return t.split(" ").map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
    }

    const reset = () => {
        authorsByNb = [];
        authorsByChap = [];
        prefSources = [];
        genres = [];
        mostRead = [];
        fastestRead = [];
        cpt = 0;
        showChart = false;
        showRecap = false;
        scrollBtnShow = true;
    }

    const scrollElement = (id) => {
        const s = () => {
            container.scrollTo({
                top: container.scrollTop + elements[id].getBoundingClientRect().top,
                behavior: 'smooth'
            });
        };
        s();
        setTimeout(s, 150);
        setTimeout(s, 300);
    }

    export const scrollBtnClick = () => {
        if(cpt > 8) return;
        switch(cpt) {
            case 0:
                scrollElement(0);
                authorsByChap = Object.entries(stats.authorsByChapter).sort((a,b) => (b[1]-a[1])).slice(0,5);
            break;
            case 1:
                scrollElement(1);
                authorsByNb = Object.entries(stats.authorsByManga).sort((a,b) => (b[1].length - a[1].length)).filter((x) => (x[1].length > 1)).slice(0,5);
            break;
            case 2:
                scrollElement(2);
                genres = Object.entries(stats.genres).sort((a,b) => (b[1] - a[1])).slice(0,5);
            break;
            case 3:
                scrollElement(3);
                prefSources = Object.entries(stats.sources).sort((a,b) => (b[1] - a[1])).slice(0,5);
            break;
            case 4:
                scrollElement(4);
                fastestRead = Object.entries(stats.fastestRead).sort((a,b) => (a[1] - b[1])).slice(0,2);
            break;
            case 5:
                scrollElement(5);
                mostRead = Object.entries(stats.mangas).sort((a,b) => (b[1] - a[1])).slice(0,6);
            break;
            case 6:
                scrollElement(6);
                showChart = true;
            break;
            case 7:
                scrollElement(7);
                showRecap = true;
            break;
        }
        cpt++;
        if(cpt == 8)
            scrollBtnShow = false;
    }
</script>

<main>
    <div class="flex flex-row flex-wrap justify-around">
        <AnimatedNumber value={stats.totalChapters} icon={mdiBookOpenPageVariant} cardCls={"bg-gradient-to-br from-orange-600 to-orange-400 w-96 mb-4"} iconCls={"text-amber-100"} title={"Total Chapters"}/>
        <AnimatedNumber value={stats.totalMangas} icon={mdiBook} cardCls={"bg-gradient-to-br from-teal-600 to-teal-400 w-96 mb-4"} iconCls={"text-amber-100"} title={"Total Mangas"}/>
        <ContentCard value={formatTime(stats.totalTime)} icon={mdiClockTimeEight} cardCls={"bg-gradient-to-br from-cyan-600 to-cyan-400 w-96 mb-4"} iconCls={"text-amber-100"} title={"Total Time"}/>
        <ContentCard value={months[mostActiveMonth[0]]} icon={mdiCalendar} cardCls={"bg-gradient-to-br from-lime-700 to-lime-500 w-96 mb-4"} iconCls={"text-amber-100"} title={"Most Active Month"}/>
        <ContentCard value={Math.round(stats.upToDateMangas/stats.totalMangas*100)+"% ("+stats.upToDateMangas+"/"+stats.totalMangas+")"} icon={mdiProgressCheck} cardCls={"bg-gradient-to-br from-indigo-600 to-indigo-400 w-96 mb-4"} iconCls={"text-amber-100"} title={"Up To Date Mangas"}/>
        <AnimatedNumber value={fullyRead.length} icon={mdiBookCheck} cardCls={"bg-gradient-to-br from-purple-700 to-purple-500 w-96 mb-4"} iconCls={"text-amber-100"} title={"Fully Read Mangas"}/>
    </div>

    <div class="mt-10" bind:this={elements[0]}>
        <h1 class="text-amber-100 font-semibold text-2xl mb-5" hidden={authorsByChap.length == 0}>Your preferred authors are</h1>
        <AnimatedList items={authorsByChap.map((x, i) => (i+1)+". "+formatName(x[0])+" ("+x[1]+")")}/>
    </div>

    <div class="mt-10" bind:this={elements[1]}>
        <h1 class="text-amber-100 font-semibold text-2xl mb-5" hidden={authorsByNb.length == 0}>You've read multiple titles from these authors</h1>
        <DoubleAnimatedList items={authorsByNb.map((x) => [formatName(x[0]), x[1].map(v => formatName(v))])}/>
    </div>

    <div class="mt-10" bind:this={elements[2]}>
        <h1 class="text-amber-100 font-semibold text-2xl mb-5" hidden={genres.length == 0}>This year, you've liked a lot these categories</h1>
        <AnimatedList items={genres.map((x) => formatName(x[0]))}/>
    </div>

    <div class="mt-10" bind:this={elements[3]}>
        <h1 class="text-amber-100 font-semibold text-2xl mb-5" hidden={prefSources.length == 0}>Your most used sources are</h1>
        <AnimatedList items={prefSources.map((x) => formatName(sources[x[0]]))}/>
    </div>

    <div class="mt-10" bind:this={elements[4]}>
        <h1 class="text-amber-100 font-semibold text-2xl mb-5" hidden={fastestRead.length == 0}>You've read these mangas in no time !</h1>
        <AnimatedList items={fastestRead.map((x) => formatName(x[0]))}/>
    </div>
    
    <div class="mt-10 lg:px-10" bind:this={elements[5]}>
        <h1 class="text-amber-100 font-semibold text-2xl mb-5" hidden={mostRead.length == 0}>Finally, your preferrend mangas are</h1>
        <div class="flex flex-row flex-wrap justify-around">
            {#each mostRead as m}
                <MangaCard image={mangaData[m[0]].image} name={m[0]} number={m[1]} cardCls={"mb-4"}/>
            {/each}
        </div>
    </div>

    <div class="mt-10" bind:this={elements[6]}>
        {#if showChart}
            <h1 class="text-amber-100 font-semibold text-2xl mb-5">Here is your reading history</h1>
            <Chart byMonth={stats.byMonth} width={400} height={200}/>
        {/if}
    </div>

    <div class="mt-10" bind:this={elements[7]}>
        {#if showRecap}
            <h1 class="text-amber-100 font-semibold text-2xl mb-5">This is your recap !</h1>
            <div class="flex flex-row items-center justify-around">
                <Recap 
                    mangaImage={mangaData[mostRead[0][0]].image} 
                    mangaName={mostRead[0][0]} 
                    mangas={mostRead.map(x => formatName(x[0])).slice(0,5)}
                    genres={genres.map(x => formatName(x[0])).slice(0,5)}
                    totalTime={formatTime(stats.totalTime)}
                    totalMangas={stats.totalMangas}
                    year={year}
                />
            </div>
        {/if}
    </div>
</main>
