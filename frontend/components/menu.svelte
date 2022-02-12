<script>
  import menu from "/stores/menu.js";
  import logo from "/assets/logo.svg";

  const items = [
    { href: "/home", title: "Home" },
    { href: "/about", title: "About" },
    { href: "/contact", title: "Contact" },
    { href: "/dashboard", title: "Dashboard" },
    { href: "/firebase", title: "Firebase" },
  ];

  items.forEach((item) => {
    menu.addItem(item);
  });
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
        <a href={item.href}>{item.title}</a>
      </li>
    {/each}
  </ul>
</nav>
