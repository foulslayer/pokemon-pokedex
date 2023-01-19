console.log("???");
const description = document.querySelector("#Description");
const active = document.querySelector(".carousel-inner");
const item = document.querySelector(".item");
const Pokemon_Name = document.querySelector("#PokemonName");
const stats = document.querySelector("#Stats");
const category = document.querySelector("#Types");

input_box = document.getElementById("input_box");

input_box1 = document.getElementById("test");

var i = 2;
let x = 0;
x = window.localStorage.getItem("i", i);

window.onload = function () {
  var reloading = sessionStorage.getItem("reloading");
  if (reloading) {
    sessionStorage.removeItem("reloading");
    text();
    find_pokemon();
    body();
  }
};

function reloadp() {
  i = input_box.value;
  console.log(i);
  window.localStorage.setItem("i", i);
  sessionStorage.setItem("reloading", "true");
  document.location.reload();
}

function reloadp1() {
  input_box.value = input_box1.value;
  reloadp();
}

function find_pokemon() {
  var request = new XMLHttpRequest();

  console.log(x);

  var urlpokemon = "https://pokeapi.co/api/v2/pokemon-form/" + x;

  request.open("GET", urlpokemon, true);
  console.log(urlpokemon);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.response);
      console.log(data.pokemon.name);
      console.log(data.types[0].type.name);

      const PokemonName = document.createElement("h1");
      PokemonName.textContent = "Name: " + data.pokemon.name;
      Pokemon_Name.appendChild(PokemonName);

      const types = document.createElement("p");
      types.textContent = data.types[0].type.name;
      types.setAttribute("data-word", data.types[0].type.name);
      category.appendChild(types);

      if (data.types[1]) {
        // check om der data.types[1] i json filen
        const types = document.createElement("p");
        types.textContent = data.types[1].type.name;
        types.setAttribute("data-word", data.types[1].type.name);
        category.appendChild(types);
      }

      if (data.types[2]) {
        const types = document.createElement("p");
        types.textContent = data.types[2].type.name;
        types.setAttribute("data-word", data.types[2].type.name);
        category.appendChild(types);
      }

      const poster = document.createElement("img");
      poster.src = data.sprites.back_default;
      poster.setAttribute("class", "active item");
      active.appendChild(poster);

      const poster1 = document.createElement("img");
      poster1.src = data.sprites.front_default;
      poster1.setAttribute("class", "item");
      active.appendChild(poster1);

      console.log("test");
    } else {
      console.log("error");
      return;
    }
  };
  request.send();
}

function text() {
  var request = new XMLHttpRequest();

  var urlpokemon1 = "https://pokeapi.co/api/v2/pokemon-species/" + x;

  request.open("GET", urlpokemon1, true);
  console.log(urlpokemon1);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data1 = JSON.parse(request.response);
      console.log(data1.flavor_text_entries[1].flavor_text);
      console.log(data1.flavor_text_entries[1].language.name);
      if (data1.flavor_text_entries[1].language.name == "en") {
        const flavor = document.createElement("p");
        flavor.textContent = data1.flavor_text_entries[1].flavor_text;
        description.appendChild(flavor);
      } else if (data1.flavor_text_entries[2].language.name == "en") {
        const flavor = document.createElement("p");
        flavor.textContent = data1.flavor_text_entries[2].flavor_text;
        description.appendChild(flavor);
      }
    }
  };
  request.send();
}

function body() {
  var request = new XMLHttpRequest();

  var urlpokemon1 = "https://pokeapi.co/api/v2/pokemon/" + x;

  request.open("GET", urlpokemon1, true);
  console.log(urlpokemon1);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data2 = JSON.parse(request.response);

      const weight = document.createElement("p");
      weight.textContent = "Weight: " + data2.weight;
      stats.appendChild(weight);

      const height = document.createElement("p");
      height.textContent = "Height: " + data2.height;
      stats.appendChild(height);
    }
  };
  request.send();
}
