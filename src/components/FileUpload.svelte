<script>
  import { decodeBackup } from "../lib/tachiyomi_pb";
  import { createEventDispatcher } from 'svelte';
  export let backupData;
  export let name;
  export let cls;
	const dispatch = createEventDispatcher();
  let input;

  function onUploadChange() {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", async function () {
        const ds = new DecompressionStream("gzip");
        const writer = ds.writable.getWriter();
        writer.write(reader.result);
        writer.close();
        const output = [];
        const reader2 = ds.readable.getReader();
        let totalSize = 0;
        while (true) {
          const { value, done } = await reader2.read();
          if (done) break;
          output.push(value);
          totalSize += value.byteLength;
        }
        const concatenated = new Uint8Array(totalSize);
        let offset = 0;
        for (const array of output) {
          concatenated.set(array, offset);
          offset += array.byteLength;
        }

        backupData = decodeBackup(concatenated);
        dispatch('upload');
      });
      reader.readAsArrayBuffer(file);
      return;
    }
  }
</script>

<main class={cls}>
  <input
    type="file"
    accept=".proto.gz,.tachibk"
    id="input_backup"
    on:change={onUploadChange}
    bind:this={input}
    hidden
  />
  <label
    for="input_backup"
    class="text-sm py-2 px-4 rounded-md font-semibold bg-pink-50 text-pink-700 hover:bg-pink-100 hover:shadow-xl"
    >{name}</label
  >
</main>
