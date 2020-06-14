<script>
  import Button from "@smui/button";
  import Tab, { Icon, Label } from "@smui/tab";
  import Textfield from "@smui/textfield";

  let error_boolean = false;
  let username = "";
  let password = "";
  let user = { loggedIn: false };

  function toggle() {
    user.loggedIn = !user.loggedIn;
  }

  const apiUrl = "http://localhost:5000/users/register";
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
    console.log(event);
    console.log(event.target);
    console.log(event.target.username.value);
    console.log(event.target.password.value);
    console.log(event.target.email.value);
    console.log(event.target.firstName.value);
    console.log(event.target.lastName.value);

    postData(apiUrl, {
      username: event.target.username.value,
      password: event.target.password.value,
      email: event.target.email.value,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value
    }).then(data => {
      console.log(data); // JSON data parsed by `response.json()` call
    });
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

<h1>Register</h1>

<form
  on:submit|preventDefault={handleSubmit}
  on:invalid={validateMessageUsername}
  on:changed={validateMessageUsername}
  on:input={validateMessageUsername}>
  <label for="username">Username</label>
  <input required type="username" id="username" />
  {#if error_boolean}
    <h1>Username already taken</h1>
  {/if}
  <label for="email">Email:</label>
  <input type="email" id="email" />
  {#if error_boolean}
    <h1>Plase add a valid email</h1>
  {/if}

  <label for="password">Password</label>
  <input required type="password" id="password" />

  <label for="firstName">First Name</label>
  <input required type="firstName" id="firstName" />

  <label for="lastName">Last Name</label>
  <input required type="lastName" id="lastName" />
  {#if username.loggedIn}
    <button type="submit" on:click={toggle}>You are register</button>
  {:else}
    <button type="submit" on:click={toggle}>Register</button>
  {/if}
  <a href="/">Home</a>
</form>
