let artList = []

let apiUrl = "https://api.artic.edu/api/v1/artworks?limit=20#"

//GET list from API
function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.data.forEach(function (item) {
                let artwork = {
                    title: item.title,
                    artist: item.artist_titles,
                    date: item.date_display,
                    location: item.place_of_origin,
                };
                add(artwork);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }


/*let artist = []
artwork.artist_titles.forEach(function () {
    artist.console.log(item.artist_titles);
});
item.artist_titles = artist.join(',');
*/

//function to return all items in artList
function getAll (){
        return artList;
}

//add artwork to list
function add (artwork) {
    artList.push(artwork);
};


function addListItem (artwork) {
    let container = document.querySelector('.artwork-list');
    let button = document.createElement('button');
    button.innerText = artwork.title;
    button.classList.add("button-class");
    container.appendChild(button);
    button.addEventListener('click', showDetails);
};

//function to implement loadList and add each artwork to the page
loadList().then(function() {
    //now the data is loaded!
    getAll().forEach(function (artwork) {
        addListItem(artwork);
    });
});


function showModal(title, text){
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.add('is-visible');

    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    //add new modal content

    //create close button
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    //create element for title in modal content
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    /*create element for image in modal content
    let imgElement = document.createElement('img');
    imgElement.src = img;
    */

    //create element for artist in modal content
    let artistElement = document.createElement('h2'); 
    artistElement.innerText = text;
    
    /*create element for date in modal content
    let dateElement = document.createElement('p');
    dateElement.innerText = artwork.date;

    //create element for location in modal content
    let locElement = document.createElement('p');
    locElement.innerText = artwork.location;
    */

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(artistElement);
    //modal.appendChild(dateElement);
    //modal.appendChild(locElement);
    modalContainer.appendChild(modal);

    document.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
    });
};

function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
};

//this is called from a click on button (above)
function showDetails (artwork) {
    loadList(artwork).then(function () {
        getAll().forEach(function (artwork) {
        showModal(artwork.title, artwork.artist);
    });
});
};