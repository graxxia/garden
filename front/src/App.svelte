<script>
  export let name;
  import Button from "@smui/button";
  let clicked = 1;
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>Hello {name}!</h1>
<Button>{(clicked += 1)}</Button>
