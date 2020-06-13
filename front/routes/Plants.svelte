<script>
  import { onMount } from "svelte";

  const apiUrl = "http://localhost:5000/plants";

  let data = [];

  onMount(async () => {
    const response = await fetch(apiUrl);
    data = await response.json();
  });
</script>

<h1>Plants</h1>

{#each data as item}
  <div>
    <h5>
      <a href="/plant/{item.name.substr(0, item.name.indexOf(" "))}">{item.name}</a>
    </h5>
  </div>
{/each}
