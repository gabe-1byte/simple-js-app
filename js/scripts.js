//IIFE Array start
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'detailsUrl' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('Pokemon is incorrect')
        }
    }
    // Function to create pokemon details w/ button displaying name
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement("li");
        let button = document.createElement("button");
        listPokemon.classList.add("list-group-item");
        button.innerText = pokemon.name;
        button.classList.add("btn", "btn-primary");
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        button.addEventListener("click", function(event){
            pokemonRepository.showDetails(pokemon)
        })
    }
    // pokemon api
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    // fetches list from api
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //add details to the item
            item.imageUrlFront = details.sprites.front_default;
            item.imageUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.types = details.types;
            item.length = pokemon.types.length
        }).catch(function (e) {
            console.error(e);
        });
    }

    // Details modal about pokemon that was clicked
    function showModal(title, text, img) {
        let modalTitle = document.querySelector('#pokemonModalLabel');
        let modalBody = document.querySelector('.modal-body');
        let pokemonHeight = document.querySelector('#pokemonHeight');
        let pokemonTypes = document.querySelector('#pokemonTypes');
        let pokemonLength = document.querySelector('#pokemonLength');
        let pokemonImage = document.querySelector("#pokemonImage");
        
        modalTitle.innerText = title;
        pokemonHeight.innerText = text;
        pokemonTypes.innerText = text;
        pokemonLength.innerText = text;
        pokemonImage.setAttribute('src', img);
    }


    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon.name,
                "Height: " + pokemon.height,
                "Types: " +pokemon.types,
                "Length: "+ pokemon.length,
                pokemon.imageUrlFront, pokemon.imageUrlBack);
                $('#pokemonDetailsModal').modal('show');
        });
    }    

    // Make accessible outside function
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails, showDetails
    };
})(); //IIFE array end

//load the pokemon api
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});

let pokemon = pokemonRepository.getAll();