<script>
  let foo = "bar";
  let bar = "foo";
  import "./style.css";
</script>

<input type="text" bind:value={foo} />
<h1>Hello {foo}!</h1>

<style>
  h1 {
    font-weight: bold;
  }
</style>
