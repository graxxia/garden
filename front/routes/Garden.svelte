<script>
  import { trefleKey } from "./../APIkeys/trefle.js";
  import { onMount } from "svelte";
  import Fab, { Icon } from "@smui/fab";
  import { getCookie, checkCookie } from "../src/cookie.js";
  export let params;

  import Card, {
    Content,
    PrimaryAction,
    Media,
    MediaContent,
    Actions,
    ActionButtons,
    ActionIcons
  } from "@smui/card";
  import Button, { Label } from "@smui/button";
  import IconButton from "@smui/icon-button";
  import List, { Item, Text } from "@smui/list";

  let leafimage = "leaf.jpg";

  let error_boolean = false;
  let loginMsg = "";
  const apiUrl = "http://localhost:5000/container/";
  let data = [];
  let loggedIn = checkCookie("user-token");
  let userData;
  let containerData = [];
  let cookieVal;
  let userId;
  async function getData(url = "", token) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", //POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer" // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async function fetchData(url = "", data = {}, method = "") {
    // Default options are marked with *
    const response = await fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    r;
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async function handleSubmit(event) {
    event.target.uom.value;

    const containerData = await fetchData(
      `http://localhost:5000/container/create/${cookieVal}`,
      {
        name: event.target.name.value,
        depth: event.target.depth.value,
        height: event.target.height.value,
        length: event.target.length.value,
        id: userId
      },
      "POST"
    );
  }
  function validateMessageUsername(event) {
    let textbox = event.target;
    error_boolean = false;
    if (textbox.value === "") {
      textbox.setCustomValidity("Required field");
    } else if (textbox.validity.typeMismatch) {
      error_boolean = true;
      textbox.setCustomValidity("please enter a valid name");
    } else {
      textbox.setCustomValidity("");
    }
    return true;
  }

  onMount(async () => {
    const searchTerm = params;
    if (loggedIn) {
      getCookie("user-token");
      cookieVal = JSON.parse(getCookie("user-token"));
      userData = await getData(
        `http://localhost:5000/users/name/${cookieVal.username}`,
        cookieVal.token
      );
      userId = await userData.id;
      containerData = await getData(
        `http://localhost:5000/container/${userId}`,
        cookieVal.token
      );
      console.log(containerData[0].name);
      // check if they already have containers
      // if they do, display those with the {#each container} shenanigans
      // make those containers editable
      // when they exist with a plant provide feedback
    }
  });

  function doSomething() {
    document.getElementById("createForm").classList.remove("hidden");
    document.getElementById("reveal-form").classList.add("hidden");
  }
</script>

<style>
  .hidden {
    display: none;
  }

  .card-container {
    display: inline-block;
    justify-content: center;
    align-items: center;
    min-height: 500px;
    min-width: 380px;
    background-color: #f8f8f8;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  p {
    text-align: center;
    text-transform: uppercase;
  }

  .addcontainer {
    text-align: center;
  }

  * :global(.card-media-16x9) {
    background-image: url("/leaf.jpg");
    height: 250px;
  }

  label,
  option,
  select {
    margin: 0.5em 0px;
    text-transform: uppercase;
  }
</style>

<div class="mdc-layout-grid">

  <!--   {#if loggedIn}
    <form
      id="createForm"
      class="hidden"
      on:submit|preventDefault={handleSubmit}
      on:invalid={validateMessageUsername}
      on:changed={validateMessageUsername}
      on:input={validateMessageUsername}>
      <label>Input dimensions of your plant's container.</label>
      <label for="name">Name</label>
      <input required type="name" id="name" />
      {#if error_boolean}
        <h1>OH NO! AN ERRROR!</h1>
      {/if}

      <label>Choose a Unit of Measurement:</label>
      <select name="Measurement unit" id="uom">
        <option value="metric">Metric</option>
        <option value="Imperial">Imperial</option>
      </select>

      <label for="depth">Depth</label>
      <input required type="depth" id="depth" />

      <label for="height">Height</label>
      <input required type="height" id="height" />

      <label for="length">Length</label>
      <input required type="length" id="length" />

      <button type="submit">Create container</button>

      <label>{loginMsg}</label>
    </form>

    {#await containerData}
      <p>...Fetching your containers!</p>
    {:then containers}
      {#each containers as container}
        <p>{container.name}</p>
      {/each}
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}

    <Fab on:click={doSomething} id="reveal-form">
      <Icon class="material-icons">add</Icon>
    </Fab>
  {/if}
 -->
  <h1>My Garden</h1>
  {#if loggedIn}
    <div class="card-container">

      <Card style="width: 400px;">
        <PrimaryAction>
          <Media class="card-media-16x9" aspectRatio="16x9" />
          <Content class="mdc-typography--body2">
            <h1 class="mdc-typography--headline6" style="margin: 0;">
              <span class="mdc-tab__icon material-icons" aria-hidden="true">
                spa
              </span>
              My Garden
            </h1>
            <h2
              class="mdc-typography--subtitle2"
              style="margin: 0 0 10px; color: #888;">
              My Plant
            </h2>
            <p>Input dimensions of your plant's container:</p>
          </Content>
        </PrimaryAction>
        <Actions>
          <form
            id="createForm"
            class="hidden"
            on:submit|preventDefault={handleSubmit}
            on:invalid={validateMessageUsername}
            on:changed={validateMessageUsername}
            on:input={validateMessageUsername}>

            <label for="name">Name</label>
            <input required type="name" id="name" />
            {#if error_boolean}
              <p>OH NO! AN ERRROR!</p>
            {/if}

            <label>Choose a Unit of Measurement:</label>
            <select name="Measurement unit" id="uom">
              <option value="metric">Metric</option>
              <option value="Imperial">Imperial</option>
            </select>

            <label for="depth">Depth</label>
            <input required type="depth" id="depth" />

            <label for="height">Height</label>
            <input required type="height" id="height" />

            <label for="length">Length</label>
            <input required type="length" id="length" />

            <ActionButtons>
              <div>
                <Button
                  type="submit"
                  class="mdc-button mdc-button--raised"
                  style="margin-top:15px;">
                  <span class="mdc-button__label">Create container</span>
                </Button>
              </div>
              <label>{loginMsg}</label>

            </ActionButtons>
          </form>

        </Actions>
      </Card>
      <div class="addcontainer">

        {#await containerData}
          <p>...Fetching your containers!</p>
        {:then containers}
          {#each containers as container}
            <h5>{container.name}</h5>
          {/each}
        {:catch error}
          <p style="color: red">{error.message}</p>
        {/await}

        <Fab on:click={doSomething} id="reveal-form">

          <Icon class="material-icons">add</Icon>
        </Fab>

      </div>

    </div>
  {/if}
</div>
