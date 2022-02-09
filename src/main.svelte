<script>
  let foo = "bar";
  import "./style.css";
</script>

<div class="flex bg-red-400">
  <input type="text" bind:value={foo} />
  <h1>Hello {foo}!</h1>
</div>

<style>
  input {
    background-color: yellow;
  }
</style>
