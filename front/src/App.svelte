<script>
  import router from "page";
  import Home from "../routes/Home.svelte";
  import Blog from "../routes/Blog.svelte";
  import Login from "../routes/Login.svelte";
  import TabBar from "@smui/tab-bar";
  import Button from "@smui/button";
  import Tab, { Icon, Label } from "@smui/tab";
  import SingleBlog from "../routes/SingleBlog.svelte";

  let active = "Home";
  let page;
  let params;

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

<h1>my Garden</h1>

<nav>
  <a href="/">Home</a>
  <a href="/blog">Blog</a>
  <a href="/login">Login</a>
</nav>

<main>
  <svelte:component this={page} {params} />
</main>

<div>
  <TabBar tabs={['Home', 'Blog', 'About Us']} let:tab bind:active>
    <!-- Notice that the `tab` property is required! -->
    <Tab {tab}>
      <Label>{tab}</Label>
    </Tab>
  </TabBar>

  <div style="margin-top: 15px;">
    Programmatically select:
    {#each ['Home', 'Blog', 'About Us'] as tab}
      <Button on:click={() => (active = tab)}>
        <Label>{tab}</Label>
      </Button>
    {/each}
  </div>

  <pre class="status">Selected: {active}</pre>
</div>
