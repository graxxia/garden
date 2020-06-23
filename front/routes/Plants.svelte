<script>
  import { router } from "page";
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
  .mdc-layout-grid {
    background-color: #f8f8f8;
    background-image: url("/image2.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    display: inline-block;
    padding: 0px;
  }
  * :global(.plantlist) {
    background-color: white;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  * :global(.material-icons) {
    color: rgb(196, 219, 159);
  }

  h1 {
    color: whitesmoke;
    text-shadow: 1px 1px #585858;

    font-size: 4em;
  }
</style>

<div class="mdc-layout-grid">
  <h1>Plants</h1>
  <List class="plantlist">

    {#each data as item}
      <Item>

        <Graphic class="material-icons">eco</Graphic>
        <Text>
          <a href="/plants/{item.name.substr(0, item.name.indexOf(' '))}">
            {item.name}
          </a>
        </Text>
      </Item>
    {/each}
  </List>
</div>
