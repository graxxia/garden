<script>
  import Button from "@smui/button";
  import Tab, { Icon, Label } from "@smui/tab";
  import Textfield from "@smui/textfield";
  import { postData } from "../src/serverReq";
  let error_boolean = false;
  let username = "";
  let password = "";
  let user = { loggedIn: false };
  let loginMsg = "";

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

    const userData = await postData(apiUrl, {
      username: event.target.username.value,
      password: event.target.password.value,
      email: event.target.email.value,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value
    });

    console.log(userData);
    if (userData.message === undefined) {
      console.log(userData);
      loginMsg = "Successfully register";
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

<h1>Register</h1>

<form
  on:submit|preventDefault={handleSubmit}
  on:invalid={validateMessageUsername}
  on:changed={validateMessageUsername}
  on:input={validateMessageUsername}>
  <label for="username">Username</label>
  <input required type="username" id="username" />
  {#if error_boolean}
    <h5>Username already taken</h5>
  {/if}
  <label for="email">Email:</label>
  <input type="email" id="email" />
  {#if error_boolean}
    <h5>Plase add a valid email</h5>
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
  <label>{loginMsg}</label>
</form>
