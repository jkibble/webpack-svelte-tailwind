<script>
  import { fade, slide } from "svelte/transition";
  import toasts from "/stores/toasts.js";
</script>

<section
  class="pointer-events-none fixed bottom-0 flex w-full flex-col items-center pb-7"
>
  {#each $toasts as toast (toast)}
    <output
      in:slide={{ duration: 500 }}
      out:fade={{ duration: 500 }}
      class="text-md my-2 w-fit max-w-3xl rounded-md bg-slate-400/80 p-3 font-semibold text-white"
      >{toast}</output
    >
  {/each}
</section>
