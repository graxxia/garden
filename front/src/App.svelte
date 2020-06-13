<script>
  import router from "page";
  import Home from "../routes/Home.svelte";
  import Plants from "../routes/Plants.svelte";
  import Login from "../routes/Login.svelte";
  import TabBar from "@smui/tab-bar";
  import Button from "@smui/button";
  import Tab, { Icon, Label } from "@smui/tab";
  import Plant from "../routes/plant.svelte";
import {MDCTopAppBar} from '@material/top-app-bar';
import {onMount} from "svelte"
import {MDCRipple} from '@material/ripple';

onMount(async  () => { 
const topAppBarElement = await document.querySelector('.mdc-top-app-bar');
const topAppBar = await new MDCTopAppBar(topAppBarElement);
}); 
  let active = "Home";
  let page;
  let params;

  router("/", () => (page = Home));
  router("/plants", () => (page = Plants));
  router(
    "/plant/:name",

    // Before we set the component
    (ctx, next) => {
      params = ctx.params;
      next();
    },

    // Finally set the component
    () => (page = Plant)
  );
  router("/login", () => (page = Login));
  router.start();
</script>

<style>
  h1 {
    color: purple;
  }
  section > div {
    margin-bottom: 40px;
  }



  
</style>
<svelte:head>  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></svelte:head>
<h1>my Garden</h1>

<header class="mdc-top-app-bar">
  <div class="mdc-top-app-bar__row">
    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
      <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" aria-label="Open navigation menu">menu</button>
      <span class="mdc-top-app-bar__title">Page title</span>
    </section>
    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
      <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Favorite">favorite</button>
      <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Search">search</button>
      <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Options">more_vert</button>
    </section>
  </div>
</header>

<nav>
  <a href="/">Home</a>
  <a href="/plants">Plants</a>
  <a href="/login">Login</a>
</nav>

<main>
  <svelte:component this={page} {params} />
</main>

<div>
  <TabBar tabs={['Home', 'Plant', 'Login']} let:tab bind:active>
    <!-- Notice that the `tab` property is required! -->
    <Tab {tab}>
      <Label>{tab}</Label>
    </Tab>
  </TabBar>

  <div style="margin-top: 15px;">
    Programmatically select:
    {#each ['Home', 'Plant', 'Login'] as tab}
      <Button on:click={() => (active = tab)}>
        <Label>{tab}</Label>
      </Button>
    {/each}
  </div>

  <pre class="status">Selected: {active}</pre>
</div>
