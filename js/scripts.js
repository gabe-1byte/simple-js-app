//IIFE Array start
let pokemonRepository = (function () {
    let pokemonList = [
    {name: 'Charizard', height: 67, type:['fire','flying']},
    {name: 'Diglett', height: 8, type:['ground', 'steel']},
    {name: 'Magnemite', height: 12, type:['electric','steel']}
    ];

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        {
            pokemonList.push(pokemon);
        }
    }
    // Function to create pokemon details w/ button displaying name
    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name
        button.classList.add('button-class')
        listPokemon.appendChild(button);
        addEventListenerButton(button, pokemon);
        pokemonList.appendChild(listPokemon);
    }
    // Function that displays pokemon details when clicked
    function addEventListenerButton(button, pokemon){
        button.addEventListener('click', function (){
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }
    // Make accessible outside function
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
    };
})(); //IIFE array end

pokemonRepository.add({ name: 'Squirtle', height: 20, type:['water']});

//Pokemon length and height loop
let heightMessage;

let pokemon = pokemonRepository.getAll();

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});