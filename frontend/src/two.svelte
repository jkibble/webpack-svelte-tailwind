<script lang="ts">
  let foo: string = "bar";

  setInterval((): void => {
    foo = Math.random().toString(36).replace(/[^a-z]+/g, '');
  }, 2000);
</script>

<div class="flex gap-4">
  <input type="text" bind:value={foo} />
  <h1>Hello {foo}!</h1>
</div>

<svelte:head>
  <title>Svelte App</title>
</svelte:head>