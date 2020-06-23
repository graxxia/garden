<script>
  let gardeniaimg1 = "image3.jpg";
</script>

<style>
  .mdc-layout-grid {
    background-color: #f8f8f8;
    background-image: url("/image3.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100vh;
    margin-top: -22px;
  }

  .mdc-card {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding: 50px 25px;
    opacity: 0.9;
  }

  .material-icons {
    color: rgb(196, 219, 159);
  }
  .gardeniasmall {
    width: 100px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
    border-radius: 10px;
  }
  p {
    font-size: 1.3em;
  }
</style>

<br />
<div class="mdc-layout-grid">

  <div class="mdc-card ">

    <h1>Gardenia</h1>
    <img src={gardeniaimg1} class="gardeniasmall" alt="Gardenia Logo" />

    <p class="text-align-center">
      <span class="material-icons text-align-center">spa</span>
      Focuses on the home gardener and provides a new way to plan and execute
      their gardens by providing important gardening info, when and where it is
      needed. Just fill out some information about your situation and plants.
      Then you’ll receive information on how to best maintain your plants and
      when to harvest them. Delivered to you by an expert team of software
      engineers with several successful projects.
    </p>

  </div>

</div>
