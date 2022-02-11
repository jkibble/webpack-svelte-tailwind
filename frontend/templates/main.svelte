<script>
  import Menu from "/components/menu.svelte";
  import Main from "/{file}";
  import Toasts from "/components/toasts.svelte";
  import "/src/style.css";
</script>

<header>
  <Menu />
</header>
<main>
  <Main />
</main>
<footer>
  footer content goes here
  <Toasts />
</footer>
