let pokemonRepository = (function () {
    let pokemonList = [
    {name: 'Charizard', height: 67, type:['fire','flying']},
    {name: 'Diglett', height: 8, type:['ground', 'steel']},
    {name: 'Magnemite', height: 12, type:['electric','steel']}
];

return {
    add: function(pokemon) {
        pokemonList.push(pokemon);
    },
    getAll: function() {
        return pokemonList;
    }
};
})();

pokemonRepository.add({ name: 'Squirtle', height: 20, type:['water']});

//Pokemon length and height loop
let heightMessage;

let pokemon = pokemonRepository.getAll();

function pokemonLoopFunction(pokemon) {
    if(pokemon.height > 20){heightMessage = "- Wow, that's big!";
    } else {
        heightMessage = '';
    }
    document.write('<p>' + `${pokemon.name}: ${pokemon.height}` + heightMessage + '</p>')
}
pokemon.forEach(pokemonLoopFunction)
    