let pokemonList = [
    {name: 'Charizard', height: 67, type:['fire','flying']},
    {name: 'Diglett', height: 8, type:['ground', 'steel']},
    {name: 'Magnemite', height: 12, type:['electric','steel']}
];

//Pokemon length and height loop
let heightMessage;

function pokemonLoopFunction(pokemonList) {
    if(pokemonList.height > 12){heightMessage = "- Wow, that's big!";
    } else {
        heightMessage = '';
    }
    document.write('<p>' + `${pokemonList.name}: ${pokemonList.height}` + heightMessage + '</p>')
}
pokemonList.forEach(pokemonLoopFunction)