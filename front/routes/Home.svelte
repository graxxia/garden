<script>
  let gardeniaimg1 = "image3.jpg";
</script>

<style>
  .mdc-layout-grid {
    background-color: #cccccc;
    background-image: url("/image3.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    display: inline-block;
    padding: 0px;
  }

  .mdc-card {
    padding-top: 90px;
    width: 100vw;
    height: 100vh;
    border-radius: 0px;
    box-shadow: none;
    opacity: 0.8;
    text-align: center;
    padding: 90px 50px;
  }

  .material-icons {
    color: rgb(196, 219, 159);
  }
  .gardeniasmall {
    width: 150px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
    border-radius: 10px;
  }
  p {
    font-size: 1.5em;
  }
</style>

<div class="mdc-layout-grid">

  <div class="mdc-card ">
    <div>

      <h1>Gardenia</h1>
      <img src={gardeniaimg1} class="gardeniasmall" alt="Gardenia Logo" />

      <p class="text-align-center">
        <span class="material-icons text-align-center">spa</span>
        Focuses on the home gardener and provides a new way to plan and execute
        their gardens by providing important gardening info, when and where it
        is needed. Just fill out some information about your situation and
        plants. Then you’ll receive information on how to best maintain your
        plants and when to harvest them. Delivered to you by an expert team of
        software engineers with several successful projects.
      </p>
    </div>

  </div>

</div>
