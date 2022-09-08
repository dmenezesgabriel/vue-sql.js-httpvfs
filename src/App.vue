<script setup>
import { createDbWorker } from "sql.js-httpvfs";
import { onMounted, ref } from "vue";

const result = ref(null);

// Instance Worker
const workerUrl = new URL("/sql.js-httpvfs/sqlite.worker.js", import.meta.url);
const wasmUrl = new URL("/sql.js-httpvfs/sql-wasm.wasm", import.meta.url);

const config = {
  from: "inline",
  config: {
    serverMode: "full", // file is just a plain old full sqlite database
    requestChunkSize: 4096, // the page size of the  sqlite database (by default 4096)
    url: "/db.sqlite", // url to the database (relative or full)
  },
};

onMounted(async () => {
  let maxBytesToRead = 10 * 1024 * 1024;
  const worker = await createDbWorker(
    [config],
    workerUrl.toString(),
    wasmUrl.toString(),
    maxBytesToRead // optional, defaults to Infinity
  );

  result.value = await worker.db.query(`select count(*) from superstore`);

  console.log(await worker.worker.bytesRead);
  console.log(result.value);

  worker.worker.bytesRead = 0;
});
</script>

<template>
  <header></header>

  <main>
    <h1>hello</h1>
    <pre>{{ result }}</pre>
  </main>
</template>
