<script>
  import Register from "./../routes/Register.svelte";
  import router from "page";
  import Home from "../routes/Home.svelte";
  import Blog from "../routes/Blog.svelte";
  import Login from "../routes/Login.svelte";
  import SingleBlog from "../routes/SingleBlog.svelte";
  import { MDCTabBar } from "@material/tab-bar";
  import { onMount } from "svelte";
  import { checkCookie, deleteCookie } from "../src/cookie";

  let active = "Home";
  let page;
  let params;
  let src = "gardenialogo.svg";
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
  router("/blog", () => (page = Blog));
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

<img {src} alt="Gardenia Logo" />
<nav>
  <a href="/">Home</a>
  <a href="/blog">Blog</a>
  {#if !loggedIn}
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  {/if}
  {#if loggedIn}
    <button type="submit" on:click={() => deleteCookie('user-token', '', -1)}>
      Sign out
    </button>
  {/if}

</nav>

<main>
  <svelte:component this={page} {params} />
</main>

<div class="mdc-tab-bar" role="tablist">
  <div class="mdc-tab-scroller">
    <div class="mdc-tab-scroller__scroll-area">
      <div class="mdc-tab-scroller__scroll-content">
        <div class="flex-nav">
          <button
            class="mdc-tab mdc-tab--active"
            role="tab"
            aria-selected="true"
            tabindex="0">
            <span class="mdc-tab__content">
              <span class="mdc-tab__icon material-icons" aria-hidden="true">
                favorite
              </span>
              <span class="mdc-tab__text-label">Plant</span>
            </span>
            <span class="mdc-tab-indicator mdc-tab-indicator--active">
              <span
                class="mdc-tab-indicator__content
                mdc-tab-indicator__content--underline" />
            </span>
            <span class="mdc-tab__ripple" />
          </button>
          <button
            class="mdc-tab mdc-tab--active"
            role="tab"
            aria-selected="true"
            tabindex="0">
            <span class="mdc-tab__content">
              <span class="mdc-tab__icon material-icons" aria-hidden="true">
                favorite
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
        </div>
      </div>
    </div>
  </div>
</div>
