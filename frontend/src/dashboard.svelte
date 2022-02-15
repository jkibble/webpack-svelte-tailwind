<script>
  import faker from "/lib/faker.js";
  import toast from "/stores/toasts.js";

  let cards = [];

  for (let i = 0; i < 10; i++) {
    cards.push({ title: faker.lorem(5), body: faker.lorem(20) });
  }

  const addToast = () => {
    toast.add(faker.lorem(5));
  };
</script>

<button class="rounded-md bg-red-400 p-4" on:click={addToast}>Add Toast</button>

<section class="cards m-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
  {#each cards as card, i}
    <div class="rounded-md bg-slate-700 p-2 text-white">
      <div class="p-2 text-center font-semibold drop-shadow">
        {card.title}
      </div>
      <hr />
      <div class="flex py-2">
        <img
          width="150"
          height="200"
          src="https://picsum.photos/{150 + i}/{200 + i}"
          alt="lorem"
          class="mx-3 rounded-sm"
        />
        <span>{card.body}</span>
      </div>
    </div>
  {/each}
</section>

<style>
  img {
    max-width: 100%;
  }
</style>
