//When the page loads start //change to document.ready
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
style: 'mapbox://styles/mapbox/streets-v11',
center: [-75.16383138706976,39.95164286836001],
zoom:12
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

var size = 100;

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



var locationArray = [];
var coordArray = [];

var dateArray = [];             //array to house information about the crime date
var timeArray = [];             //array to house information about the time of the crime
var fatalArray = [];            //array to house information about the fatality information
var raceArray = [];             //array to house data regarding victim's race
var sexArray = [];              //array to house data regarding victim's sex
var woundArray = [];            //array about victim wound information

var crimeYear = 2018;

//testing carto api

$.ajax({
    url: "https://phl.carto.com/api/v2/sql?q=SELECT * FROM shootings WHERE year ="+ crimeYear,
    method: "GET"
}).then(function(response){
    console.log("carto");
    console.log(response);
    for(let i = 0; i < response.rows.length; i++){

        locationArray[i] = response.rows[i].location;
        // console.log("ARR: "+ locationArray[i]);
        convArrOne[i] = locationArray[i].replace(/ /g, "%25");
        convArrOne[i] = locationArray[i].replace("BLOCK", "");
        dateArray[i] = response.rows[i].date_;
        timeArray[i] = response.rows[i].time;
        fatalArray[i] = response.rows[i].fatal;
        woundArray[i] = response.rows[i].wound;
        raceArray[i] = response.rows[i].race;
        sexArray[i] = response.rows[i].sex;
        // console.log("-----------");
        // console.log(convArrOne[i]);  

        $.ajax({
            url: "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ convArrOne[i] +"%25PHILADELPHIA%25PA.json?country=US&region=Philadelphia&region=PA&access_token=pk.eyJ1IjoibmtleWVzIiwiYSI6ImNqeHJuaW54NDA2MXEzZm1yYnZ5dW85bGIifQ.5bp-rkNWdhNCEwHkYKt5aA",
            method: "GET"
        }).then(function(response){
            console.log(response);
            console.log("----COORDS----");
            console.log(response.features[0].center[0]);
            console.log(response.features[0].center[1]);
            map.on('load', function(){
                //Add layer showing places
                map.addLayer({
                    "id": "places"+i,                //Adding the +i to create individual unique places
                    "type": "symbol",
                    "source": {
                        "type": "geojson",
                        "data": {
                            "type": "FeatureCollection",
                            "features": [{
                                "properties":{
                                    "description": "Shooting. <br> Date: "+ dateArray[i] + "<br> Time: " +timeArray[i] + "<br> Fatalities: "+ fatalArray[i] + "<br> Victim race: "+ raceArray[i] + "<br> Victim sex: "+ sexArray[i] + "<br> Victim wound: "+ woundArray[i] + "<br> Location: "+ locationArray[i],
                                    "icon": "star"
                                },
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [response.features[0].center[0], response.features[0].center[1]]
                                }
                            }]
                        }
                    },
                    "layout":{
                        "icon-image": "{icon}-15",
                        "icon-allow-overlap": true
                    }
                })
            })

        })
        map.on('click', 'places'+i, function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;
             
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
             
            new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
            });
             
            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', 'places', function () {
            map.getCanvas().style.cursor = 'pointer';
            });
             
            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'places', function () {
            map.getCanvas().style.cursor = '';
            });
    }
});

//Carto api two
$.ajax({
    url: "https://phl.carto.com/api/v2/sql?q=SELECT * FROM incidents_part1_part2 WHERE text_general_code = 'Vandalism/Criminal Mischief'",
    method: "GET"
}).then(function(response){
    console.log("CARTO 2 HIT");
    console.log(response);
})



//Forward Geocoding

//https://api.mapbox.com/geocoding/v5/mapbox.places/123%20Main%20St%20Boston%20MA.json?country=US&access_token=pk.eyJ1IjoibmtleWVzIiwiYSI6ImNqeHJuaW54NDA2MXEzZm1yYnZ5dW85bGIifQ.5bp-rkNWdhNCEwHkYKt5aA

//Need to convert addresses into data that can be passed to the maps

var convArrOne = [];
console.log("ONTOP-------------------------------------------------------------");
for(let i = 0; i < locationArray.length; i++){
    convArrOne[i] = locationArray[i].replace(/ /g, "%");
    console.log(locationArray[i]);
};


function filterBy(year){

    var filters = ["==", 'year', year];
    map.setFilters

}

// $.ajax({
//     url: "https://api.mapbox.com/geocoding/v5/mapbox.places/123%20Main%20St%20Boston%20MA.json?country=US&access_token=pk.eyJ1IjoibmtleWVzIiwiYSI6ImNqeHJuaW54NDA2MXEzZm1yYnZ5dW85bGIifQ.5bp-rkNWdhNCEwHkYKt5aA",
//     method: "GET"
// }).then(function(response){
//     console.log("TEST -- TEST -- TEST");
//     console.log(response);
// })


///api/data/arrest/national/{offense}/{variable}/{since}/{until}

///api/data/arrest/agencies/{ori}/{offense}/{variable}/{since}/{until}

//news API key = d3ebf4a3106647c0ae1bafd8127c1e37

//<input type="text" class="mapboxgl-ctrl-geocoder--input" placeholder="Search">