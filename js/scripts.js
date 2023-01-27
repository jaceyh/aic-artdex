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
                console.log(artwork);
              //  add(artwork);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }


    //GET details from API



    //add artwork to list


    return {
        loadList: loadList,
    };


//end of IIFE function
})();

artRepository.loadList();