<script>
  import menu from "/stores/menu.js";
  import logo from "/assets/logo.svg";
  import Modal from "/components/modal.svelte";

  const items = [
    { href: "/home", title: "Home" },
    { href: "/about", title: "About" },
    { href: "/contact", title: "Contact" },
    { href: "/dashboard", title: "Dashboard" },
    { href: "/app", title: "App" },
    { title: "Login", component: Modal },
    { href: "/logout", title: "Logout" },
  ];

  items.forEach((item) => {
    menu.addItem(item);
  });

  let modalOpen = false;
</script>

<nav
  class="flex w-full items-center gap-4 bg-slate-500/90 p-2 text-white shadow-lg "
>
  <ul class="flex gap-4">
    <li class="flex items-center">
      <a href="/"><img src={logo} alt="logo" class="h-7 w-7" /></a>
    </li>
    {#each $menu as item}
      <li class="m-0 rounded-md bg-inherit py-1 px-2 hover:bg-slate-500">
        {#if item.href}
          <a href={item.href}>{item.title}</a>
        {:else}
          <button on:click={() => (modalOpen = true)}>
            {item.title}
          </button>
          <svelte:component
            this={item.component}
            title="login"
            bind:open={modalOpen}
          />
        {/if}
      </li>
    {/each}
  </ul>
</nav>
