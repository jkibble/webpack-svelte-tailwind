<script>
  import Timer from "/components/Timer.svelte";
  import toasts from "/stores/toasts.js";

  let foo = "random string";

  const randomWord = () => {
    return Math.random().toString(36).slice(2);
  };

  const addToast = () => {
    let content = [];
    let max = Math.floor(Math.random() * (20 - 2 + 1) + 2);

    for (let i = 0; i < max; i++) {
      content.push(randomWord());
    }

    toasts.add(content.join(" "));
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
