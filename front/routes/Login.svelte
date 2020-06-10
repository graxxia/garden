<script>
  import Button from "@smui/button";
  import Tab, { Icon, Label } from "@smui/tab";
  import Textfield from "@smui/textfield";

  export let username = "";
  //   export let email = "";
  export let password = "";
  //   export let comment = "";

  async function handleSubmit(event) {
    console.log(event);
    console.log(event.target);
    console.log(event.target.username.value);
    console.log(event.target.password.value);
  }

  // Call an authenication microservice to handle the authentication.
  const response = async () => await fetch("http://localhost:5000/users/authenticate", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username: username, password: password })
  });
  const data = async () => await response.json();
</script>

<form>

  <Textfield bind:value={username} label="Username" />
  <br />
  <Textfield bind:value={password} label="Password" />
  <!-- <Textfield
    type="email"
    bind:value={email}
    label="Email"
    input$autocomplete="email" />-->
  <br />
  <button type="submit">Login</button>

  <br />
  <!-- <Textfield textarea bind:value={comment} label="Comment" /> -->

</form>
<form on:submit|preventDefault={handleSubmit} />
