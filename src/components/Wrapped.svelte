<script>
    import { Duration } from "luxon";
    import { getStats } from "../lib/stats";
    import Chart from "./Chart.svelte";

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

<main>
    Chapitres Lus: {stats.totalChapters} pour {stats.totalMangas} titres
    <br/>
    Temps Total: {formatTime(stats.totalTime)}
    <br/>

    Vos auteurs les plus lus sont:
    <br/>
    Par Mangas:
    <ul>
    {#each authorsByNb as an}
        <li>{an[1].length} titres de {formatName(an[0])}: {an[1].join(", ")}</li>
    {/each}
    </ul>
    <br/>
    Par Chapitres:
    <ul>
    {#each authorsByChap as ac}
        <li>{formatName(ac[0])}: {ac[1]}</li>
    {/each}
    </ul>

    <br/>
    Vos genres préférés sont:
    {#each genres as g}
        <li>{formatName(g[0])}: {g[1]}</li>
    {/each}

    <br/>
    Vos sources préférées sont:
    {#each prefSources as s}
        <li>{formatName(sources[s[0]])}: {s[1]}</li>
    {/each}

    <br/>
    Vos mangas les plus lus sont:
    {#each mostRead as m}
        <li>
            {m[0]}: {m[1]}
            <img src={mangaData[m[0]].image}/>
        </li>
    {/each}

    <br/>
    Les mangas lus entièrement cette année:
    {#each fullyRead as m}
        <li>{m[0]}: {m[1]}</li>
    {/each}

    <br/>
    Mangas lus les plus rapidement:
    {#each fastestRead as m}
        <li>{m[0]}</li>
    {/each}

    <br/>
    Mois le plus actif: {months[mostActiveMonth[0]]} : {formatTime(mostActiveMonth[1].time)}
    <br/>
    Mangas à jours: {Math.round(stats.upToDateMangas/stats.totalMangas*100)}% ({stats.upToDateMangas}/{stats.totalMangas})
    <br/>
    Graphe:
    <Chart byMonth={stats.byMonth} width={400} height={200}/>

</main>
