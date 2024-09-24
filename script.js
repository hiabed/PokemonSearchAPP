const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
//personnal info:
const pokemonName = document.querySelector("#pokemon-name");
const pokemonId = document.querySelector("#pokemon-id");
//pokemon size:
const weight = document.querySelector("#weight");
const height = document.querySelector("#height");
//pokemon image:
const pokemonImg = document.querySelector("#pokemon-img")
//types:
const types = document.querySelector("#types");
// stats:
const HP = document.querySelector("#hp");
const attack = document.querySelector("#attack");
const defense = document.querySelector("#defense");
const specialAttack = document.querySelector("#special-attack");
const specialDefense = document.querySelector("#special-defense");
const speed = document.querySelector("#speed");
const statsParent = document.querySelector("#values");
//end.



const mainFunction = async ()=> {
    types.innerHTML = "";
    statsParent.innerHTML = "";
    const statParagraph = document.createElement("p");
    statParagraph.innerHTML = "Stats";
    statsParent.append(statParagraph);
    let found = 0;
    const response = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
    if (response.ok) {
        const jsonResponse = await response.json();
        const results = jsonResponse.results;
        results.forEach(async element => {
            if ((searchInput.value === element.name) || (parseInt(searchInput.value) === element.id)) {
                found = 1;
                const data = await fetch(element.url);
                if (data.ok) {
                    jsonData = await data.json();
                    pokemonName.innerHTML = jsonData.name;
                    pokemonId.innerHTML = `#${jsonData.id}`;
                    weight.innerHTML = `weight: ${jsonData.weight}`;
                    height.innerHTML = `height: ${jsonData.height}`;
                    pokemonImg.style.backgroundImage = `url(${jsonData.sprites.front_default})`;
                    (jsonData.types).forEach(ele => {
                        // console.log(ele.type.name);
                        const typeElement = document.createElement("div");
                        typeElement.classList.add(ele.type.name);
                        typeElement.innerHTML = ele.type.name;
                        typeElement.style.border = "1px solid black";
                        typeElement.style.borderRadius = "10px";
                        typeElement.style.padding = "10px";
                        typeElement.style.backgroundColor = "#838329";
                        types.append(typeElement);
                    })
                    jsonData.stats.forEach(async element => {
                        console.log(element.base_stat);
                        const statElement = document.createElement("p");
                        statElement.classList.add(element.stat.name);
                        statElement.innerHTML = element.base_stat;
                        statsParent.append(statElement);
                    });
                }
                return 0;
            }
        });
    }
    if (!found) {
        alert("pokemon not found");
    }
}

searchButton.addEventListener("click", mainFunction);
searchInput.addEventListener("keyup", (event)=> {
    if (event.key === "Enter") {
        mainFunction();
    }
})

