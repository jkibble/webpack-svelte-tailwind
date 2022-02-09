<script lang="ts">
  let foo: string;

  setInterval((): void => {
    foo = Math.random().toString();
  }, 2000);
</script>

<div class="flex gap-4 bg-red-400">
  <input type="text" bind:value={foo} />
  <h1>Hello {foo}!</h1>
</div>

<style>
  input {
    background-color: yellow;
    @apply hover:bg-red-900 rounded-md;
  }

  h1 {
    background-color: blue;
    @apply rounded-md p-10;
  }
</style>
