<script>
  let foo = "bar";
</script>

<input type="text" bind:value={foo} />
<h1>Hello {foo}!</h1>

<style>
  h1 {
    font-weight: bold;
  }
</style>
