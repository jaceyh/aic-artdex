let artRepository = (function() {

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
                    img: item.thumbnail,
                    date: item.date_display,
                    location: item.place_of_origin,
                };
                add(artwork);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

/*
    
    let artist= [];
    artwork.artist_titles.forEach(function (artist_titles) {
        JSON.parse(artist_titles);
        console.log(artist_titles);
    })
*/

    //function to return all items in artList
        function getAll (){
            return artList;
        }

    //add artwork to list
    function add (artwork) {
        artList.push(artwork);
    }


    function addListItem (artwork) {
        let container = document.querySelector('.artwork-list');
        let button = document.createElement('button');
        button.innerText = artwork.title;
        button.classList.add("button-class");
        container.appendChild(button);
    }

    return {
        getAll: getAll,
        add: add,
        loadList: loadList,
        addListItem: addListItem,
    };


//end of IIFE function
})();

artRepository.loadList().then(function() {
    //now the data is loaded!
    artRepository.getAll().forEach(function (artwork) {
        artRepository.addListItem(artwork);
    });
});