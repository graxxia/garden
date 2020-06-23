<script>
  import Plant from "./Plant.svelte";
  import { onMount } from "svelte";
  import List, { Item, Text, Graphic } from "@smui/list";
  import { getData } from "../src/serverReq";

  const apiUrl = "http://localhost:5000/plant/";

  let data = [];
  let plantData = [];

  onMount(async () => {});

  function searchPlant() {
    let input = document.getElementById("searchInput").value;
    input = input.toLowerCase();
    plantData = getData(
      `${apiUrl}${input}`,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWRlOTQwZmQ4MGE2ZDUwN2MxMTFmZjQiLCJpYXQiOjE1OTE4ODM1MDN9.s9ryYHnlV2yLFscnrBVwimaso-i_cVMtz8Jjh_ziOw0"
    );
    let x = document.getElementsByClassName("plants");
    for (let i = 0; i < x.length; i++) {
      if (!x[i].innerHTML.toLowerCase().includes(input)) {
        x[i].style.display = "none";
      } else {
        x[i].style.display = "list-item";
      }
    }
  }
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

  <div class="search-container">
    <form
      on:submit|preventDefault={searchPlant}
      on:changed={searchPlant}
      on:input={searchPlant}>
      <input
        type="text"
        id="searchInput"
        on:input={searchPlant}
        on:keyup={searchPlant}
        on:blur={searchPlant}
        placeholder="Search..."
        name="search" />
      <button type="submit" value="search" />
    </form>
  </div>

  <!-- <List class="plantlist">
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
  </List> -->
</div>
{#await plantData}
  loading
{:then plantIndex}
  <ul id="list">
    {#each plantIndex as plant}
      <li class="plants">{plant.name}</li>
    {/each}
  </ul>
{/await}
