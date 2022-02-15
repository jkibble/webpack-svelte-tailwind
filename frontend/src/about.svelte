<script>
  import { dataset_dev } from "svelte/internal";
  import Modal from "../components/modal.svelte";
  import faker from "/lib/faker.js";
  let foo = "bar";
  let openModal = false;

  const table = async () => {
    return fetch("/table").then((response) => response.json());
  };

  const tableData = table();

  setInterval(() => {
    foo = faker.lorem(2);
  }, 5000);
</script>

<Modal bind:open={openModal} title="here is the title">
  Modal content goes here
  <button
    class="rounded-md bg-green-400 p-5"
    on:click={() => (openModal = false)}>Close</button
  >
</Modal>
<div class="flex gap-4">
  <input type="text" bind:value={foo} />
  <h1>Hello {foo}!</h1>
</div>

<button class="rounded-md bg-green-200 p-4" on:click={() => (openModal = true)}
  >Open Modal</button
>

{#await tableData then data}
  <div class="m-2 mt-10 rounded-t-xl p-3">
    <table class="w-full">
      <thead>
        <tr class="border-b border-b-orange-400 divide-x-2">
          {#each data.header as header}
            <th>{header}</th>
          {/each}
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-300">
        {#each data.body as row}
          <tr class="divide-x divide-gray-300">
            {#each row as cell}
              <td class="pl-2">{cell}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/await}

<svelte:head>
  <title>Svelte App</title>
</svelte:head>
