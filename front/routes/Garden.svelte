<script>
	import { trefleKey } from './../APIkeys/trefle.js';
  import { onMount } from "svelte";
  import Fab, {Icon} from '@smui/fab';
  import Select, {Option} from '@smui/select';
    import Textfield from '@smui/textfield'
  import { getCookie, checkCookie } from "../src/cookie.js";
  export let params;

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
    plantData = await Promise.all(plantIds.map(  async pIds =>  await getData(`http://localhost:5000/plant/id/${pIds}`, cookieVal.token)))
    console.log(await plantData)

    // check if they already have containers
    // if they do, display those with the {#each container} shenanigans
    // make those containers editable
    // when they exist with a plant provide feedback
}

  });

  function doSomething() {
    document.getElementById("createForm").classList.remove("hidden")
    document.getElementById("reveal-form").classList.add("hidden")
  }

  
</script>

<style>
.hidden{
display: none  
}
</style>

{#if loggedIn}
<form id="createForm" class="hidden" on:submit|preventDefault={handleSubmit}
  on:invalid={validateMessageUsername}
  on:changed={validateMessageUsername}
  on:input={validateMessageUsername}>
  <label> Input dimensions of your plant's container.</label>
  <label for="name">Name</label>

  <input required type="name" id="name" />
    <br/>
  {#if error_boolean}
    <h1>OH NO! AN ERRROR!</h1>
  {/if}

  <label>Choose a Unit of Measurement:</label>
  <Select bind:value={uomChoice} label="Unit cm/in">
  <Option value=uomChoice></Option>
  {#each uom as measurement}
    <Option value={measurement} selected={uomChoice === measurement}>{measurement}</Option>
  {/each}
</Select>

<Textfield bind:value={name} label="Name" input$autocomplete="name" />  
<br />
<Textfield type="depth" bind:value={depth} label="Depth"  /> 
<br />
<Textfield  type="height" bind:value={height} label="Height" />
<br />
<Textfield type="length"  bind:value={length} label="Length" />
<br/>
  <Fab  type="submit" ripple:true extended:true  label="Create Container"><Icon class="material-icons">save</Icon></Fab>

</form>

{#await containerData}
<p>...Fetching your containers!</p>
{:then containers}

{#await plantData}
<p>Getting your plants...</p>
{:then plant}

  {#each containers as container}

<form id="editForm"  on:submit|preventDefault={handleUpdate}
  on:invalid={validateMessageUsername}
  on:changed={validateMessageUsername}
  on:input={validateMessageUsername}>
  <label> Input dimensions of your plant's container.</label>

  <label for="name"></label>
  <label>Name</label>
  <input required type="name" id="eName" value={container.name} />
  {#if error_boolean}
    <h1>OH NO! AN ERRROR!</h1>
  {/if}


  <label>Unit of Measurement:</label>
  {#if container.uom == "Metric"}
<select name="uom" id="uom">

  <option value="Metric" selected="selected">Metric</option>
  <option value="Empirial">Empirial</option>
    <label for="depth">Depth</label>
  <input required type="depth" id="eDepth-{container.id}" value={container.depth} />

    <label for="height">Height</label>
  <input required type="height" id="eHeight-{container.id}" value={container.height}/>

    <label for="length">Length</label>
  <input required type="length" id="eLength-{container.id}" value={container.length}/>
  </select>
  {:else}
  <select name="uom" id="uom">

 <option value="Metric">Metric</option>
  <option value="Empirial" selected="selected">Empirial</option>
      <label for="depth">Depth</label>
  <input required type="depth" id="eDepth"value={container.depth} />

    <label for="height">Height</label>
  <input required type="height" id="eHeight" value={container.height}/>

    <label for="length">Length</label>
  <input required type="length" id="eLength" value={container.length}/>
  </select>
  {/if}


  <label for="depth">Depth</label>
  <input required type="depth" id="eDepth"value={container.depth} />

    <label for="height">Height</label>
  <input required type="height" id="eHeight" value={container.height}/>

    <label for="length">Length</label>
  <input required type="length" id="eLength" value={container.length}/>
{#each container.plants as cplant}
    <label for="plant">Plant</label>
  <input required type="plant" id="ePlant-{cplant}" value={plant.name}/>
{/each}
 <br/>
  <Fab  type="submit" ripple:true extended:true  ><Icon class="material-icons">edit</Icon></Fab>

</form>

  {/each}
  {:catch error}
  	<p style="color: red">{error.message}</p>
{/await}
  {:catch error}
  	<p style="color: red">{error.message}</p>
{/await}

<Fab on:click={doSomething} exited:true ripple:true id="reveal-form"><Icon class="material-icons">add</Icon></Fab>
{/if}

