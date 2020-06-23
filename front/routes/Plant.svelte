<script>
  import { onMount } from "svelte";
  import { getCookie, checkCookie } from "../src/cookie.js";

  export let params;
  import { getData, fetchData } from "../src/serverReq";
  const apiUrl = "http://localhost:5000/plants/";
  let data = [];

  onMount(async () => {
    const searchTerm = params.name;
    if (checkCookie("user-token") === undefined) return;
    let cookieVal = JSON.parse(getCookie("user-token"));
    data = await getData(apiUrl + searchTerm, cookieVal.token);
    data = data[0];
    console.log(data);
  });
</script>

<style>
  .mdc-layout-grid {
    width: 80%;
  }
</style>

{#await data}
  <p>Retrieving plant information</p>
{:then plant}
  <div class="mdc-layout-grid">
    <h1>Plants</h1>
    <img src={data.image} alt="{plant.genus} {plant.species}" />
    <h2>{plant.name}</h2>
    <h3>Family</h3>
    <p>{plant.family}</p>
    <h3>Species</h3>
    <p>{plant.species}</p>
    <h3>Category</h3>
    <p>{plant.category}</p>
    <h3>Height</h3>
    <p>{plant.height}</p>
    <h3>Spacing</h3>
    <p>{plant.spacing}</p>
    <h3>Sun Requirements</h3>
    <p>{plant.sun}</p>
    <h3>Water Requirements</h3>
    <p>{plant.water}</p>
    <h3>Propogation</h3>
    <p>{plant.propogation}</p>
    <h3>Collection Method</h3>
    <p>{plant.collectionMethod}</p>
    <h3>Hardiness</h3>
    <p>{plant.hardiness}</p>
  </div>
{/await}
