const typeColor = {
    bug: "#26de81", // Color code for bug type
    dragon: "#ffeaa7", // Color code for dragon type
    electric: "#fed330", // Color code for electric type
    fairy: "#FF0069", // Color code for fairy type
    fighting: "#30336b", // Color code for fighting type
    fire: "#f0932b", // Color code for fire type
    flying: "#81ecec", // Color code for flying type
    grass: "#00b894", // Color code for grass type
    ground: "#EFB549", // Color code for ground type
    ghost: "#a55eea", // Color code for ghost type
    ice: "#74b9ff", // Color code for ice type
    normal: "#95afc0", // Color code for normal type
    poison: "#6c5ce7", // Color code for poison type
    psychic: "#a29bfe", // Color code for psychic type
    rock: "#2d3436", // Color code for rock type
    water: "#0190FF", // Color code for water type
};

const url = "https://pokeapi.co/api/v2/pokemon/"; // URL for the PokeAPI
const card = document.getElementById("card"); // Get the card element
const btn = document.getElementById("btn"); // Get the button element

let getPokeData = () => {
    let id = Math.floor(Math.random() * 150) + 1; // Generate a random number between 1 and 150
    console.log(id); // Print the generated id
    const finalUrl = url + id; // Combine the pokeapi url with pokemon id
    console.log(finalUrl); // Print the final URL
    fetch(finalUrl) // Fetch data from the final URL
        .then((response) => response.json()) // Convert the response to JSON
        .then((data) => {
            generateCard(data); // Generate the card using the fetched data
        });
};

let generateCard = (data) => {
    console.log(data); // Print the fetched data
    const hp = data.stats[0].base_stat; // Get the HP stat
    const imgSrc = data.sprites.other.dream_world.front_default; // Get the image source
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1); // Get the capitalized Pokemon name
    const statsAttack = data.stats[1].base_stat; // Get the attack stat
    const statDefense = data.stats[2].base_stat; // Get the defense stat
    const statSpeed = data.stats[5].base_stat; // Get the speed stat
    const themeColor = typeColor[data.types[0].type.name]; // Get the theme color based on the pokemon type
    console.log(themeColor); // Print the theme color

    card.innerHTML = `
            <p class="hp">
                <span>HP</span>
                ${hp} 
            </p>

            <img src="${imgSrc}" alt=""> 

            <h2 class="poke-name">${pokeName}</h2> 

            <div class="types">
                
            </div>

            <div class="stats">
                <div>
                    <h3>${statsAttack}</h3>
                    <p>Attack</p>
                </div>

                <div>
                    <h3>${statDefense}</h3>
                    <p>Defense</p>
                </div>

                <div>
                    <h3>${statSpeed}</h3>
                    <p>Speed</p>
                </div>
            </div>
    `;
    appendTypes(data.types); // Append the Pokemon types
    styleCards(themeColor); // Style the card using the theme color
};

let appendTypes = (types) => {
    console.log(types); // Print the Pokemon types
    types.forEach((item) => {
        let span = document.createElement("span");
        span.textContent = item.type.name; // Set the text content of the span element to the type name
        document.querySelector(".types").appendChild(span); // Append the span element to the types container
    });
};

let styleCards = (color) => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`; // Set the card background color
    card.querySelectorAll(".types span").forEach((typeColor) => {
        typeColor.style.backgroundColor = color; // Set the background color of each type span
    });
};

btn.addEventListener("click", getPokeData); // Add event listener to the button
window.addEventListener("load", getPokeData); // Fetch data when the window loads
