<script>
  import { postData } from "../src/serverReq";
  import { getCookie, checkCookie } from "../src/cookie.js";
  import { onMount } from "svelte";
  import Fab, { Icon } from "@smui/fab";
  import router from "page";

  import Card, {
    Content,
    PrimaryAction,
    Media,
    MediaContent,
    Actions,
    ActionButtons,
    ActionIcons
  } from "@smui/card";
  let logoimgsmall = "/gardeniasmall.svg";
  let cookieValue = [];
  const apiUrl = "http://localhost:5000/plants/create";
  let data = [];

  async function handleSubmit(event) {
    if (!checkCookie("user-token")) return;
    console.log(event.target.name.value);
    data = await postData(
      apiUrl,
      {
        name: event.target.name.value,
        family: event.target.family.value,
        species: event.target.species.value,
        category: event.target.category.value,
        height: event.target.height.value,
        spacing: event.target.spacing.value,
        sun: event.target.sun.value,
        water: event.target.water.value,
        propogation: event.target.propogation.value,
        collectionMethod: event.target.collectionMethod.value,
        region: event.target.region.value,
        hardiness: event.target.region.value,
        image: event.target.image.value
      },
      cookieValue.token
    );
    console.log(data);
  }

  onMount(async () => {
    cookieValue = JSON.parse(getCookie("user-token"));
  });
</script>

<style>
  .mdc-layout-grid {
    background-color: #e3f5bb;
  }
  .card-container {
    display: inline-block;
    justify-content: center;
    align-items: center;
    min-height: 500px;
    min-width: 380px;
    background-color: #f8f8f8;
  }
  form {
    margin: 4em 2em;
  }

  label {
    text-transform: uppercase;
    margin-top: 0.5em;
    margin-bottom: 0.2em;
    color: #648f01;
  }
  input {
    width: 500px;
    height: 50px;
  }

  .gardeniasmall {
    width: 100px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>

<div class="mdc-layout-grid">
  <div class="mdc-layout-grid__inner">

    <div class="mdc-layout-grid__cell" />
    <div class="mdc-layout-grid__cell">

      <div class="card-container">
        <h1>Add a Plant</h1>
        <Card style="width: 600px;">
          <img src={logoimgsmall} class="gardeniasmall" alt="Gardenia Logo" />

          <form on:submit|preventDefault={handleSubmit}>

            <label for="name">Name</label>
            <input id="name" />
            <br />
            <label for="family">Family</label>
            <input id="family" />
            <br />
            <label for="genus">Genus</label>
            <input id="genus" />
            <br />
            <label for="species">Species</label>
            <input id="species" />
            <br />
            <label for="category">Category</label>
            <input id="category" />
            <br />
            <label for="sun">Sun</label>
            <input id="sun" />
            <br />
            <label for="water">Water</label>
            <input id="water" />
            <br />
            <label for="hardiness">Hardiness</label>
            <input id="hardiness" />
            <br />
            <label for="folliage">Folliage</label>
            <input id="folliage" />
            <br />
            <label for="height">Height</label>
            <input id="height" />
            <br />
            <label for="spacing">Spacing</label>
            <input id="spacing" />
            <br />
            <label for="color">Color</label>
            <input id="color" />
            <br />
            <label for="soil">Soil</label>
            <input id="soil" />
            <br />
            <label for="propogation">Propogation</label>
            <input id="propogation" />
            <br />
            <label for="collectionMethod">Collection Method</label>
            <input id="collectionMethod" />
            <br />
            <label for="region">Region</label>
            <input id="region" />
            <br />
            <label for="image">Image</label>
            <input id="image" />
            <br />
            <button
              type="submit"
              class="mdc-button mdc-button--raised"
              style="margin-top:15px; border-radius:50px;">
              <Icon class="material-icons">add</Icon>
              Add Plant
            </button>
            <br />
          </form>
          {#await data}

            <p>Getting server message</p>

          {:then addition}
            {#if addition.message !== undefined}
              <p>{addition.message}</p>
            {/if}

          {/await}
        </Card>
      </div>

    </div>
    <div class="mdc-layout-grid__cell" />

  </div>

</div>
