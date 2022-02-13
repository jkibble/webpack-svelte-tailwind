<script>
  import { dataset_dev } from "svelte/internal";
  import faker from "/lib/faker.js";
  let foo = "bar";

  const table = async () => {
    return fetch("/table").then((response) => response.json());
  };

  const tableData = table();

  setInterval(() => {
    foo = faker.lorem(2);
  }, 5000);
</script>

<div class="flex gap-4">
  <input type="text" bind:value={foo} />
  <h1>Hello {foo}!</h1>
</div>

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
