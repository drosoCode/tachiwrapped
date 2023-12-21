<script>
  import { getMangaData, getYears } from "./lib/stats";
  import FileUpload from "./components/FileUpload.svelte"; 
  import Wrapped from "./components/Wrapped.svelte";
  let backupData = null;
  let years = [new Date().getFullYear()];
  let selectedYear = null;
  let mangaData = null;

  $:{
    if(backupData != null)
      years = getYears(backupData);
  }

  $: {
    if(selectedYear != null)
      mangaData = getMangaData(backupData, selectedYear);
  }
</script>

<main>
    {#if backupData == null}
      <FileUpload bind:backupData/>
    {:else}
      <select bind:value={selectedYear}>
        {#each years as y}
          <option value={y}>
            {y}
          </option>
        {/each}
      </select>
      <br/>
      {#if mangaData != null}
        <Wrapped mangaData={mangaData}/>
      {/if}
    {/if}
</main>
