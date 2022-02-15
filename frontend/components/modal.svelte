<script>
  import { fade, slide } from "svelte/transition";
  export let open = false;
  export let title = "";

  const openModal = () => {
    const body = document.body;
    body.style.overflow = "hidden";
    body.addEventListener("keydown", handleClose);
    open = true;
  };

  const closeModal = () => {
    const body = document.body;
    body.style.overflow = "";
    body.removeEventListener("keydown", handleClose);
    open = false;
  };

  const handleClose = (e) => {
    if (e.key === "Escape" || e.type === "click") {
      closeModal();
    }
  };

  $: {
    if (open) {
      openModal();
    } else {
      closeModal();
    }
  }
</script>

{#if open}
  <div
    transition:slide={{ duration: 200 }}
    on:click={handleClose}
    class="fixed top-0 left-0 grid h-screen w-full place-items-center items-center border bg-slate-700/70 align-middle backdrop-blur"
  >
    <div class="fixed m-auto rounded-lg bg-white p-8 font-bold">
      {#if title}
        <h4 class="border-b-2 border-gray-500">{title}</h4>
      {/if}
      <div class="pt-4">
        <slot />
      </div>
    </div>
  </div>
{/if}
