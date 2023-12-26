<script>
  import { getMangaData, getSources, getYears } from "./lib/stats";
  import FileUpload from "./components/FileUpload.svelte";
  import Wrapped from "./components/Wrapped.svelte";
  import Header from "./components/Header.svelte"
  import SvgIcon from "@jamescoyle/svelte-icon";
  import { mdiArrowDownBoldCircle } from "@mdi/js"
  let page = 0;
  let backupData = null;
  let years = [new Date().getFullYear()];
  let sources = {};
  let selectedYear;
  let selectDefault = null;
  let mangaData = null;
  let scrollBtnShow;
  let scrollBtnClick;
  let container;

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

<div>
  {#if scrollBtnShow && page == 2}
  <button style="width: 10rem;" class="z-10 fixed bottom-4 inset-x-0 mx-auto inline-flex items-center justify-center p-0.5 mb-2 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 text-white text-sm" on:click={scrollBtnClick}>
    <span style="width: 9.8rem;" class="px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0 flex flex-row items-center justify-around">
      <SvgIcon type="mdi" path={mdiArrowDownBoldCircle} size={24}></SvgIcon>
      Scroll Down
    </span>
  </button>
  {/if}

  <main bind:this={container} class="max-h-screen overflow-y-scroll text-center bg-gradient-to-r from-violet-500 to-fuchsia-500 z-0">
    <div class="px-4 md:px-52 h-full backdrop-brightness-75" style={page == 2 ? "min-height: 200vh;" : ""}>
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
          <Wrapped {mangaData} {sources} bind:scrollBtnShow bind:scrollBtnClick {container} year={selectedYear} />
        {/if}
        <button class="text-sm text-amber-100 mt-7 underline justify-end cursor-pointer mr-6 mb-6" on:click={() => {container.scrollTo({top: 0, behavior: 'smooth'})}}>
          Go to Top
        </button>
        <button class="text-sm text-amber-100 mt-7 underline justify-end cursor-pointer mb-6" on:click={() => {page = 0;}}>
          Back to Home
        </button>
      </div>
    {:else if page == 1}
      <div>
        <Header/>
        <div class="text-amber-100 mt-10">
          <p class="font-semibold">
            This is a little side-project to create a personnal recap of the year based on <a href="https://github.com/tachiyomiorg/tachiyomi" class="underline" target="_blank">Tachiyomi</a>'s backup data. 
            <br/>
            It is not affiliated in any way with Tachiyomi.
            <br/><br/>
            Everything is done client-side using the <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" class="underline" target="_blank">FileReader</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/API/DecompressionStream" class="underline" target="_blank">DecompressionStream</a> APIs.
            <br/><br/>
            The Web UI is based on <a href="https://svelte.dev" class="underline" target="_blank">Svelte</a> and <a href="https://tailwindcss.com" class="underline" target="_blank">Tailwind</a>. The source code is available <a href="https://github.com/drosoCode/tachiwrapped" class="underline" target="_blank">here</a>.
            <br/><br/>
            Protobuf definition and stubs generated using <a href="https://github.com/clementd64/tachiyomi-backup-models" class="underline" target="_blank">tachiyomi-backup-models</a> and <a href="https://github.com/evanw/pbjs" class="underline" target="_blank">pbjs</a>.
            <br/><br/>
          </p>
          <div class="mt-6">
            <h1 class="font-semibold">Why is my read chapter number so high ?</h1>
            <p class="font-light">
              Tachiyomi's backup, in theory, contains BackupHistory entries for each chapter read with their associated reading time, but quite often some of these entries are missing. To mitigate this, we also consider as read the chapters that were downloaded and marked as read this year (and count their reading time based on an average of the previously available times), but it may still be quite approximative (especially if you used a lot the "mark as read" feature).
            </p>
          </div>
          <div class="mt-4">
            <h1 class="font-semibold">Why are some images missing ?</h1>
            <p class="font-light">
              Images are loaded directly using the url provided in the backup, the url may be blocked if some headers are missing (ex: mangahere), or may be invalid (the image shown in tachiyomi is cached, so it still show even if the url to the file is no longer valid).
            </p>
          </div>
          <div class="mt-4">
            <h1 class="font-semibold">What are these statistics ?</h1>
            <p class="font-light text-sm">
              Total Chapters: the total number of chapters read during the year <br/>
              Total Time: the total time spent reading during the year (based on total chapters) <br/>
              Total Manga: the number of different mangas read during the year <br/>
              Most Active Month: the month where you read the most chapters <br/>
              Up To Date Mangas: Mangas that have their latest chapter marked as read <br/>
              Fully Read Mangas: Mangas were read from first to last chapter exclusively during the year <br/>
              Preferred Authors: the authors ranked by the number of read chapters <br/>
              Categories: genres ranked by the number of read chapters <br/>
              Sources: sources ranked by the number of read chapters <br/>
              Read in no time: mangas that were read from first to last chapter in the least of time <br/>
              Preferred Mangas: mangas ranked by the number of read chapters <br/>
              Reading History: chart of read chapters by months
            </p>
          </div>
        </div>
        <button class="text-sm text-amber-100 mt-7 mb-4 underline justify-end cursor-pointer" on:click={() => {page = 0;}}>
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
</div>