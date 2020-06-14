<script>
  import Button from "@smui/button";
  import Tab, { Icon, Label } from "@smui/tab";
  import Textfield from "@smui/textfield";
  import { setCookie } from "../src/cookie.js";
  import router from "page";

  let error_boolean = false;
  let username = "";
  //   export let Username = "";
  let password = "";
  //   export let comment = "";

  const apiUrl = "http://localhost:5000/users/authenticate";
  //
  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
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

  //
  async function handleSubmit(event) {
    const userData = await postData(apiUrl, {
      username: event.target.username.value,
      password: event.target.password.value
    });
    setCookie(
      "user-token",
      JSON.stringify({ username: userData.username, token: userData.token }),
      7
    );
    router.redirect("/");
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
</script>

<form
  on:submit|preventDefault={handleSubmit}
  on:invalid={validateMessageUsername}
  on:changed={validateMessageUsername}
  on:input={validateMessageUsername}>
  <label for="username">Username</label>
  <input required type="username" id="username" />
  {#if error_boolean}
    <h1>OH NO! AN ERRROR!</h1>
  {/if}

  <label for="password">Password</label>
  <input required type="password" id="password" />

  <button type="submit">Login to account</button>
  <a href="/register">Register</a>
</form>

{#if loggedin}
<p>Hey: {usernameL}</p>
{/if}