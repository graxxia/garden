<script>
  import Button from "@smui/button";
  import Tab, { Icon, Label } from "@smui/tab";
  import Textfield from "@smui/textfield";
  import { setCookie, checkCookie } from "../src/cookie.js";
  import router from "page";
  import { postData } from "../src/serverReq";

  let error_boolean = false;
  let username = "";
  let password = "";
  let loginMsg = "";

  const apiUrl = "http://localhost:5000/users/authenticate";

  //
  async function handleSubmit(event) {
    const userData = await postData(apiUrl, {
      username: event.target.username.value,
      password: event.target.password.value
    });

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

<form
  on:submit={handleSubmit}
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

  <br />
  <label>{loginMsg}</label>
</form>
