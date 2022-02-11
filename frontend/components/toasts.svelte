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
      class="text-md mb-4 flex w-fit items-center rounded-md bg-slate-400/80 p-3 font-semibold text-white sm:max-w-[90vw] md:max-w-prose"
    >
      <svg
        class="mr-3 h-5 w-5 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        /></svg
      >
      {toast}
    </output>
  {/each}
</section>
