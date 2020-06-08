<script>
  import Button from "@smui/button";
  import Tab, { Icon, Label } from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import Textfield from "@smui/textfield";

  export let name = "";
  export let email = "";
  export let comment = "";
  let active = "Home";
</script>

<style>
  h1 {
    color: purple;
  }
  section > div {
    margin-bottom: 40px;
  }
</style>

<h1>my Garden</h1>

<div>
  <TabBar tabs={['Home', 'Merchandise', 'About Us']} let:tab bind:active>
    <!-- Notice that the `tab` property is required! -->
    <Tab {tab}>
      <Label>{tab}</Label>
    </Tab>
  </TabBar>

  <div style="margin-top: 15px;">
    Programmatically select:
    {#each ['Home', 'Merchandise', 'About Us'] as tab}
      <Button on:click={() => (active = tab)}>
        <Label>{tab}</Label>
      </Button>
    {/each}
  </div>

  <pre class="status">Selected: {active}</pre>
</div>

<Textfield bind:value={name} label="Name" />
<br />
<Textfield
  type="email"
  bind:value={email}
  label="Email"
  input$autocomplete="email" />
<br />
<Textfield textarea bind:value={comment} label="Comment" />
