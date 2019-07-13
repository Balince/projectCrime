//When the page loads start
$(document).ready(function (){

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
 
 $(document).ready(function () {
 
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
 });


// mikes js for nav bar ends




    // random crime facts here
    var crimeFacts = ["One in three children will be diddled by their uncle in a game closet in alabama.",
        "1 of 8 people have commited sexual assault (look around you)", "1 in 60 people is currently on parole for a violent offense (look around you)",
        "these facts were completely unfabricated by the author"];
    var chosen = crimeFacts[Math.floor(Math.random() * Math.floor(3))];
    console.log(chosen);
    $("#firstFact").html(chosen);

    var crimeFacts2 = ["One in three children will be diddled by their uncle in a game closet in alabama.",
        "1 of 8 people have commited sexual assault (look around you)", "1 in 60 people is currently on parole for a violent offense (look around you)",
        "these facts were completely unfabricated by the author"];
    var chosen = crimeFacts2[Math.floor(Math.random() * Math.floor(3))];
    console.log(chosen);
    $("#secondFact").html(chosen);

    var crimeFacts3 = ["One in three children will be diddled by their uncle in a game closet in alabama.",
        "1 of 8 people have commited sexual assault (look around you)", "1 in 60 people is currently on parole for a violent offense (look around you)",
        "these facts were completely unfabricated by the author"];
    var chosen = crimeFacts3[Math.floor(Math.random() * Math.floor(3))];
    console.log(chosen);
    $("#thirdFact").html(chosen);

    var crimeFacts4 = ["One in three children will be diddled by their uncle in a game closet in alabama.",
        "1 of 8 people have commited sexual assault (look around you)", "1 in 60 people is currently on parole for a violent offense (look around you)",
        "these facts were completely unfabricated by the author"];
    var chosen = crimeFacts4[Math.floor(Math.random() * Math.floor(3))];
    console.log(chosen);
    $("#fourthFact").html(chosen);




    // nates new updated javascript

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
    var crimeURL = "https://cors-anywhere.herokuapp.com/" + "https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=" + crimeDataKey + "&location=" + location;
    //Making a call to the API
    $.ajax({
        url: crimeURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })

    // //Configure the second API (News)
    // var newsKey = "02f81640ecmsh9312dc7baf084a0p1f0cd9jsn1b62c84cf7e4";
    //API URL for the news
    // var newsURL = "https://cors-anywhere.herokuapp.com/" + "microsoft-azure-bing-news-search-v1.p.rapidapi.com";
    //Making a call to the API
    // $.ajax({
    //     url: newsKey,
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response);
    // })


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

    $("#submit").on("click", function (event) {
        event.preventDefault();
        var location = $("#input").val().trim();
        console.log(location);
       
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

    var pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        onAdd: function () {
            var canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d');
        },

        render: function () {
            var duration = 1000;
            var t = (performance.now() % duration) / duration;

            var radius = size / 2 * 0.3;
            var outerRadius = size / 2 * 0.7 * t + radius;
            var context = this.context;

            // draw outer circle
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
            context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
            context.fill();

            // draw inner circle
            context.beginPath();
            context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
            context.fillStyle = 'rgba(255, 100, 100, 1)';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();

            // update this image's data with data from the canvas
            this.data = context.getImageData(0, 0, this.width, this.height).data;

            // keep the map repainting
            map.triggerRepaint();

            // return `true` to let the map know that the image was updated
            return true;
        }
    };

    map.on('load', function () {
        map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

        map.addLayer({
            "id": "points",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-75.208, 39.965]
                        }
                    }]
                }
            },
            "layout": {
                "icon-image": "pulsing-dot"
            }
        });
    })
// 
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

    var crimeYear = 2018;

    var locationArray = [];
    var coordArray = [];

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
            // console.log("-----------");
            // console.log(convArrOne[i]);  

            $.ajax({
                url:"https://cors-anywhere.herokuapp.com/" +  "https://api.mapbox.com/geocoding/v5/mapbox.places/" + convArrOne[i] + "%25PHILADELPHIA%25PA.json?country=US&region=Philadelphia&region=PA&access_token=pk.eyJ1IjoibmtleWVzIiwiYSI6ImNqeHJuaW54NDA2MXEzZm1yYnZ5dW85bGIifQ.5bp-rkNWdhNCEwHkYKt5aA",
                method: "GET"
            }).then(function (response) {
                console.log(response);
                console.log("----COORDS----");
                console.log(response.features[0].center[0]);
                console.log(response.features[0].center[1]);
                map.on('load', function () {
                    map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

                    map.addLayer({
                        "id": "points" + i,
                        "type": "symbol",
                        "source": {
                            "type": "geojson",
                            "data": {
                                "type": "FeatureCollection",
                                "features": [{
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": [response.features[0].center[0], response.features[0].center[1]]
                                    }
                                }]
                            }
                        },
                        "layout": {
                            "icon-image": "pulsing-dot"
                        }
                    });
                })
            })

        }
    });

    //Forward Geocoding

    //https://api.mapbox.com/geocoding/v5/mapbox.places/123%20Main%20St%20Boston%20MA.json?country=US&access_token=pk.eyJ1IjoibmtleWVzIiwiYSI6ImNqeHJuaW54NDA2MXEzZm1yYnZ5dW85bGIifQ.5bp-rkNWdhNCEwHkYKt5aA

    //Need to convert addresses into data that can be passed to the maps

    var convArrOne = [];
    console.log("ONTOP-------------------------------------------------------------");
    for (let i = 0; i < locationArray.length; i++) {
        convArrOne[i] = locationArray[i].replace(/ /g, "%");
        console.log(locationArray[i]);
    }

    $.ajax({
        url:"https://cors-anywhere.herokuapp.com/" +  "https://api.mapbox.com/geocoding/v5/mapbox.places/123%20Main%20St%20Boston%20MA.json?country=US&access_token=pk.eyJ1IjoibmtleWVzIiwiYSI6ImNqeHJuaW54NDA2MXEzZm1yYnZ5dW85bGIifQ.5bp-rkNWdhNCEwHkYKt5aA",
        method: "GET"
    }).then(function (response) {
        console.log("TEST -- TEST -- TEST");
        console.log(response);
    })
});


