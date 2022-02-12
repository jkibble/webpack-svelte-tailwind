<script>
  import Timer from "/components/Timer.svelte";
  import toasts from "/stores/toasts.js";
  import faker from "/lib/faker.js";

  let foo = "random string";

  const addToast = () => {
    let max = Math.floor(Math.random() * (20 - 2 + 1) + 2);

    toasts.add(faker.lorem(max));
  };
</script>

<div class="flex gap-4 bg-red-400">
  <input type="text" bind:value={foo} />
  <h1>Hello {foo}!</h1>
</div>

<button class="rounded-md bg-green-500 p-4" on:click={addToast}
  >Add Toast</button
>

<Timer />
