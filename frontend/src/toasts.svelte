<script lang="ts">
  import { toasts } from "../stores/toasts.js";

  toasts.update(() => ['here is a message']);
</script>

{#each $toasts as toast}
  <output class="toast my-2 w-fit rounded-md bg-slate-400/80 p-2 text-white"
    >{toast}</output
  >
{/each}

<style>
  @keyframes append-animate {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0%);
      opacity: 1;
    }
  }

  output {
    transition: all 0.5s ease-in-out;
    animation: append-animate 0.5s ease-in-out;
  }
</style>
