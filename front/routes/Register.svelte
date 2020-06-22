<script>
	import { fetchData } from './../src/serverReq.js';
  import Button from "@smui/button";
  import Tab, { Icon, Label } from "@smui/tab";
  import Textfield from "@smui/textfield";

  let error_boolean = false;
  let username = "";
  let password = "";
  let user = { loggedIn: false };
  let loginMsg = "";
  let logoimgsmall = "gardeniasmall.svg";

  function toggle() {
    user.loggedIn = !user.loggedIn;
  }

  const apiUrl = "http://localhost:5000/users/register";

  //
  async function handleSubmit(event) {
    console.log(event);
    console.log(event.target);
    console.log(event.target.username.value);
    console.log(event.target.password.value);
    console.log(event.target.email.value);
    console.log(event.target.firstName.value);
    console.log(event.target.lastName.value);

    const userData = await fetchData(apiUrl, {
      username: event.target.username.value,
      password: event.target.password.value,
      email: event.target.email.value,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value
    }, "POST");

    console.log(userData);
    if (userData.message === undefined) {
      console.log(userData);
      loginMsg = "Successfully registered";
      setCookie(
        "user-token",
        JSON.stringify({ username: userData.username, token: userData.token }),
        7
      );
      router.redirect("/");
    } else {
      console.log(userData.message);
      loginMsg = "Incorrect credentials";
    }
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

<style>
  .gardeniasmall {
    width: 100px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
  }

  .mdc-layout-grid__cell {
    display: block;
    margin-left: auto;
    margin-right: auto;
    letter-spacing: 0.2em;
  }

  label,
  button {
    margin: 0.5em 0px;
  }
</style>

<div class="mdc-layout-grid">
  <div class="mdc-layout-grid__inner">

    <div class="mdc-layout-grid__cell" />
    <div class="mdc-layout-grid__cell">
      <img src={logoimgsmall} class="gardeniasmall" alt="Gardenia Logo" />
      <h1>REGISTER</h1>
      <form
        on:submit={handleSubmit}
        on:invalid={validateMessageUsername}
        on:changed={validateMessageUsername}
        on:input={validateMessageUsername}>
        <label for="username">USERNAME</label>
        <input required type="username" id="username" />
        {#if error_boolean}
          <h5>Username already taken</h5>
        {/if}
        <label for="email">EMAIL</label>
        <input type="email" id="email" />
        {#if error_boolean}
          <h5>Plase add a valid email</h5>
        {/if}

        <label for="password">PASSWORD</label>
        <input required type="password" id="password" />

        <label for="firstName">FIRST NAME</label>
        <input required type="firstName" id="firstName" />

        <label for="lastName">LAST NAME</label>

        <input required type="lastName" id="lastName" />
        <br />
        {#if username.loggedIn}
          <button
            type="submit"
            class="mdc-button mdc-button--raised"
            on:click={toggle}>
            You are register
          </button>
        {:else}
          <button
            type="submit"
            class="mdc-button mdc-button--raised"
            on:click={toggle}>
            Register
          </button>
        {/if}
        <br />
        <a href="/" class="mdc-button">Home</a>
        <label>{loginMsg}</label>
      </form>
    </div>
    <div class="mdc-layout-grid__cell" />

  </div>

</div>
