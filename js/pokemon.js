
initPokemon(1);

function initPokemon(page){

    let lastPokemon = 15 * page;
    let firtsPokemon = lastPokemon - 14;

    const getURLPokemon = id => `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonPromises = [];
    for(i = firtsPokemon; i <= lastPokemon; i++){
       pokemonPromises.push(fetch(getURLPokemon(i)).then(response => response.json()));
    }

    listPokemon(pokemonPromises);
}

function listPokemon(pokemonPromises){
    Promise.all(pokemonPromises)
    .then(pokemon => {

        const lisPokemons = pokemon.reduce((accumulator,{id, name, types}) =>{
            const type = types.map(typeInfo => typeInfo.type.name);
            accumulator += 
             `<li class="pokemon-card ${type[0]}">
                
                <img class="image-card" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"></img>
                
                <h2 class="name-card">${id}. ${name}<h2>
                <p class="type-card">${type.join(' | ')}
            </li>`
             return accumulator;
        },'' );

        createPokemon(lisPokemons); 
    })
}

function createPokemon(pokemon){
    const ul = document.querySelector('[data-js = "pokedex"]');
    ul.innerHTML = pokemon;
}


//fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
//.then(response => response.json())
//.then(data => {
//    pokemon = data
//    let num = 0;
//    for(let i = 1; i <= pokemon.results.length ; i++){
//        const getPokemon = pokemon.results.reduce((accumulator, pokemons) => {
//        accumulator += 
//        `<li>
//        <h2>${pokemons.name}<h2>
//        </li>`
//        return accumulator;
//        }, '')
//        createPokemon(getPokemon);
//    }
//
//});