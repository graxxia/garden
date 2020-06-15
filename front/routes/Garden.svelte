<script>
	import { trefleKey } from './../APIkeys/trefle.js';
  import { onMount } from "svelte";
  import Fab, {Icon} from '@smui/fab';
  import { getCookie, checkCookie } from "../src/cookie.js";
  export let params;

  let error_boolean = false;
  let loginMsg = "";
  const apiUrl = "http://localhost:5000/container/";
  let data = []; 
  let loggedIn = checkCookie("user-token");
  let userData;
  let cookieVal;
  let userId;
  async function fetchData(url= '', token, method='') {
  // Default options are marked with *
  const response = await fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
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

  async function handleSubmit(event) {


    const containerData = await fetchData(`http://localhost:5000/container/create/${cookieVal}`, {
      name: event.target.name.value,
      depth: event.target.depth.value,
      height: event.target.height.value,
      length: event.target.length.value,
      id: event.target.password.value // get this from cookie
    }, "POST");
  }
function validateMessageUsername(event) {
    let textbox = event.target;
    error_boolean = false;
    if (textbox.value === "") {
      textbox.setCustomValidity("Required username");
    } else if (textbox.validity.typeMismatch) {
      error_boolean = true;
      textbox.setCustomValidity("please enter a valid username");
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
     userData = await fetchData(`http://localhost:5000/users/name/${cookieVal.username}`, cookieVal.token, "GET");
    userId = userData.id
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
  {#if error_boolean}
    <h1>OH NO! AN ERRROR!</h1>
  {/if}

  <label for="depth">Depth</label>
  <input required type="depth" id="depth" />

    <label for="height">Height</label>
  <input required type="height" id="height" />

    <label for="length">Length</label>
  <input required type="length" id="length" />

  <button type="submit">Create container</button>

  <br />
  <label>{loginMsg}</label></form>
<Fab on:click={doSomething} id="reveal-form"><Icon class="material-icons">add</Icon></Fab>
{/if}