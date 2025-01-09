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
        showModal(pokemon);
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
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // Details modal about pokemon that was clicked
    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');

        // Clear all existing modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');
        modalContainer.appendChild(modal);

        // Add the new modal content
        loadDetails(pokemon).then(function () {
            console.log(pokemon);

            let image = document.createElement('img');
            image.src = pokemon.imageUrl
            image.classList.add('pokemon-image');
            imageDiv.appendChild(image);

            let titleElement = document.createElement('h2');
            titleElement.innerText = pokemon.name;
            detailsDiv.appendChild(titleElement);

            let pokemonDetails = document.createElement('div');
            pokemonDetails.classList.add('pokemon-details');
            detailsDiv.appendChild(pokemonDetails);

            let height = document.createElement('p');
            height.innerText = `Height: ${pokemon.height}`;
            pokemonDetails.appendChild(height);

            let length = document.createElement('p');
            length.innerText = `Length: ${pokemon.types.length}`;
            pokemonDetails.appendChild(length);
        })

        let imageDiv = document.createElement('div');
        imageDiv.classList.add('modal-image');
        let detailsDiv = document.createElement('div');
        detailsDiv.classList.add('modal-details');
        modal.appendChild(imageDiv);
        modal.appendChild(detailsDiv);

        // loadDetails(pokemon).then(function () {
        //     console.log(pokemon);

        //     let image = document.createElement('img');
        //     image.src = pokemon.imageUrl
        //     image.classList.add('pokemon-image');
        //     imageDiv.appendChild(image);

        //     let titleElement = document.createElement('h2');
        //     titleElement.innerText = pokemon.name;
        //     detailsDiv.appendChild(titleElement);

        //     let contentElement = document.createElement('p');
        //     contentElement.innerText = pokemon.height, pokemon.length;
        // })
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);


        modal.appendChild(closeButtonElement);

        modalContainer.classList.add('is-visible');

        // Event listener to close when cliced outside of modal
        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    })

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
        modalContainer.innerHTML = '';
        document.body.style.overflow = 'visible';
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

// pokemonRepository.add({ name: 'Squirtle', height: 20, type:['water']});

//load the pokemon api
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});

// //Pokemon length and height loop
// let heightMessage;

let pokemon = pokemonRepository.getAll();

// pokemonRepository.getAll().forEach(function (pokemon) {
//     pokemonRepository.addListItem(pokemon);
// });