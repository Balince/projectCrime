//When the page loads start
$(document).ready(function () {

    // mikes java for nav bar begins
    var config = {
        apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
        authDomain: "firstproject-da938.firebaseio.com",
        databaseURL: "https://firstproject-da938.firebaseio.com",
        storageBucket: "time-sheet-55009.appspot.com"
    };

    firebase.initializeApp(config);

    var db = firebase.database();
    var dbUserName
    var dbUserPW
    var dbEmail
    var localDB = []

    //  $(document).ready(function () {

    // var storeName = localStorage.getItem("storeName");
    // var storePW = localStorage.getItem("storePW");

    // // if you already logged in, hide the login and register dropdown and put the users name there

    //     if (storeName && storePW) {
    //     $(".username").text(storeName)
    //     $(".password").text(storePW)
    //     $(".dropdown-toggle").hide();
    //     $(".login-submit").click();
    //     $('.userDisplay').text(storeName.replace(/"/g, ''))


    // };

    // account creation
    $(".register-submit").on("click", function (e) {
        e.preventDefault();
        console.log("checking")
        var userName = $(".username").val().trim();
        var userPW = $(".password").val().trim();
        var userEmail = $(".email").val().trim();
        var newUser = {
            name: userName,
            password: userPW,
            email: userEmail

        };

        db.ref().push(newUser);


    });

    // storing user info in database
    db.ref().on("child_added", function (newUserSnapshot) {


        dbUserName = newUserSnapshot.val().name;
        dbUserPW = newUserSnapshot.val().password;
        dbEmail = newUserSnapshot.val().email;
        localDB.push(newUserSnapshot.val());

    });


    $(".login-submit").on("submit", function (e) {
        e.preventDefault();
        for (var i = 0; i < localDB.length; i++) {
            var userInfo = localDB[i]
            console.log(dbUserName)

            localStorage.setItem("storeName", JSON.stringify(userInfo.name));
            localStorage.setItem("storePW", JSON.stringify(userInfo.password));

            //storing login info on users local storage for auto login
            if (userInfo.name === $(".username").val() && userInfo.password === $(".password").val()) {

                console.log("check")
                $(".username").text(userInfo.name)
                $(".password").text(userInfo.password)



            }


        }
    });



    // mikes js for nav bar ends




    // random crime facts here
    var crimeFacts = ["1 in 12 children will be diddled by their weird uncle in a game closet in Alabama.",
        "1 of 4 people have unpaid parking tickets (look around you)", "1 in 60 people is currently on parole for a violent offense (look around you)",
        "These facts were completely unfabricated by the author"];
    var chosen = crimeFacts[Math.floor(Math.random() * Math.floor(3))];
    console.log(chosen);
    $("#firstFact").html(chosen);

    var crimeFacts2 = ["An average of 300 people die by violence in Philadelphia per year.","OJ was definitely guilt", "Casey Anthony was guilty too.","Mike (the one up here) once got caught stealing pantyhose at Walmart"
      ];
    var chosen = crimeFacts2[Math.floor(Math.random() * Math.floor(3))];
    console.log(chosen);
    $("#secondFact").html(chosen);

    var crimeFacts3 = ["Turtles are the most common animal stolen from pet stores",
        "I once got arrested for throwing a bottle of water at a concert (seriously)", "1 in 45 people is currently on parole for a violent offense (look around you)",
        "1/10,000 people will commit vehicular manslaughter while intoxicated."];
    var chosen = crimeFacts3[Math.floor(Math.random() * Math.floor(3))];
    console.log(chosen);
    $("#thirdFact").html(chosen);

    var crimeFacts4 = ["Jims has the best cheesteaks in Phily...(some of you might thinks this is a crime).",
        "1 of 8 people have stalked someone on social media (look around you).", "1 in 2000 people will be violently assaulted by a negligent pet owners pet.",
        "1 in 75 peopl will not report seeing a crime of any sort."];
    var chosen = crimeFacts4[Math.floor(Math.random() * Math.floor(3))];
    console.log(chosen);
    $("#fourthFact").html(chosen);

    var crimeFacts5 = ["Donald trump is totally guilty of at least half the things hes accused of.",
    "Hammers are the number one object used in an assault that isn't considered a weapon.", "99% of people believe that crime totally sucks ass.",
    "I swear these facts have not been fabricated."];
var chosen = crimeFacts5[Math.floor(Math.random() * Math.floor(3))];
console.log(chosen);
$("#fifthFact").html(chosen);

    // nates most recent and up to date javascript

    //When the page loads start //change to document.ready
    // window.onload = function(){

    //Vars for the location:
    var state = "PA";                       //State (2 Letter format)
    var city = "Philadelphia"               //City
    var location = city + "+" + state;
    console.log("Loc: " + location);

    //Configure the first API (Crime data)
    var crimeDataKey = "tKe8k0TE88uhuF5co5j1Msaj8K6IoDeZIVncWvQe";
    //API Url for the Crime Data
    var crimeURL = "https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=" + crimeDataKey + "&location=" + location;
    //Making a call to the API
    $.ajax({
        url: crimeURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })

    //Configure the second API (News)
    var newsKey = "02f81640ecmsh9312dc7baf084a0p1f0cd9jsn1b62c84cf7e4";
    //API URL for the news
    var newsURL = "https://cors-anywhere.herokuapp.com/" + "https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/";
    //Making a call to the API
    $.ajax({
        url: newsKey,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });


    mapboxgl.accessToken = 'pk.eyJ1IjoibmtleWVzIiwiYSI6ImNqeHJuaW54NDA2MXEzZm1yYnZ5dW85bGIifQ.5bp-rkNWdhNCEwHkYKt5aA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-75.16383138706976, 39.95164286836001],
        zoom: 12
    });

    map.setStyle('mapbox://styles/mapbox/dark-v9');

    // Add geolocate control to the map.
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));

    $("#submit").on("click", function (event) {
        event.preventDefault();
        var location = $("#input").val().trim();
        console.log(location);
        alert("Btn clicked");
    });

    var mapboxSearch = "https://cors-anywhere.herokuapp.com/" + "https://api.mapbox.com/geocoding/v5/" + endpoint + "/" + location + ".json";
    var endpoint = "mapbox.places";

    console.log("Search: " + mapboxSearch);

    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })

    map.addControl(geocoder);


    var locationArea;

    var size = 100;

    var newsAPI = "d3ebf4a3106647c0ae1bafd8127c1e37";

    geocoder.on('result', function (e) {                      //When the search is performed
        console.log(e);                                     //Console log the json object
        console.log("PN: " + e.result.place_name)            //Console log the specific area
        locationArea = e.result.place_name;                 //Create local var from the result

        $.ajax({                                            //Initiate news API
            url: "https://cors-anywhere.herokuapp.com/" + 'https://newsapi.org/v2/everything?q='     //URL
                + locationArea + "-crime" +
                "&apiKey=" + newsAPI,
            method: "GET"
        }).then(function (response) {
            console.log('news api: ');
            console.log(response);
        })


    });

    //API key for the FBI crime data
    var crimeAPIKey = "FKrzHRYm0esmQhPK9VGAsRinticdFGubQhKYKfeA";

    //AJAX Configuration
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/" + 'https://api.usa.gov/crime/fbi/sapi/api/participation/national?api_key=' + crimeAPIKey,
        method: "GET"
    }).then(function (response) {
        console.log("crime data")
        console.log(response);
    });

    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/" + 'https://api.usa.gov/crime/fbi/sapi/api/data/arrest/national/murder//2017/2019?api_key=' + crimeAPIKey,
        method: "GET"
    }).then(function (response) {
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
        url: "https://cors-anywhere.herokuapp.com/" + "https://phl.carto.com/api/v2/sql?q=SELECT * FROM shootings WHERE year =" + crimeYear,
        method: "GET"
    }).then(function (response) {
        console.log("carto");
        console.log(response);
        for (let i = 0; i < response.rows.length; i++) {
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
                url: "https://cors-anywhere.herokuapp.com/" + "https://api.mapbox.com/geocoding/v5/mapbox.places/" + convArrOne[i] + "%25PHILADELPHIA%25PA.json?country=US&region=Philadelphia&region=PA&access_token=pk.eyJ1IjoibmtleWVzIiwiYSI6ImNqeHJuaW54NDA2MXEzZm1yYnZ5dW85bGIifQ.5bp-rkNWdhNCEwHkYKt5aA",
                method: "GET"
            }).then(function (response) {
                console.log(response);
                console.log("----COORDS----");
                console.log(response.features[0].center[0]);
                console.log(response.features[0].center[1]);
                map.on('load', function () {
                    //Add layer showing places
                    map.addLayer({
                        "id": "places" + i,                //Adding the +i to create individual unique places
                        "type": "symbol",
                        "source": {
                            "type": "geojson",
                            "data": {
                                "type": "FeatureCollection",
                                "features": [{
                                    "properties": {
                                        "description": "Shooting. <br> Date: " + dateArray[i] + "<br> Time: " + timeArray[i] + "<br> Fatalities: " + fatalArray[i] + "<br> Victim race: " + raceArray[i] + "<br> Victim sex: " + sexArray[i] + "<br> Victim wound: " + woundArray[i] + "<br> Location: " + locationArray[i],
                                        "icon": "star"
                                    },
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": [response.features[0].center[0], response.features[0].center[1]]
                                    }
                                }]
                            }
                        },
                        "layout": {
                            "icon-image": "{icon}-15",
                            "icon-allow-overlap": true
                        }
                    })
                })

            })
            map.on('click', 'places' + i, function (e) {
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
        url: "https://cors-anywhere.herokuapp.com/" + "https://phl.carto.com/api/v2/sql?q=SELECT * FROM incidents_part1_part2 WHERE text_general_code = 'Vandalism/Criminal Mischief'",
        method: "GET"
    }).then(function (response) {
        console.log("CARTO 2 HIT");
        console.log(response);
    })



    //Forward Geocoding

    //https://api.mapbox.com/geocoding/v5/mapbox.places/123%20Main%20St%20Boston%20MA.json?country=US&access_token=pk.eyJ1IjoibmtleWVzIiwiYSI6ImNqeHJuaW54NDA2MXEzZm1yYnZ5dW85bGIifQ.5bp-rkNWdhNCEwHkYKt5aA

    //Need to convert addresses into data that can be passed to the maps

    var convArrOne = [];
    console.log("ONTOP-------------------------------------------------------------");
    for (let i = 0; i < locationArray.length; i++) {
        convArrOne[i] = locationArray[i].replace(/ /g, "%");
        console.log(locationArray[i]);
    };


    function filterBy(year) {

        var filters = ["==", 'year', year];
        map.setFilters

    }
});

