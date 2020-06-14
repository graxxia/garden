<script>
  import Plants from "./../routes/Plants.svelte";
  import Home from "./../routes/Home.svelte";
  import Register from "./../routes/Register.svelte";
  import router from "page";
  import Blog from "../routes/Blog.svelte";
  import Login from "../routes/Login.svelte";
  import SingleBlog from "../routes/SingleBlog.svelte";
  import { MDCTabBar } from "@material/tab-bar";
  import { onMount } from "svelte";
  import { checkCookie, deleteCookie } from "../src/cookie";

  let active = "Home";
  let page;
  let params;
  let logoimg = "gardenialogo.svg";

  let loggedIn = false;
  let username;
  let token;

  onMount(async () => {
    const tabBar = await new MDCTabBar(document.querySelector(".mdc-tab-bar"));
    if (checkCookie("user-token")) {
      loggedIn = true;
    }
  });

  router("/", () => (page = Home));
  router("/plants", () => (page = Plants));
  router(
    "/blog/:id",

    // Before we set the component
    (ctx, next) => {
      params = ctx.params;
      next();
    },

    // Finally set the component
    () => (page = SingleBlog)
  );
  router("/login", () => (page = Login));

  router("/register", () => (page = Register));

  router.start();

  //document.cookie = "cookiename=cookievalue";
  //console.log(document.cookie);
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

  img {
    width: 400px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons" />
</svelte:head>

<img src={logoimg} alt="Gardenia Logo" />
<!-- <nav>
  <a href="/">Home</a>
  <a href="/blog">Blog</a>
  {#if !loggedIn}
    <a href="/login">Login</a>
  {/if}
  {#if loggedIn}
    <button type="submit" on:click={() => deleteCookie('user-token', '', -1)}>
      Sign out
    </button>
  {/if}

</nav> -->

<div class="mdc-tab-bar" role="tablist">
  <div class="mdc-tab-scroller">
    <div class="mdc-tab-scroller__scroll-area">
      <div class="mdc-tab-scroller__scroll-content">
        <div class="flex-nav">
          <a href="/">
            <button
              class="mdc-tab mdc-tab--active"
              role="tab"
              aria-selected="true"
              tabindex="0">
              <span class="mdc-tab__content">
                <span class="mdc-tab__icon material-icons" aria-hidden="true">
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
          <a href="/plants">
            <button
              class="mdc-tab mdc-tab--active"
              role="tab"
              aria-selected="true"
              tabindex="0">
              <span class="mdc-tab__content">
                <span class="mdc-tab__icon material-icons" aria-hidden="true">
                  eco
                </span>
                <psan href="/plant" class="mdc-tab__text-label">My Garden</psan>
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
            <a href="/login">
              <button
                class="mdc-tab mdc-tab--active"
                role="tab"
                aria-selected="true"
                tabindex="0">
                <span class="mdc-tab__content">
                  <span class="mdc-tab__icon material-icons" aria-hidden="true">
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
                <span class="mdc-tab__icon material-icons" aria-hidden="true">
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
<main>
  <svelte:component this={page} {params} />

</main>
