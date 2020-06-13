<script>
	import { trefleKey } from './../APIkeys/trefle.js';
  import { onMount } from "svelte";
  export let params;

  const apiUrl = "http://localhost:5000/plant/";
  let data = [];
  let tData = [];

async function fetchData(url= '', data = {}, method='') {
  // Default options are marked with *
  const response = await fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

  onMount(async () => {
const searchTerm = params.name;  
const trefle = await fetch(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants?q=${searchTerm}&token=${trefleKey}`, {
  mode: "cors",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':"http://localhost:8080/"
  }
});
console.log(trefle)
const response = await fetchData(apiUrl, { name: searchTerm}, "post" );

    data = await response[0]
    tData = await trefle.json();
    console.log(tData)
    console.log(response)
  });

</script>
<img src="{tData.images}" alt="{tData}" />
<h1>{data.name}</h1>
<h3>Family</h3>
<p>{data.family}</p>
<h3>Species</h3>
<p>{data.species}</p>
<h3>Category</h3>
<p>{data.category}</p>
<h3>Height</h3>
<p>{data.height}</p>
<h3>Spacing</h3>
<p>{data.spacing}</p>
<h3>Sun Requirements</h3>
<p>{data.sun}</p>
<h3>Water Requirementss</h3>
<p>{data.water}</p>
<h3>Propogation</h3>
<p>{data.propogation}</p>
<h3>Collection Method</h3>
<p>{data.collectionMethod}</p>
<h3>Hardiness</h3>
<p>{data.hardiness}</p>