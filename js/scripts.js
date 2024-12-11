let pokemonList = [
    {name: 'Charizard', height: 67, type:['fire','flying']},
    {name: 'Diglett', height: 8, type:['ground', 'steel']},
    {name: 'Magnemite', height: 12, type:['electric','steel']}
];

//Pokemon length and height loop
let heightMessage;

for(let i = 0; i < pokemonList.length; i++){
    if(pokemonList[i].height > 12){heightMessage = '- Wow, thats big!';
    } else {
        heightMessage = '';
    }
    document.write("<p>" + `${pokemonList[i].name}: ${pokemonList[i].height}` + heightMessage + "</p>")
}