<script>
  import Tab, { Icon, Label } from "@smui/tab";
  import Textfield from "@smui/textfield";
  import { setCookie, checkCookie } from "../src/cookie.js";
  import router from "page";
  import { fetchData } from "../src/serverReq";

  let error_boolean = false;
  let username = "";
  let password = "";
  let loginMsg = "";
  let loggedIn = checkCookie("user-token");
  let logoimgsmall = "gardeniasmall.svg";

  const apiUrl = "http://localhost:5000/users/authenticate";

  //
  async function handleSubmit(event) {
    const userData = await fetchData(
      apiUrl,
      {
        username: event.target.username.value,
        password: event.target.password.value
      },
      "POST"
    );

    if (userData.message === undefined) {
      loginMsg = "Successfully authenticated. :D";
      setCookie(
        "user-token",
        JSON.stringify({
          username: userData.username,
          token: userData.token
        }),
        7
      );
      router.redirect("/");
    } else {
      loginMsg = "Incorrect credentials D:";
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
      <h1>LOGIN</h1>
      <form
        on:submit={handleSubmit}
        on:invalid={validateMessageUsername}
        on:changed={validateMessageUsername}
        on:input={validateMessageUsername}>

        <label for="username">USERNAME</label>
        <input required type="username" id="username" />
        {#if error_boolean}
          <p>OH NO! AN ERRROR!</p>
        {/if}

        <label for="password">PASSWORD</label>
        <input required type="password" id="password" />
        <br />
        <button type="submit" class="mdc-button mdc-button--raised">
          <span class="mdc-button__label">Login to account</span>
        </button>
        <br />
        <a href="/register" class="mdc-button">Register</a>

        <br />
        <label>{loginMsg}</label>
      </form>

      {#if loggedIn}
        <p>You're logged in already!</p>
        <a href="/garden">Visit your garden page?</a>
      {/if}
    </div>
    <div class="mdc-layout-grid__cell" />

  </div>

</div>
