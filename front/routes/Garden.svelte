<script>
	import Plant from './Plant.svelte';
  import { trefleKey } from "./../APIkeys/trefle.js";
  import { onMount } from "svelte";
  import Fab, {Icon} from '@smui/fab';
  import Select, {Option} from '@smui/select';
    import Textfield from '@smui/textfield'
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
  let plantData = [];
  let cookieVal;
  let userId;
  let plantIds = [];
  let uom = ['Metric', 'Imperial'];
  let uomChoice = '';
  let name = '';
  let depth = '';
  let height = '';
  let length = '';
  let isMetric = false;
  let metricImperial = uomChoice;

  async function getData(url= '', token) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", //POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}` 
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
   
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
    
  return response.json(); // parses JSON response into native JavaScript objects
}

  async function handleSubmit(event) {
    containerData = await fetchData(`http://localhost:5000/container/create/${cookieVal}`, {
      name: event.target.name.value,
      depth: event.target.depth.value,
      height: event.target.height.value,
      length: event.target.length.value,
      uom: event.target.uom.value,
      id: userId
    }, "POST");
  }

    async function handleUpdate(event) {

    const containerData = await fetchData(`http://localhost:5000/container/${event.target.id.value}`, {
      name: event.target.name.value,
      depth: event.target.depth.value,
      height: event.target.height.value,
      length: event.target.length.value,
      uom: event.target.uom.value,
      id: userId
    }, "PUT");
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
if(loggedIn) {
getCookie("user-token");
    cookieVal =  JSON.parse(getCookie("user-token"));
    userData = await getData(`http://localhost:5000/users/name/${cookieVal.username}`, cookieVal.token);
    userId = await userData.id
    containerData = await getData(`http://localhost:5000/container/${userId}`, cookieVal.token)
    containerData.map(el=> {plantIds.push(el.plants)})
    plantData =  await getData(`http://localhost:5000/plant/id/${plantIds[0]}`, cookieVal.token)
    plantData = await plantData[0]
    console.log(await plantData)
     refreshComponent()
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

  function refreshComponent() {
    isMetric = !isMetric
    console.log()
    if(isMetric === true) {
      metricImperial = "cm"
    } else {
      metricImperial = "in"
    }
    return metricImperial;
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
            on:submit|preventDefault={handleSubmit}
            on:invalid={validateMessageUsername}
            on:changed={validateMessageUsername}
            on:input={validateMessageUsername}>

            <label for="name" value=>Name</label>
            <input required type="name" id="name" />
            {#if error_boolean}
              <p>OH NO! AN ERRROR!</p>
            {/if}

            <label>Choose a Unit of Measurement:</label>
            <select name="Measurement unit" id="uom" on:input={refreshComponent}>
              <option value="metric">Metric</option>
              <option value="Imperial">Imperial</option>
            </select>

            <label for="depth">Depth {metricImperial}</label>
            <input required type="depth" id="depth" />

            <label for="height">Height {metricImperial}</label>
            <input required type="height" id="height" />

            <label for="length">Length {metricImperial}</label>
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

            </ActionButtons>
          </form>

        </Actions>
      </Card>
      <div class="addcontainer">

        {#await containerData}
          <p>...Fetching your containers!</p>
        {:then containers}
                  {#await plantData}
          <p>Getting plants...</p>
          {:then plant}
          {#each containers as container}

  
<!--start-->
    <div class="hidden card-container">
      <Card style="width: 400px;">
        <PrimaryAction>
          <img src={plant.image} alt={plant.name} />
          <Content class="mdc-typography--body2">
            <h1 class="mdc-typography--headline6" style="margin: 0;">
              <span class="mdc-tab__icon material-icons" aria-hidden="true">
                spa
              </span>
              {container.name}
            </h1>
            <h2
              class="mdc-typography--subtitle2"
              style="margin: 0 0 10px; color: #888;">
              {plant.name}
            </h2>
            <p>Edit dimensions of your plant's container or add a plant:</p> 
          </Content>
        </PrimaryAction>
        <Actions>
          <form
            id="editForm"

            on:submit|preventDefault={handleSubmit}
            on:invalid={validateMessageUsername}
            on:changed={validateMessageUsername}
            on:input={validateMessageUsername}>

            <label for="name" >Name</label>
            <input required type="name" id="name" value={container.name} />
            {#if error_boolean}
              <p>OH NO! AN ERRROR!</p>
            {/if}

            <label>Current Unit of Measurement:</label>
           
             <select name="Measurement unit" id="uom" on:input={refreshComponent}>
              <option value="metric" selected="selected">Metric</option>
              <option value="Imperial">Imperial</option>
               </select>
                           <label for="depth">Depth {metricImperial}</label>
            <input required type="depth" id="depth-{container.id}" value={container.depth} />

            <label for="height">Height {metricImperial}</label>
            <input required type="height" id="height-{container.id}" value={container.height}/>

            <label for="length">Length {metricImperial}</label>
            <input required type="length" id="length-{container.id}" value={container.length}/>

                                    <label for="plant">Plant</label>
            <input required type="plant" id="plant-{container.id}" value={plant.name} />


            <ActionButtons>
              <div>
                <Button
                  type="submit"
                  class="mdc-button mdc-button--raised"
                  style="margin-top:15px;">
                  <span class="mdc-button__label">Edit container</span>
                </Button>
              </div>

            </ActionButtons>
          </form>

        </Actions>
                        <br/>
        <div>
        <h2>Maintenance</h2>
        <p>Your container can hold {(Number(container.depth) * Number(container.height) * Number(container.length)*0.001)}kg</p>
        <br/>
            <h5>Sun</h5>
        <p>{plant.sun}</p>
        <br/>
            <h5>Water</h5>
        <p>{plant.water}</p>
        <br/>
        <h5>Propogation</h5>
        <p>{plant.propogation}</p>
        <br/>
                <h5>Hardiness</h5>
        <p>{plant.hardiness}</p>
        </div>
      </Card>

      </div>
      <!--Endo-->


          {/each}
        {:catch error}
          <p style="color: red">{error.message}</p>
        {/await}
{/await}
        <Fab on:click={doSomething} id="reveal-form">

          <Icon class="material-icons">add</Icon>
        </Fab>

      </div>

    </div>
  {/if}
</div>
