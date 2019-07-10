//When the page loads start
window.onload = function(){

    //Vars for the location:
    var state = "PA";                       //State (2 Letter format)
    var city = "Philadelphia"               //City
    var location = city+"+"+state;
    console.log("Loc: "+ location);
    
    //Configure the first API (Crime data)
    var crimeDataKey = "tKe8k0TE88uhuF5co5j1Msaj8K6IoDeZIVncWvQe";
    //API Url for the Crime Data
    var crimeURL = "https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key="+ crimeDataKey +"&location="+ location;
    //Making a call to the API
    $.ajax({
        url: crimeURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })

    //Configure the second API (News)
    var newsKey = "02f81640ecmsh9312dc7baf084a0p1f0cd9jsn1b62c84cf7e4";
    //API URL for the news
    var newsURL = "microsoft-azure-bing-news-search-v1.p.rapidapi.com";
    //Making a call to the API
    $.ajax({
        url: newsKey,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })
}

mapboxgl.accessToken = 'pk.eyJ1IjoibmtleWVzIiwiYSI6ImNqeHJuaW54NDA2MXEzZm1yYnZ5dW85bGIifQ.5bp-rkNWdhNCEwHkYKt5aA';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11'
});

map.setStyle('mapbox://styles/mapbox/dark-v9');

// Add geolocate control to the map.
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    trackUserLocation: true
    }));

$("#submit").on("click", function(event){
    event.preventDefault();
    var location = $("#input").val().trim();
    console.log(location);
    alert("Btn clicked");
});

var mapboxSearch = "https://api.mapbox.com/geocoding/v5/"+endpoint+"/"+location+".json";
var endpoint = "mapbox.places";

console.log("Search: "+ mapboxSearch);

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
})

map.addControl(geocoder);


var locationArea;

var newsAPI = "d3ebf4a3106647c0ae1bafd8127c1e37";

geocoder.on('result', function(e){                      //When the search is performed
    console.log(e);                                     //Console log the json object
    console.log("PN: "+ e.result.place_name)            //Console log the specific area
    locationArea = e.result.place_name;                 //Create local var from the result

    $.ajax({                                            //Initiate news API
        url: 'https://newsapi.org/v2/everything?q='     //URL
        + locationArea+"-crime" +
        "&apiKey="+ newsAPI,
        method: "GET"
    }).then(function(response){
        console.log('news api: ');
        console.log(response);
    })


});

//API key for the FBI crime data
var crimeAPIKey = "FKrzHRYm0esmQhPK9VGAsRinticdFGubQhKYKfeA";

//AJAX Configuration
$.ajax({
    url: 'https://api.usa.gov/crime/fbi/sapi/api/participation/national?api_key=' + crimeAPIKey,
    method: "GET"
}).then(function(response){
    console.log("crime data")
    console.log(response);
});

$.ajax({
    url: 'https://api.usa.gov/crime/fbi/sapi/api/data/arrest/national/murder//2017/2019?api_key='+ crimeAPIKey,
    method: "GET"
}).then(function(response){
    console.log("murder");
    console.log(response);
});


///api/data/arrest/national/{offense}/{variable}/{since}/{until}

///api/data/arrest/agencies/{ori}/{offense}/{variable}/{since}/{until}

//news API key = d3ebf4a3106647c0ae1bafd8127c1e37

//<input type="text" class="mapboxgl-ctrl-geocoder--input" placeholder="Search">