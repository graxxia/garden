<script>
  import Plant from "./Plant.svelte";
  import { onMount } from "svelte";
  import List, { Item, Text, Graphic } from "@smui/list";
  import { getData } from "../src/serverReq";
  import Icon from "@smui/list";

  const apiUrl = "http://localhost:5000/plants/";

  let data = [];
  let plantData = [];

  onMount(async () => {});

  const searchPlant = async () => {
    let input = document.getElementById("searchInput").value;
    input = input.toLowerCase();
    input = input.charAt(0).toUpperCase() + input.slice(1);
    console.log(input);
    plantData = await getData(
      `${apiUrl}${input}`,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWRlOTQwZmQ4MGE2ZDUwN2MxMTFmZjQiLCJpYXQiOjE1OTE4ODM1MDN9.s9ryYHnlV2yLFscnrBVwimaso-i_cVMtz8Jjh_ziOw0"
    );
    input = input.toLowerCase();
    let x = document.getElementsByClassName("plants");
    for (let i = 0; i < x.length; i++) {
      if (!x[i].innerHTML.toLowerCase().includes(input)) {
        x[i].style.display = "none";
      } else {
        x[i].style.display = "list-item";
      }
    }

    console.log(await plantData);
  };
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
    font-size: 30px;
  }

  #list {
    list-style: none;
    margin: 0px;
    padding: 0px;
  }
  button {
    background-color: white;
    border: 0px;
  }

  input {
    width: 300px;
    height: 50px;
  }
</style>

<div class="mdc-layout-grid">

  <form on:input={searchPlant}>
    <input
      type="text"
      id="searchInput"
      on:input={searchPlant}
      placeholder="Search..."
      name="search"
      class="shaped-outlined"
      style="margin-top:15px; border-radius:50px;" />
    <button type="submit" value="search">
      <Icon class="material-icons">search</Icon>
    </button>
  </form>

</div>

{#await plantData}
  loading
{:then plantIndex}
  <ul id="list">
    {#each plantIndex as plant}
      <li class="plants">
        <a href="/plants/{plant.name}">{plant.name}</a>
      </li>
    {/each}
  </ul>
{/await}
