<script lang="ts">
  import Timer from "../components/Timer.svelte";

  let foo: string;

  setInterval((): void => {
    foo = Math.random().toString();
  }, 2000);
</script>

<div class="flex gap-4 bg-red-400">
  <input type="text" bind:value={foo} />
  <h1>Hello {foo}!</h1>
</div>

<Timer />