<script>
    import { printStats } from "../lib/stats";
    export let mangaData;
    
    $: {
        console.log(printStats(mangaData));
    }
</script>

<main>
</main>