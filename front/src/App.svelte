<script>
  import Plants from "./../routes/Plants.svelte";
  import Home from "./../routes/Home.svelte";
  import Register from "./../routes/Register.svelte";
  import router from "page";
  import Login from "../routes/Login.svelte";
  import Garden from "../routes/Garden.svelte";
  import { checkCookie, deleteCookie } from "../src/cookie";
  import { MDCTabBar } from "@material/tab-bar";
  import Plant from "../routes/Plant.svelte";
  import { onMount } from "svelte";
  import global from "../public/global.css";
  import Icon from "@smui/textfield/icon/index";
  import HelperText from "@smui/textfield/helper-text/index";
  import Textfield, { Input, Textarea } from "@smui/textfield";

  let active = "Home";
  let page;
  let params;
  let logoimg = "gardenialogo.svg";

  let loggedIn = false;
  let username;
  let token;
  let valueShapedOutlinedA = "";

  onMount(async () => {
    const tabBar = await new MDCTabBar(document.querySelector(".mdc-tab-bar"));
    if (checkCookie("user-token")) {
      loggedIn = true;
    }
  });

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

  router("/register", () => (page = Register));
  router("/garden", () => (page = Garden));

  router.start();
</script>

<style>
  .flex-nav {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
  }

  nav {
    margin-top: 40px;
  }

  nav a:hover {
    text-decoration: none;
  }

  .mdc-tab {
    padding-left: 0px;
    padding-right: 0px;
  }
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <script
    src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js">

  </script>
</svelte:head>
<body>
  <div class="mdc-layout-grid">
    <div class="mdc-layout-grid__inner">

      <div class="mdc-layout-grid__cell" />
      <div class="mdc-layout-grid__cell">
        <img src={logoimg} alt="Gardenia Logo" class="logo" />
      </div>
      <div class="mdc-layout-grid__cell mdc-layout-grid--align-right">
        <div>
          <Textfield
            class="shaped-outlined"
            variant="outlined"
            withLeadingIcon
            bind:value={valueShapedOutlinedA}
            label="Search"
            input$aria-controls="helper-text-shaped-outlined-b"
            input$aria-describedby="helper-text-shaped-outlined-b">
            <Icon class="material-icons">search</Icon>
          </Textfield>
          <HelperText id="helper-text-shaped-outlined-b">
            Find your plant
          </HelperText>

          <!-- <pre class="status">Search: {valueShapedOutlinedA}</pre> -->
        </div>

      </div>

    </div>

  </div>

  <nav>
    <div class="mdc-tab-bar" role="tablist">
      <div class="mdc-tab-scroller">
        <div class="mdc-tab-scroller__scroll-area">
          <div class="mdc-tab-scroller__scroll-content">
            <div class="flex-nav">
              <a href="/" class="mdc-tab">
                <button
                  class="mdc-tab mdc-tab--active"
                  role="tab"
                  aria-selected="true"
                  tabindex="0">
                  <span class="mdc-tab__content">
                    <span
                      class="mdc-tab__icon material-icons"
                      aria-hidden="true">
                      home
                    </span>
                    <span class="mdc-tab__text-label">Home</span>
                  </span>
                  <span class="mdc-tab-indicator mdc-tab-indicator--active">
                    <span
                      class="mdc-tab-indicator__content
                      mdc-tab-indicator__content--underline" />
                  </span>
                  <span class="mdc-tab__ripple" />
                </button>

              </a>
              <a href="/plants" class="mdc-tab">
                <button
                  class="mdc-tab mdc-tab--active"
                  role="tab"
                  aria-selected="true"
                  tabindex="0">
                  <span class="mdc-tab__content">
                    <span
                      class="mdc-tab__icon material-icons"
                      aria-hidden="true">
                      eco
                    </span>
                    <psan href="/plant" class="mdc-tab__text-label">
                      Plants
                    </psan>
                  </span>

                  <span class="mdc-tab-indicator mdc-tab-indicator--active">
                    <span
                      class="mdc-tab-indicator__content
                      mdc-tab-indicator__content--underline" />
                  </span>
                  <span class="mdc-tab__ripple" />
                </button>
              </a>
              <a href="/garden" class="mdc-tab">
                <button
                  class="mdc-tab mdc-tab--active"
                  role="tab"
                  aria-selected="true"
                  tabindex="0">
                  <span class="mdc-tab__content">
                    <span
                      class="mdc-tab__icon material-icons"
                      aria-hidden="true">
                      spa
                    </span>
                    <span href="/garden" class="mdc-tab__text-label">
                      My Garden
                    </span>
                  </span>

                  <span class="mdc-tab-indicator mdc-tab-indicator--active">
                    <span
                      class="mdc-tab-indicator__content
                      mdc-tab-indicator__content--underline" />
                  </span>
                  <span class="mdc-tab__ripple" />
                </button>
              </a>
              {#if !loggedIn}
                <a href="/login" class="mdc-tab">
                  <button
                    class="mdc-tab mdc-tab--active"
                    role="tab"
                    aria-selected="true"
                    tabindex="0">
                    <span class="mdc-tab__content">
                      <span
                        class="mdc-tab__icon material-icons"
                        aria-hidden="true">
                        person
                      </span>
                      <span class="mdc-tab__text-label">Login</span>
                    </span>
                    <span class="mdc-tab-indicator mdc-tab-indicator--active">
                      <span
                        class="mdc-tab-indicator__content
                        mdc-tab-indicator__content--underline" />
                    </span>
                    <span class="mdc-tab__ripple" />
                  </button>
                </a>
              {/if}
              {#if loggedIn}
                <button
                  class="mdc-tab mdc-tab--active"
                  role="tab"
                  aria-selected="true"
                  tabindex="0"
                  type="submit"
                  on:click={() => deleteCookie('user-token', '', -1)}>
                  <span class="mdc-tab__content">
                    <span
                      class="mdc-tab__icon material-icons"
                      aria-hidden="true">
                      person
                    </span>
                    <span class="mdc-tab__text-label">Sign out</span>
                  </span>
                  <span class="mdc-tab-indicator mdc-tab-indicator--active">
                    <span
                      class="mdc-tab-indicator__content
                      mdc-tab-indicator__content--underline" />
                  </span>
                  <span class="mdc-tab__ripple" />
                </button>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <main>
    <svelte:component this={page} {params} />

  </main>

</body>
