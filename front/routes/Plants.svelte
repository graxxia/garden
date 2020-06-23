<script>
  import { onMount } from "svelte";
  import List, { Item, Text, Graphic } from "@smui/list";

  import Search from "../routes/Search";

  const apiUrl = "http://localhost:5000/plants";

  let data = [];

  onMount(async () => {
    const response = await fetch(apiUrl);
    data = await response.json();
  });
</script>

<style>
  * :global(.plantlist) {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  * :global(.material-icons) {
    color: rgb(196, 219, 159);
  }
</style>

<div class="mdc-layout-grid">
  <h1>Plants</h1>

  <List class="plantlist">
    {#each data as item}
      <Item>

        <Graphic class="material-icons">eco</Graphic>
        <Text>
          <a href="/plant/{item.name.substr(0, item.name.indexOf(' '))}">
            {item.name}
          </a>
        </Text>
      </Item>
    {/each}
  </List>
</div>

<Search />
