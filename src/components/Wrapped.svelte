<script>
    import { getStats } from "../lib/stats";
    export let mangaData;

    $: {
        console.log(getStats(mangaData));
    }
</script>

<main>
</main>