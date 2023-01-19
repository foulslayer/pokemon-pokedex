const test = document.querySelector(".active");
input_box = document.getElementById("input_box");

/*
function mytestFunction(parameter) {
  console.log(parameter);
}*/

var request = new XMLHttpRequest();
request.open("GET", "https://pokeapi.co/api/v2/pokedex/2/", true);
request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText);
    data.pokemon_entries.forEach((entry_number) => {
      // console.log(entry_number.entry_number);

      const Poke = document.createElement("button");
      Poke.textContent =
        entry_number.pokemon_species.name + " #" + entry_number.entry_number;
      // Poke.onclick =  mytestFunction(entry_number.entry_number);
      Poke.onclick = function () {
        input_box.value = entry_number.entry_number;
      };
      //Poke.onclick = input_box.value = entry_number.entry_number;
      test.appendChild(Poke);
    });
  }
};
request.send();
