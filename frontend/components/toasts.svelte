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
      class="mb-4 flex w-fit items-center rounded-md border border-white bg-slate-600/80 p-3 text-sm font-semibold text-white sm:max-w-[90vw] md:max-w-prose md:text-base"
    >
      <span class="mr-3 h-5 w-5 flex-shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          role="presentation"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>
      <span>{toast}</span>
    </output>
  {/each}
</section>
