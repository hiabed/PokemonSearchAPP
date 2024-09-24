const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
// Personal info:
const pokemonName = document.querySelector("#pokemon-name");
const pokemonId = document.querySelector("#pokemon-id");
// Pokemon size:
const weight = document.querySelector("#weight");
const height = document.querySelector("#height");
// Pokemon image:
const pokemonImg = document.querySelector("#pokemon-img");
// Types:
const types = document.querySelector("#types");
// Stats:
const statistics = document.querySelectorAll(".statistics");
const statsParent = document.querySelector("#values");
// End.

const mainFunction = async () => {
    pokemonImg.innerHTML = "";
    types.innerHTML = "";
    statsParent.innerHTML = "";

    const statParagraph = document.createElement("p");
    statParagraph.id = "stats";
    statParagraph.innerHTML = "Stats";
    statsParent.append(statParagraph);

    let found = false;
    const response = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
    
    if (response.ok) {
        const jsonResponse = await response.json();
        const results = jsonResponse.results;

        for (const element of results) {
            if (searchInput.value.toLowerCase() === element.name || parseInt(searchInput.value) === element.id) {
                found = true;
                const data = await fetch(element.url);
                if (data.ok) {
                    const jsonData = await data.json();
                    pokemonName.innerHTML = jsonData.name.toUpperCase();
                    pokemonId.innerHTML = `#${jsonData.id}`;
                    weight.innerHTML = `${jsonData.weight}`;
                    height.innerHTML = `${jsonData.height}`;

                    const image = document.createElement("img");
                    image.src = `${jsonData.sprites.front_default}`;
                    image.id = "sprite";
                    pokemonImg.append(image);

                    jsonData.types.forEach((ele) => {
                        const typeElement = document.createElement("div");
                        typeElement.classList.add(ele.type.name);
                        typeElement.innerHTML = ele.type.name;
                        typeElement.style.border = "1px solid black";
                        typeElement.style.borderRadius = "10px";
                        typeElement.style.padding = "10px";
                        typeElement.style.backgroundColor = "#838329";
                        types.append(typeElement);
                    });
                    
                    jsonData.stats.forEach( (element, index) => {
                        statistics[index].innerHTML = element.base_stat;
                        statsParent.append(statistics[index]);
                    });
                }
                return 0; // Break the loop once we find the matching Pokemon
            }
        }
    }

    if (!found) {
        alert("Pokemon not found");
    }
};

searchButton.addEventListener("click", mainFunction);
searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        mainFunction();
    }
});