///api/data/arrest/national/{offense}/{variable}/{since}/{until}

///api/data/arrest/agencies/{ori}/{offense}/{variable}/{since}/{until}

//news API key = d3ebf4a3106647c0ae1bafd8127c1e37





    // nates old code begins here

    //Vars for the location:
    // var state = "PA";                       //State (2 Letter format)
    // var city = "Philadelphia"               //City
    // var location = city + "+" + state;
    // console.log("Loc: " + location);

    //Configure the first API (Crime data)
    // var crimeDataKey = "tKe8k0TE88uhuF5co5j1Msaj8K6IoDeZIVncWvQe";
    //API Url for the Crime Data
    // var crimeURL = "https://cors-anywhere.herokuapp.com/" + "https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=" + crimeDataKey + "&location=" + location;
    //Making a call to the API
    // $.ajax({
    //     url: crimeURL,
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response);
    // })


    // api call below is being called to a key not a url



    //Configure the second API (News)
    // var newsKey = "02f81640ecmsh9312dc7baf084a0p1f0cd9jsn1b62c84cf7e4";
    //API URL for the news


    // needs to have an http in front to make an actuall call

    // var newsURL = "microsoft-azure-bing-news-search-v1.p.rapidapi.com";
    //Making a call to the API
    // $.ajax({
    //     url: newsKey,
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response);
    // })


    // mapboxgl.accessToken = 'pk.eyJ1IjoibmtleWVzIiwiYSI6ImNqeHJuaW54NDA2MXEzZm1yYnZ5dW85bGIifQ.5bp-rkNWdhNCEwHkYKt5aA';
    // var map = new mapboxgl.Map({
    //     container: 'map',
    //     style: 'mapbox://styles/mapbox/streets-v11'
    // });

    // map.setStyle('mapbox://styles/mapbox/dark-v9');

    // Add geolocate control to the map.
    // map.addControl(new mapboxgl.GeolocateControl({
    //     positionOptions: {
    //         enableHighAccuracy: true
    //     },
    //     trackUserLocation: true
    // }));

    // $("#submit").on("click", function (event) {
    //     event.preventDefault();
    //     var location = $("#input").val().trim();
    //     console.log(location);
    //     alert("Btn clicked");
    // });

    // var mapboxSearch = "https://api.mapbox.com/geocoding/v5/" + endpoint + "/" + location + ".json";
    // var endpoint = "mapbox.places";

    // console.log("Search: " + mapboxSearch);

    // var geocoder = new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     mapboxgl: mapboxgl
    // })

    // map.addControl(geocoder);


    // var locationArea;

    // var newsAPI = "d3ebf4a3106647c0ae1bafd8127c1e37";

    // geocoder.on('result', function (e) {                      //When the search is performed
        // console.log(e);                                     //Console log the json object
        // console.log("PN: " + e.result.place_name)            //Console log the specific area
        // locationArea = e.result.place_name;                 //Create local var from the result

        // $.ajax({                                            //Initiate news API
            // url: 'https://newsapi.org/v2/everything?q='     //URL
        //         + locationArea + "-crime" +
        //         "&apiKey=" + newsAPI,
        //     method: "GET"
        // }).then(function (response) {
        //     console.log('news api: ');
        //     console.log(response);
        // })


    // });

    //API key for the FBI crime data
    // var crimeAPIKey = "FKrzHRYm0esmQhPK9VGAsRinticdFGubQhKYKfeA";

    //AJAX Configuration
//     $.ajax({
//         url: 'https://api.usa.gov/crime/fbi/sapi/api/participation/national?api_key=' + crimeAPIKey,
//         method: "GET"
//     }).then(function (response) {
//         console.log("crime data")
//         console.log(response);
//     });

//     $.ajax({
//         url: 'https://api.usa.gov/crime/fbi/sapi/api/data/arrest/national/murder//2017/2019?api_key=' + crimeAPIKey,
//         method: "GET"
//     }).then(function (response) {
//         console.log("murder");
//         console.log(response);
//     });
// });


///api/data/arrest/national/{offense}/{variable}/{since}/{until}

///api/data/arrest/agencies/{ori}/{offense}/{variable}/{since}/{until}

//news API key = d3ebf4a3106647c0ae1bafd8127c1e37

//<input type="text" class="mapboxgl-ctrl-geocoder--input" placeholder="Search">




// marks code begins

