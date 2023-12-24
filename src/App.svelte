<script>
  import { getMangaData, getSources, getYears } from "./lib/stats";
  import FileUpload from "./components/FileUpload.svelte";
  import Wrapped from "./components/Wrapped.svelte";
  import Header from "./components/Header.svelte"
  let page = 0;
  let backupData = null;
  let years = [new Date().getFullYear()];
  let sources = {};
  let selectedYear;
  let selectDefault = null;
  let mangaData = null;

  const onUpload = () => {
    if (backupData != null) {
      years = getYears(backupData);
      sources = getSources(backupData);
      selectDefault = years[years.length-1];
      page = 2;
    }
  }

  $: {
    if (selectedYear != null) {
      mangaData = getMangaData(backupData, selectedYear);
    }
  }
</script>

<main class="text-center bg-gradient-to-r from-violet-500 to-fuchsia-500">
  <div class="md:px-52 h-full backdrop-brightness-75">
  {#if backupData != null && page == 2}
    <div>
      <header class="py-12">
        <h1 class="text-amber-100 font-semibold text-xl">This is your retrospective for</h1>
        <div>
          <span class="text-amber-100 font-semibold mr-2 text-xl">the year of</span>
          <select bind:value={selectedYear} class="text-sm py-2 px-4 rounded-md font-semibold bg-pink-50 text-pink-700 hover:bg-pink-100">
            {#each years as y}
              <option value={y} selected={selectDefault == y}>
                {y}
              </option>
            {/each}
          </select>
        </div>
      </header>
      <br />
      {#if mangaData != null}
        <Wrapped {mangaData} {sources} />
      {/if}
      <button class="text-sm text-amber-100 mt-7 underline justify-end cursor-pointer" on:click={() => {page = 0;}}>
        Back to Home
      </button>
    </div>
  {:else if page == 1}
    <div class="flex flex-col justify-around h-screen">
      <Header/>
      <div class="text-amber-100">
        <p class="font-semibold mb-10">
          This is a little side-project to create a personnal recap of the year based on <a href="https://github.com/tachiyomiorg/tachiyomi" class="underline" target="_blank">Tachiyomi</a>'s backup data.
          <br/><br/>
          Everything is done client-side using the <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" class="underline" target="_blank">FileReader</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/API/DecompressionStream" class="underline" target="_blank">DecompressionStream</a> APIs.
          <br/><br/>
          The Web UI is based on <a href="https://svelte.dev" class="underline" target="_blank">Svelte</a> and <a href="https://tailwindcss.com" class="underline" target="_blank">Tailwind</a>. The source code is available <a href="https://github.com/drosoCode/tachiwrapped" class="underline" target="_blank">here</a>.
          <br/><br/>
          Protobuf definition and stubs generated using <a href="https://github.com/clementd64/tachiyomi-backup-models" class="underline" target="_blank">tachiyomi-backup-models</a> and <a href="https://github.com/evanw/pbjs" class="underline" target="_blank">pbjs</a>.
          <br/><br/>
        </p>
        <div>
          <h1 class="font-semibold">Why is my read chapter number so high ?</h1>
          <p class="font-light">
            Tachiyomi's backup, in theory, contains BackupHistory entries for each chapter read with their associated reading time, but quite often some of these entries are missing. To mitigate this, we also consider as read the chapters that were downloaded and marked as read this year (and count their reading time based on an average of the previously available times), but it may still be quite approximative (especially if you used a lot the "mark as read" feature).
          </p>
        </div>
      </div>
      <button class="text-sm text-amber-100 mt-7 underline justify-end cursor-pointer" on:click={() => {page = 0;}}>
        Back to Home
      </button>
    </div>
  {:else}
    <div class="flex flex-col justify-around h-screen">
      <Header/>

      <div>
        <p class="font-semibold mb-10 text-amber-100">
          Discover your year's retrospective<br/>on Tachiyomi !
        </p>
        <FileUpload bind:backupData name={"Select a Backup"} cls="mb-16" on:upload={onUpload}/>

        <h6 class="text-sm mt-7 text-amber-100">
          To create one, go into
          <br />
          Settings > Backup And Restore > Create a Backup
        </h6>
      </div>

      <button class="text-sm text-amber-100 mt-7 underline justify-end cursor-pointer" on:click={() => {page = 1;}}>
        About this project
      </button>
    </div>
  {/if}
  </div>
</main>
