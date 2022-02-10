<script lang="ts">
  import Timer from "../components/Timer.svelte";

  let foo: string;

  setInterval((): void => {
    foo = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "");
  }, 2000);

  const addToast = () => {
    const content = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "");
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
