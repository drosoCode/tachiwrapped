<script>
    import { decodeBackup } from "../lib/tachiyomi_pb";
    export let backupData;
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
        });
        reader.readAsArrayBuffer(file);
        return;
      }
    }
  </script>
  
<main>
    <input type="file" accept=".proto.gz" on:change={onUploadChange} bind:this={input} />
</main>